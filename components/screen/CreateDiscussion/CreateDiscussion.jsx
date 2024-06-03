import { Ionicons } from "@expo/vector-icons";
import { Button, Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import {
  useCreateDiscussionApi,
  useEditDiscussionApi,
  useGetDiscussionCategoryApi,
} from "../../../API/DiscussionApi";
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";
import { SelectComponent } from "../../molecules";

const CreateDiscussion = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [discussionText, setDiscussionText] = useState("");
  const [actualImages, setActualImages] = useState([]);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const profileData = useSelector(userDataState);
  const [isDirty, setIsDirty] = useState(false);

  const toast = useToast();

  const route = useRoute();

  const { edit_data } = route.params || {};

  const mergeImage = images.concat(newImages);

  useEffect(() => {
    if (edit_data) {
      setTitle(edit_data.title);
      setSelectedCategory(edit_data.category.post_category_id);
      setEditCategoryName(edit_data.category.category_name);
      setDiscussionText(edit_data.content);
      const imageUri = edit_data.images?.map((image) => {
        return {
          uri: image.image_uri,
        };
      });
      setImages(imageUri);
      setActualImages(imageUri);
    }
  }, [edit_data]);

  useEffect(() => {
    const isDiscussionDirty =
      title !== edit_data?.title ||
      selectedCategory !== edit_data?.category?.post_category_id ||
      discussionText !== edit_data?.content ||
      actualImages?.length !== mergeImage?.length;
    setIsDirty(isDiscussionDirty);
  }, [title, selectedCategory, discussionText, images, edit_data, mergeImage]);

  const { getDiscussionCategory, discussionCategory } =
    useGetDiscussionCategoryApi();
  const { createDiscussion, code, setCode, loading } = useCreateDiscussionApi();
  const {
    editDiscussion,
    code: editCode,
    setCode: setEditCode,
    loading: editLoading,
  } = useEditDiscussionApi();

  useFocusEffect(
    useCallback(() => {
      getDiscussionCategory();
    }, []),
  );

  const remapCategory = () => {
    return discussionCategory?.map((category) => {
      return {
        id: category.post_category_id,
        label: category.category_name,
        value: category.post_category_id,
      };
    });
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && Array.isArray(result.assets)) {
        const newFile = {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: `image${Math.floor(Math.random() * (999 - 100 + 1) + 100)}.jpeg`,
        };

        setNewImages((prevImages) => [...prevImages, newFile]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleTextChange = (text) => {
    if (text.length <= 500) {
      setDiscussionText(text);
    }
  };

  useEffect(() => {
    if (code === 201) {
      navigation.goBack();
      setCode(null);
      toast.show({
        description: "Your discussion has been created!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <ToastTitle>Success</ToastTitle>
            </Toast>
          );
        },
      });
    }
  }, [code]);

  const disabledPost =
    title === "" || selectedCategory === null || discussionText === "";

  const postData = {
    category_id: selectedCategory,
    title,
    content: discussionText,
    images: newImages,
  };

  const editData = {
    category_id: selectedCategory,
    title,
    content: discussionText,
    images: newImages,
    delete_images: deleteImages,
  };

  const handlePost = () => {
    if (edit_data) {
      editDiscussion(edit_data?.post_id, editData);
    } else {
      createDiscussion(postData);
    }
  };

  useEffect(() => {
    if (editCode === 200) {
      navigation.goBack();
      setEditCode(null);
      toast.show({
        description: "Your discussion has been updated!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <ToastTitle>Your discussion has been updated!</ToastTitle>
            </Toast>
          );
        },
      });
    }
  }, [editCode]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 13,
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        {edit_data ? (
          <Button
            disabled={disabledPost || !isDirty || editLoading || loading}
            bgColor={
              disabledPost || !isDirty || editLoading
                ? COLORS.secondary
                : COLORS.primary
            }
            rounded={20}
            size="sm"
            onPress={handlePost}
          >
            <Text style={{ color: COLORS.white, fontFamily: "bold" }}>
              {editLoading ? "Updating..." : "Update"}
            </Text>
          </Button>
        ) : (
          <Button
            disabled={disabledPost}
            bgColor={disabledPost ? COLORS.secondary : COLORS.primary}
            rounded={20}
            size="sm"
            onPress={handlePost}
          >
            <Text style={{ color: COLORS.white, fontFamily: "bold" }}>
              {loading ? "Posting..." : "Post"}
            </Text>
          </Button>
        )}
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          flex: 1,
          backgroundColor: COLORS.white,
          gap: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              maxWidth: "60%",
            }}
          >
            <Image
              source={
                profileData?.profile_picture
                  ? { uri: profileData?.profile_picture }
                  : require("../../../assets/content/profpic.png")
              }
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
            <Text numberOfLines={2} style={{ fontFamily: "bold", flex: 1 }}>
              {profileData?.first_name + " " + profileData?.last_name}
            </Text>
          </View>

          <View style={{ gap: 10, width: "40%" }}>
            <Text style={{ fontFamily: "bold" }}>Category</Text>
            <SelectComponent
              placeholder="Select Category"
              items={remapCategory()}
              onValueChange={(value) => setSelectedCategory(value)}
              defaultValue={editCategoryName}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderRadius: 5,
            gap: 10,
          }}
        >
          <TextInput
            placeholder="Title"
            style={{ fontFamily: "bold", fontSize: 18 }}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Write a Discussion"
            style={{ flex: 1, textAlignVertical: "top", fontFamily: "regular" }}
            multiline
            value={discussionText}
            onChangeText={handleTextChange}
          />

          <View style={{ flexDirection: "row", gap: 10 }}>
            {mergeImage.length > 0 && (
              <FlatList
                data={mergeImage}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 15 }}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={{ uri: item?.uri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />

                    <Ionicons
                      name="close-circle"
                      size={24}
                      color={COLORS.red}
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 5,
                      }}
                      onPress={() => {
                        if (item?.type) {
                          setNewImages((prevImages) => {
                            return prevImages.filter(
                              (image) => image.uri !== item.uri,
                            );
                          });
                        } else {
                          setImages((prevImages) => {
                            return prevImages.filter(
                              (image) => image.uri !== item.uri,
                            );
                          });

                          setDeleteImages((prevImages) => {
                            return [...prevImages, item.uri];
                          });
                        }
                      }}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 28,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <Ionicons
          name="images-outline"
          size={24}
          color={COLORS.primary}
          onPress={() => {
            if (mergeImage.length < 4) handleImagePick();
            else alert("Max 4 images");
          }}
        />
        <Text style={{ fontFamily: "semibold", color: COLORS.primary }}>
          {discussionText.length}/500
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CreateDiscussion;

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
  useGetDiscussionCategoryApi,
} from "../../../API/DiscussionApi";
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";
import { SelectComponent } from "../../molecules";

const CreateDiscussion = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [discussionText, setDiscussionText] = useState("");
  const [images, setImages] = useState([]);
  const profileData = useSelector(userDataState);
  const [isDirty, setIsDirty] = useState(false);

  const toast = useToast();

  const route = useRoute();

  const { edit_data } = route.params || {};

  useEffect(() => {
    if (edit_data) {
      setTitle(edit_data.title);
      setSelectedCategory(edit_data.category.category_name);
      setDiscussionText(edit_data.content);
      const imageUri = edit_data.images?.map((image) => {
        return {
          uri: image.image_uri,
        };
      });
      setImages(imageUri);
    }
  }, [edit_data]);

  useEffect(() => {
    const isDiscussionDirty =
      title !== edit_data?.title ||
      selectedCategory !== edit_data?.category?.category_name ||
      discussionText !== edit_data?.content ||
      images?.length !== edit_data?.images?.length;
    setIsDirty(isDiscussionDirty);
  }, [title, selectedCategory, discussionText, images, edit_data]);

  const { getDiscussionCategory, discussionCategory } =
    useGetDiscussionCategoryApi();
  const { createDiscussion, code, setCode } = useCreateDiscussionApi();

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

        setImages((prevImages) => [...prevImages, newFile]);
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
    images,
  };

  const handlePost = () => {
    createDiscussion(postData);
  };

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
            disabled={disabledPost || !isDirty}
            bgColor={
              disabledPost || !isDirty ? COLORS.secondary : COLORS.primary
            }
            rounded={20}
            size="sm"
            onPress={handlePost}
          >
            <Text style={{ color: COLORS.white, fontFamily: "bold" }}>
              Save
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
              Post
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
              defaultValue={selectedCategory}
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
            {images.length > 0 && (
              <FlatList
                data={images}
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
                      onPress={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
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
            if (images.length < 4) handleImagePick();
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

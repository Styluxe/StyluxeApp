import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import {
  Button,
  Select,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { styles } from "./StylistAboutMe.style";
import {
  useGetStylistByAuthApi,
  useUpdateStylistByIdApi,
} from "../../../API/StylistApi";
import { COLORS, SHADOWS } from "../../../constants";
import { useKeyboardVisibility } from "../../../hook/hook";
import { SelectComponent } from "../../molecules";

const StylistAboutMe = () => {
  const navigation = useNavigation();
  const { getStylistByAuth, stylistData } = useGetStylistByAuthApi();
  const { updateStylistById, code, setCode, loading } =
    useUpdateStylistByIdApi();
  const [isEditing, setIsEditing] = useState(false);
  const [actualData, setActualData] = useState(null);
  const [editData, setEditData] = useState({
    brand_name: null,
    about: null,
    rating: null,
    price: null,
    type: null,
  });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [images, setImages] = useState([]);
  const [actualImages, setActualImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);

  const mergeImage = images.concat(newImages);

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

  useKeyboardVisibility(setButtonVisible);

  useFocusEffect(
    useCallback(() => {
      getStylistByAuth();
    }, []),
  );

  useEffect(() => {
    if (stylistData) {
      setActualData(stylistData);
      const image_uri = stylistData.images?.map((image) => {
        return {
          uri: image.image_url,
        };
      });
      setImages(image_uri);
      setActualImages(image_uri);
    }
  }, [stylistData]);

  const toast = useToast();

  useEffect(() => {
    if (code === 200) {
      toast.show({
        description: "Stylist update success",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Stylist update success</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setIsEditing(false);
      getStylistByAuth();
      setCode(null);
    } else if (code === 400) {
      toast.show({
        description: "Error updating stylist, please Input again",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="solid">
              <VStack>
                <ToastTitle>Error updating stylist</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setIsEditing(false);
      setCode(null);
    }
  }, [code]);

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      brand_name: actualData?.brand_name,
      about: actualData?.about,
      price: actualData?.price,
      type: actualData?.type,
    });
    setImages(actualImages);
  };

  const handleEdit = () => {
    setEditData({
      brand_name: actualData?.brand_name,
      about: actualData?.about,
      price: actualData?.price,
      type: actualData?.type,
    });
    setIsEditing(true);
  };

  const onSave = () => {
    const edit_data = {
      brand_name: editData?.brand_name,
      about: editData?.about,
      price: editData?.price,
      type: editData?.type,
      images: newImages,
      delete_images: deleteImages,
    };

    updateStylistById(edit_data);
    setNewImages([]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.primary}
          onPress={() => {
            if (isEditing) {
              handleCancel();
            } else {
              navigation.goBack();
            }
          }}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "bold",
              textAlign: "center",
            }}
          >
            {isEditing ? "Edit About Me" : "About Me"}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.detail_body_container}>
          <View style={styles.card_container}>
            <View style={styles.image_container}>
              <Swiper
                showsButtons={images?.length > 1}
                activeDotColor={COLORS.primary}
                nextButton={
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: COLORS.white,
                      borderRadius: 100,
                      ...SHADOWS.medium,
                    }}
                  >
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={COLORS.primary}
                    />
                  </View>
                }
                prevButton={
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: COLORS.white,
                      borderRadius: 100,
                      ...SHADOWS.medium,
                    }}
                  >
                    <AntDesign
                      name="arrowleft"
                      size={24}
                      color={COLORS.primary}
                    />
                  </View>
                }
              >
                {images.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="image" size={100} color={COLORS.primary} />
                  </View>
                ) : (
                  images.map((item, index) => (
                    <View key={index} style={{ flex: 1 }}>
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                      />
                    </View>
                  ))
                )}
              </Swiper>
            </View>

            <View style={styles.info_container}>
              {isEditing ? (
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <TextInput
                    placeholder="Stylist Name"
                    style={{
                      fontFamily: "semibold",
                      fontSize: 18,
                      maxWidth: "80%",
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray2,
                      minWidth: "40%",
                    }}
                    value={editData?.brand_name}
                    onChangeText={(text) =>
                      setEditData({ ...editData, brand_name: text })
                    }
                  />
                  <Feather name="edit" size={18} color={COLORS.primary} />
                </View>
              ) : (
                <Text style={styles.stylist_header}>
                  {actualData?.brand_name ||
                    actualData?.user.first_name +
                      " " +
                      actualData?.user.last_name}
                </Text>
              )}

              {isEditing ? (
                <View style={{ flexDirection: "row", gap: 5 }}>
                  {/* <TextInput
                    value={editData?.type}
                    placeholder="Stylist Type"
                    onChangeText={(text) =>
                      setEditData({ ...editData, type: text })
                    }
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: COLORS.darkGray,
                      maxWidth: "80%",
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray2,
                      minWidth: "30%",
                    }}
                  /> */}
                  <SelectComponent
                    placeholder="Stylist Type"
                    items={[
                      {
                        id: 1,
                        label: "Party Stylist",
                        value: "Party Stylist",
                      },
                      {
                        id: 2,
                        label: "Wedding Stylist",
                        value: "Wedding Stylist",
                      },
                    ]}
                    onValueChange={(value) =>
                      setEditData({ ...editData, type: value })
                    }
                    defaultValue={editData?.type}
                  />

                  <Feather name="edit" size={18} color={COLORS.primary} />
                </View>
              ) : (
                <Text style={styles.category_text}>
                  {actualData?.type || "-"}
                </Text>
              )}
            </View>

            {isEditing ? (
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <View style={styles.price_container}>
                  <TextInput
                    style={{
                      fontFamily: "semibold",
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray,
                      minWidth: "15%",
                    }}
                    value={editData?.price?.toString() || 0}
                    placeholder="price"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setEditData({ ...editData, price: parseInt(text, 10) })
                    }
                  />
                  <Text style={styles.price_info_text}>- per Session</Text>
                </View>

                <Feather name="edit" size={18} color={COLORS.primary} />
              </View>
            ) : (
              <View style={styles.price_container}>
                <Text style={styles.price_text}>
                  Rp {parseFloat(actualData?.price).toLocaleString("id") || "-"}{" "}
                  <Text style={styles.price_info_text}>- per Session</Text>
                </Text>
              </View>
            )}
          </View>

          <View style={styles.card_container}>
            <Text style={styles.stylist_header}>About Stylist</Text>
            {isEditing ? (
              <TextInput
                value={editData?.about}
                placeholder="About Me"
                onChangeText={(text) =>
                  setEditData({ ...editData, about: text })
                }
                multiline
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  color: COLORS.darkGray,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray2,
                }}
              />
            ) : (
              <Text style={styles.stylist_content_text}>
                {actualData?.about || "-"}
              </Text>
            )}
          </View>

          {isEditing && (
            <>
              <TouchableOpacity
                onPress={() => {
                  if (images.length < 4) handleImagePick();
                  else alert("Max 4 images");
                }}
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: COLORS.primary,
                  alignSelf: "flex-end",
                  backgroundColor: COLORS.white,
                }}
              >
                <Ionicons
                  name="images-outline"
                  size={24}
                  color={COLORS.primary}
                />

                <Text
                  style={{
                    fontFamily: "semibold",
                    fontSize: 14,
                  }}
                >
                  Add Images
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", gap: 10 }}>
                {images.length > 0 && (
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
                            top: 5,
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
            </>
          )}
        </View>
      </ScrollView>

      {buttonVisible && (
        <View style={{ padding: 10 }}>
          <Button
            disabled={loading}
            bgColor={loading ? COLORS.secondary : COLORS.primary}
            onPress={() => (isEditing ? onSave() : handleEdit())}
          >
            <Text
              style={{ color: COLORS.white, fontFamily: "bold", fontSize: 20 }}
            >
              {isEditing ? "Save" : loading ? "Saving..." : "Edit About Me"}
            </Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StylistAboutMe;

import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
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

const StylistAboutMe = () => {
  const navigation = useNavigation();
  const { getStylistByAuth, stylistData } = useGetStylistByAuthApi();
  const { updateStylistById, code, setCode } = useUpdateStylistByIdApi();
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
    }
  }, [stylistData]);

  useEffect(() => {
    if (code === 200) {
      alert("Stylist updated successfully");
      setIsEditing(false);
      getStylistByAuth();
      setCode(null);
    } else if (code === 400) {
      alert("Stylist update failed");
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
    updateStylistById(editData);
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
            // eslint-disable-next-line no-unused-expressions
            isEditing ? handleCancel() : navigation.goBack();
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
                  <TextInput
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
                            top: 5,
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
            </>
          )}
        </View>
      </ScrollView>

      {buttonVisible && (
        <View style={{ padding: 10 }}>
          <Button
            bgColor={COLORS.primary}
            onPress={() => (isEditing ? onSave() : handleEdit())}
          >
            <Text
              style={{ color: COLORS.white, fontFamily: "bold", fontSize: 20 }}
            >
              {isEditing ? "Save" : "Edit About Me"}
            </Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StylistAboutMe;

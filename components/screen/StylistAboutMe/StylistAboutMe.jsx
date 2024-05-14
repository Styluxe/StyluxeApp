import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { styles } from "./StylistAboutMe.style";
import {
  useGetStylistByIdApi,
  useUpdateStylistByIdApi,
} from "../../../API/StylistApi";
import { COLORS, SHADOWS } from "../../../constants";
import { useKeyboardVisibility } from "../../../hook/hook";
import { dummyStylistDetail } from "../../../mocks/DummyStylist";

const StylistAboutMe = () => {
  const navigation = useNavigation();
  const { getStylistById, stylistData } = useGetStylistByIdApi();
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

  console.log("edit", editData);

  useKeyboardVisibility(setButtonVisible);

  useFocusEffect(
    useCallback(() => {
      getStylistById();
    }, []),
  );

  useEffect(() => {
    if (stylistData) {
      setActualData(stylistData);
    }
  }, [stylistData]);

  useEffect(() => {
    if (code === 200) {
      alert("Stylist updated successfully");
      setIsEditing(false);
      getStylistById();
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
      brand_name: actualData.brand_name,
      about: actualData.about,
      price: actualData.price,
      type: actualData.type,
    });
  };

  const handleEdit = () => {
    setEditData({
      brand_name: actualData.brand_name,
      about: actualData.about,
      price: actualData.price,
      type: actualData.type,
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
                showsButtons={dummyStylistDetail.images.length > 1}
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
                {dummyStylistDetail.images.map((item, index) => (
                  <View key={index} style={{ flex: 1 }}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                ))}
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
                    value={editData?.price}
                    placeholder="price"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setEditData({ ...editData, price: text })
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

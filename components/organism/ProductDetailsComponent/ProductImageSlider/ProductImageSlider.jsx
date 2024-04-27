import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";

import { COLORS } from "../../../../constants";

const ProductImageSlider = ({ images }) => {
  const navigation = useNavigation();

  return (
    <View style={{ height: 400 }}>
      <Swiper
        showsButtons
        activeDotColor={COLORS.primary}
        nextButton={
          <AntDesign name="arrowright" size={24} color={COLORS.primary} />
        }
        prevButton={
          <AntDesign name="arrowleft" size={24} color={COLORS.primary} />
        }
      >
        {images.map((item, index) => (
          <View key={index} style={{ flex: 1 }}>
            <Image
              source={{ uri: item?.image_url }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        style={{ position: "absolute", top: 20, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <View
          style={{
            padding: 5,
            backgroundColor: COLORS.primary,
            borderRadius: 100,
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductImageSlider;

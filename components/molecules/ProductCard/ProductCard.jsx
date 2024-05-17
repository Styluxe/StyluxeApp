import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./ProductCard.style";
import { COLORS } from "../../../constants";

const ProductCard = ({
  hasBanner = false,
  bannerColor = COLORS.primary,
  bannerText = "BRAND NEW",
  imageUrl = "https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-8044872-6430781.png",
  title = "Blue Shirt",
  category = "Shirts",
  price = "200.000",
  rating = 4.5,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.image_container}>
          <Image
            source={
              !imageUrl
                ? require("../../../assets/content/empty_product.png")
                : { uri: imageUrl }
            }
            style={styles.image}
          />
          {hasBanner && (
            <View
              style={[
                styles.banner_container,
                { backgroundColor: bannerColor },
              ]}
            >
              <Text style={styles.banner_text}>{bannerText}</Text>
            </View>
          )}
        </View>

        <View style={{ padding: 5 }}>
          <Text
            numberOfLines={1}
            style={{ fontFamily: "medium", fontSize: 16 }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: "regular",
              color: COLORS.primary,
              fontSize: 14,
            }}
          >
            {category}
          </Text>

          <Text
            style={{
              fontFamily: "bold",
              color: COLORS.black,
              fontSize: 18,
            }}
          >
            <Text
              style={{
                fontFamily: "bold",
                color: COLORS.black,
                fontSize: 14,
              }}
            >
              Rp{" "}
            </Text>
            {price}
          </Text>

          {/* <View style={{ flexDirection: "row", gap: 5 }}>
            <Octicons name="star-fill" size={18} color="orange" />
            <Text style={{ fontFamily: "medium", color: COLORS.gray }}>
              {rating}
            </Text>
          </View> */}
        </View>

        {/* <TouchableOpacity>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 100,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: 20,
              right: 10,
            }}
          >
            <Octicons name="plus" size={18} color="white" />
          </View>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

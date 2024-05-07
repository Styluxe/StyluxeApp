import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../../constants";

const CategoryMenu = ({ data, onPress, selectedCategory }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          gap: 5,
          alignItems: "center",
          padding: 5,
          backgroundColor:
            selectedCategory?.product_category_id === data?.product_category_id
              ? COLORS.lightWhite
              : null,
        }}
      >
        <Ionicons
          name={data.category_icon}
          size={24}
          color={
            selectedCategory?.product_category_id === data?.product_category_id
              ? COLORS.primary
              : "#616161"
          }
        />
        <Text
          style={{
            fontFamily: "semibold",
            fontSize: 12,
            color:
              selectedCategory?.product_category_id === data.product_category_id
                ? COLORS.primary
                : "#616161",
          }}
        >
          {data?.category_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryMenu;

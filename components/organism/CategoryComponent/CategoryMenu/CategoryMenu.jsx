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
            selectedCategory.id === data.id ? COLORS.lightWhite : null,
        }}
      >
        <Ionicons
          name={data.icon}
          size={24}
          color={selectedCategory.id === data.id ? COLORS.primary : "#616161"}
        />
        <Text
          style={{
            fontFamily: "semibold",
            fontSize: 12,
            color: selectedCategory.id === data.id ? COLORS.primary : "#616161",
          }}
        >
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryMenu;

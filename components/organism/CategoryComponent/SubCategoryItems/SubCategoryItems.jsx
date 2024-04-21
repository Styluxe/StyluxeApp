import React from "react";
import { View, Text, Image } from "react-native";

const SubCategoryItems = ({ data }) => {
  return (
    <View
      style={{
        width: 80,
        height: 120,
        overflow: "hidden",
        gap: 5,
      }}
    >
      <View style={{ width: "100%", height: "60%", overflow: "hidden" }}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={{ uri: data.imageUrl }}
        />
      </View>
      <Text
        numberOfLines={2}
        style={{
          textAlign: "center",
          fontFamily: "medium",
          fontSize: 12,
          color: "#616161",
          minWidth: 50,
        }}
      >
        {data.name}
      </Text>
    </View>
  );
};

export default SubCategoryItems;

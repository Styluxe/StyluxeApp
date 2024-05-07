import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const SubCategoryItems = ({ data }) => {
  const navigation = useNavigation();
  const handleTouch = () => {
    navigation.navigate("ProductList", {
      subCategoryId: data?.product_sub_category_id,
    });
  };

  return (
    <TouchableOpacity onPress={handleTouch}>
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
            source={{ uri: data?.sub_category_image }}
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
          {data?.sub_category_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubCategoryItems;

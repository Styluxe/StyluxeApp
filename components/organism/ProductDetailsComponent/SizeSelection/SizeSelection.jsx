import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../../constants";

const SizeSelection = ({ data, selectedSize, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderWidth: 2,
          borderColor:
            selectedSize?.id === data?.id ? COLORS.primary : COLORS.gray2,
          borderRadius: 5,
          backgroundColor: selectedSize?.id === data?.id ? COLORS.gray2 : null,
        }}
      >
        <Text>{data?.size}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SizeSelection;

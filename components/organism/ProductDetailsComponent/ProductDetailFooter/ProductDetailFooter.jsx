import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./ProductDetailFooter.style";

const ProductDetailFooter = ({ onPress, isDisabled }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onPress}
          disabled={isDisabled}
        >
          <View
            style={
              isDisabled ? styles.button_cart_disabled : styles.button_cart
            }
          >
            <Text style={styles.button_text}>Add To Cart</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailFooter;

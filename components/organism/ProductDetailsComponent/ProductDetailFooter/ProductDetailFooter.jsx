import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./ProductDetailFooter.style";
import { COLORS } from "../../../../constants";

const ProductDetailFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <TouchableOpacity>
          <View style={styles.button_love}>
            <AntDesign name="hearto" size={24} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}>
          <View style={styles.button_cart}>
            <Text style={styles.button_text}>Add To Cart</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailFooter;

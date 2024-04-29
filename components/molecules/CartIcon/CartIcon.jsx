import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./CartIcon.style";
import { COLORS } from "../../../constants";

const CartIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ShoppingCart")}>
      <View>
        <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
        <View style={styles.cart_counter_container}>
          <Text style={styles.cart_counter_text}>0</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;

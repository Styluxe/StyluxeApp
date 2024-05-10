import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { styles } from "./CartIcon.style";
import { useViewCartApi } from "../../../API/CheckoutAPI";
import { COLORS } from "../../../constants";
import { authKeyState, cartCountState } from "../../../redux/slice/app.slice";

const CartIcon = () => {
  const { getCart } = useViewCartApi();
  const auth = useSelector(authKeyState);
  const cartCount = useSelector(cartCountState);

  useEffect(() => {
    getCart();
  }, []);

  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ShoppingCart")}>
      <View>
        <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
        <View style={styles.cart_counter_container}>
          <Text style={styles.cart_counter_text}>{cartCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;

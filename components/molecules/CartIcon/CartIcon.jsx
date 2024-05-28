import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./CartIcon.style";
import { useViewCartApi } from "../../../API/CheckoutAPI";
import { COLORS } from "../../../constants";
import {
  authKeyState,
  cartCountState,
  setLoginModalOpen,
} from "../../../redux/slice/app.slice";

const CartIcon = ({ size = 24 }) => {
  const { getCart } = useViewCartApi();
  const auth = useSelector(authKeyState);
  const cartCount = useSelector(cartCountState);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        getCart();
      }
    }, [auth]),
  );

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (auth) {
          navigation.navigate("ShoppingCart");
        } else {
          dispatch(setLoginModalOpen(true));
        }
      }}
    >
      <View>
        <Ionicons name="cart-outline" size={size} color={COLORS.primary} />
        <View style={styles.cart_counter_container}>
          <Text style={styles.cart_counter_text}>{cartCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;

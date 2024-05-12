/* eslint-disable prettier/prettier */
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { useRemoveFromCartApi, useViewCartApi } from "../../../API/CheckoutAPI";
import { COLORS } from "../../../constants";
import { useKeyboardVisibility } from "../../../hook/hook";
import { authKeyState, cartDataState } from "../../../redux/slice/app.slice";
import CartItemCard from "../../organism/ShoppingCartComponent/CartItemCard/CartItemCard";

const ShoppingCart = () => {
  const navigation = useNavigation();
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  // const [cartData, setCartData] = useState({});
  const cartData = useSelector(cartDataState);

  const { loading: loadingViewCart, getCart } = useViewCartApi();
  const { code, removeFromCart } = useRemoveFromCartApi();
  const auth = useSelector(authKeyState);

  useKeyboardVisibility(setIsFooterVisible);

  useEffect(() => {
    if (auth) {
      getCart();
    }
  }, [auth]);

  const handleRemoveItem = useCallback(
    async (cartId) => {
      try {
        await removeFromCart(cartId);
        await getCart();
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    },
    [removeFromCart, getCart],
  );

  const calculateTotalPrice = () => {
    if (!cartData || !cartData.cart_items) return 0;
    return cartData.cart_items
      .reduce(
        (total, item) =>
          total + parseFloat(item.product.product_price) * item.quantity,
        0,
      )
      .toLocaleString("id-ID");
  };

  const emptyCart = cartData?.cart_items?.length === 0 || !cartData;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.white,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontFamily: "semibold", fontSize: 20 }}>
            Shopping Cart (
            {loadingViewCart ? 0 : cartData?.cart_items?.length || 0})
          </Text>
        </View>
      </View>
      {emptyCart && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontFamily: "medium", fontSize: 20 }}>
            Cart Is Empty
          </Text>
        </View>
      )}
      <FlatList
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 15,
        }}
        data={cartData.cart_items}
        renderItem={({ item }) => (
          <CartItemCard
            cartId={item?.cart_item_id}
            title={item.product?.product_name}
            price={parseFloat(item.product.product_price).toLocaleString(
              "id-ID",
            )}
            size={item?.size}
            quantity={item?.quantity}
            image={item?.product?.images[0]?.image_url}
            onPressDelete={() => handleRemoveItem(item?.cart_item_id)}
          />
        )}
      />
      {isFooterVisible && (
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            gap: 10,
            borderTopWidth: 1,
            borderTopColor: COLORS.gray2,
          }}
        >
          <Text style={{ fontFamily: "semibold", fontSize: 18 }}>
            Sub Total: Rp. {calculateTotalPrice()}
          </Text>
          <TouchableOpacity
            disabled={emptyCart}
            onPress={() => navigation.navigate("Checkout")}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor: emptyCart ? COLORS.gray2 : COLORS.primary,
                padding: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "semibold", color: COLORS.white }}>
                Check Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ShoppingCart;

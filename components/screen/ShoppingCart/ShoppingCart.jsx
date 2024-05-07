import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { useViewCartApi } from "../../../API/CheckoutAPI";
import { COLORS } from "../../../constants";
import { useKeyboardVisibility } from "../../../hook/hook";
import { authKeyState } from "../../../redux/slice/app.slice";
import CartItemCard from "../../organism/ShoppingCartComponent/CartItemCard/CartItemCard";

const ShoppingCart = () => {
  const navigation = useNavigation();
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  useKeyboardVisibility(setIsFooterVisible);
  const { viewCart, loading, getCart } = useViewCartApi();
  const auth = useSelector(authKeyState);

  useEffect(() => {
    if (auth) {
      getCart();
    }
  }, []);

  // Function to calculate the total price of all cart items
  const calculateTotalPrice = () => {
    if (!viewCart || !viewCart.cart_items) return 0;
    let totalPrice = 0;
    viewCart.cart_items.forEach((item) => {
      totalPrice += parseFloat(item.product.product_price) * item.quantity;
    });
    return totalPrice.toLocaleString("id-ID");
  };

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
            {loading ? 0 : viewCart.cart_items ? viewCart.cart_items.length : 0}
            )
          </Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 15,
        }}
        data={viewCart.cart_items}
        renderItem={({ item }) => (
          <CartItemCard
            title={item.product?.product_name}
            price={parseFloat(item.product.product_price).toLocaleString(
              // eslint-disable-next-line prettier/prettier
              "id-ID"
            )}
            size={item?.size}
            quantity={item?.quantity}
            image={item?.product?.images[0]?.image_url}
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

          <TouchableOpacity onPress={() => navigation.navigate("Checkout")}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: COLORS.primary,
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

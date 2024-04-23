import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { useKeyboardVisibility } from "../../../hook/hook";
import CartItemCard from "../../organism/ShoppingCartComponent/CartItemCard/CartItemCard";

const ShoppingCart = () => {
  const navigation = useNavigation();
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  useKeyboardVisibility(setIsFooterVisible);

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
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontFamily: "semibold", fontSize: 20 }}>
            Shopping Cart (0)
          </Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
        data={[1]}
        renderItem={() => <CartItemCard />}
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
            Sub Total: Rp. 150,000
          </Text>

          <TouchableOpacity>
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

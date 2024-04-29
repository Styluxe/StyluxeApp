import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { CartIcon, ProductCard } from "../../molecules";

const ProductList = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text style={{ fontFamily: "semibold", fontSize: 16 }}>
            Men's T Shirt
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Ionicons name="search" size={24} color={COLORS.primary} />
          <CartIcon />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
          ListHeaderComponent={() => (
            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Showing Products from{" "}
                <Text style={{ fontFamily: "semibold", color: COLORS.primary }}>
                  Men's T shirts (5)
                </Text>
              </Text>

              <Ionicons name="filter" size={24} color={COLORS.primary} />
            </View>
          )}
          contentContainerStyle={{ gap: 15, paddingVertical: 15 }}
          renderItem={() => <ProductCard />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductList;

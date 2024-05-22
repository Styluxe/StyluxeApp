import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useProductCategoryApi } from "../../../API/CategoryAPI";
import { useSearchProductApi } from "../../../API/ProductAPI";
import { COLORS } from "../../../constants";
import { CartIcon, FilterModal, ProductCard } from "../../molecules";

const ProductList = () => {
  const navigation = useNavigation();
  const { getProductCategory, productCategory } = useProductCategoryApi();
  const { searchProduct, products } = useSearchProductApi();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const route = useRoute();
  const { subCategoryId, search } = route.params;

  useEffect(() => {
    if (subCategoryId) {
      getProductCategory({ categoryId: subCategoryId });
    } else if (search) {
      searchProduct(search);
    }
  }, []);

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
            {productCategory?.sub_category_name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Ionicons
            onPress={() => navigation.navigate("Search")}
            name="search"
            size={24}
            color={COLORS.primary}
          />
          <CartIcon />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={search ? products : productCategory?.products}
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
                {search ? (
                  <Text
                    style={{ fontFamily: "semibold", color: COLORS.primary }}
                  >
                    {search} ({products?.length})
                  </Text>
                ) : (
                  <Text
                    style={{ fontFamily: "semibold", color: COLORS.primary }}
                  >
                    {productCategory?.sub_category_name} (
                    {productCategory?.products?.length})
                  </Text>
                )}
              </Text>

              <Feather
                name="filter"
                size={24}
                color={COLORS.primary}
                onPress={() => setShowModal(true)}
              />
            </View>
          )}
          contentContainerStyle={{ gap: 15, paddingVertical: 15 }}
          renderItem={({ item }) => (
            <ProductCard
              category={productCategory?.sub_category_name}
              imageUrl={item?.images[0]?.image_url}
              price={parseFloat(item?.product_price).toLocaleString("id-ID")}
              title={item?.product_name}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  product_id: item?.product_id,
                })
              }
            />
          )}
        />
      </View>
      <FilterModal
        modalRef={modalRef}
        setShowModal={setShowModal}
        showModal={showModal}
        selectedSize={selectedSize}
        selectedSort={selectedSort}
        setSelectedSize={setSelectedSize}
        setSelectedSort={setSelectedSort}
      />
    </SafeAreaView>
  );
};

export default ProductList;

import { Feather, Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useProductCategoryApi } from "../../../API/CategoryAPI";
import {
  useProductFilterApi,
  useSearchProductApi,
} from "../../../API/ProductAPI";
import { COLORS } from "../../../constants";
import { CartIcon, FilterModal, ProductCard } from "../../molecules";

const ProductList = () => {
  const navigation = useNavigation();
  const {
    getProductCategory,
    productCategory,
    code: productCategoryCode,
    setCode: setProductCategoryCode,
  } = useProductCategoryApi();
  const {
    searchProduct,
    products,
    code: searchCode,
    setCode: setSearchCode,
  } = useSearchProductApi();
  const {
    productFilter,
    setCode: setProductFilterCode,
    code: productFilterCode,
    products: productFilterData,
  } = useProductFilterApi();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const [productdata, setProductData] = useState([]);

  const route = useRoute();
  const { subCategoryId, search } = route.params;

  useFocusEffect(
    useCallback(() => {
      if (subCategoryId) {
        getProductCategory({ categoryId: subCategoryId });
      } else if (search) {
        searchProduct(search);
      }
    }, []),
  );

  useEffect(() => {
    if (productCategoryCode === 200) {
      setProductData(productCategory?.products);
      setProductCategoryCode(null);
    } else if (searchCode === 200) {
      setProductData(products);
      setSearchCode(null);
    }
  }, [productCategoryCode, searchCode, productCategory, products]);

  const filterRequest = {
    size: selectedSize?.value,
    order: selectedSort?.value?.order,
    sortBy: selectedSort?.value?.sortBy,
    keyword: search ? search : productCategory?.sub_category_name,
  };

  const handleFilter = () => {
    productFilter(filterRequest);
  };

  useEffect(() => {
    if (productFilterCode === 200) {
      setProductData(productFilterData);
      setProductFilterCode(null);
      setShowModal(false);
    }
  }, [productFilterCode, productFilterData]);

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
          data={productdata}
          numColumns={2}
          columnWrapperStyle={{
            // justifyContent: "space-between",
            gap: 40,
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
                    {search} ({productdata?.length})
                  </Text>
                ) : (
                  <Text
                    style={{ fontFamily: "semibold", color: COLORS.primary }}
                  >
                    {productCategory?.sub_category_name} ({productdata?.length})
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
          contentContainerStyle={{
            gap: 15,
            paddingVertical: 15,
          }}
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
        handleApply={handleFilter}
      />
    </SafeAreaView>
  );
};

export default ProductList;

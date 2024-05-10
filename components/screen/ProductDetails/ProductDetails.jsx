import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { Divider } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./ProductDetails.style";
import { useGetSingleProductApi } from "../../../API/ProductAPI";
import { dummyProductDetails } from "../../../mocks/DummyProduct";
import {
  ProductAccordion,
  ProductDetailFooter,
  ProductImageSlider,
  SizeSelection,
} from "../../organism";
import { useAddToCartApi, useViewCartApi } from "../../../API/CheckoutAPI";

const ProductDetails = () => {
  const star = [1, 2, 3, 4, 5];

  const route = useRoute();
  const { product_id } = route.params;

  const navigation = useNavigation();

  const { getProduct, product } = useGetSingleProductApi();
  const { getCart } = useViewCartApi();
  const { addToCart, code } = useAddToCartApi();

  useEffect(() => {
    getProduct({ productId: product_id });
  }, []);

  useEffect(() => {
    if (code === 200) {
      alert("Added to cart");
      getCart();
      // navigation.navigate("ShoppingCart");
    }
  }, [code]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const countDisabled = count === 1;

  const CartData = {
    product_id,
    quantity: count,
    size: selectedSize?.size,
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        <ScrollView>
          <ProductImageSlider images={product?.images} />

          <View style={styles.information_container}>
            <View style={styles.product_info_container}>
              <View style={{ gap: 5 }}>
                <Text style={styles.product_name}>{product?.product_name}</Text>
                <Text style={styles.product_category}>
                  {product?.sub_category?.sub_category_name}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.product_price}>
                  <Text style={{ fontFamily: "semibold" }}>Rp</Text>
                  {parseFloat(product?.product_price).toLocaleString("id-ID")}
                </Text>

                <View style={styles.rating_container}>
                  {star.map((item, index) => (
                    <FontAwesome
                      key={index}
                      name={
                        item <= dummyProductDetails.rating ? "star" : "star-o"
                      }
                      size={18}
                      color="orange"
                    />
                  ))}

                  <Text style={styles.rating_total}>
                    {dummyProductDetails.rating}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <View style={styles.size_selection_label_container}>
                <Text style={styles.size_selection_label}>Select Size:</Text>
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 16,
                    color:
                      selectedSize?.size && selectedSize?.stock > 10
                        ? "green"
                        : "red",
                  }}
                >
                  {selectedSize?.size
                    ? selectedSize?.stock + " Left"
                    : "Select One"}
                </Text>
              </View>
              <View style={styles.size_button_container}>
                <FlatList
                  data={product?.sizes}
                  renderItem={({ item }) => (
                    <SizeSelection
                      onPress={() => setSelectedSize(item)}
                      selectedSize={selectedSize}
                      data={item}
                    />
                  )}
                  horizontal
                  contentContainerStyle={styles.size_list_container}
                />

                <View style={styles.counter_container}>
                  <TouchableOpacity
                    onPress={() => {
                      decrement();
                    }}
                    disabled={countDisabled}
                  >
                    <SimpleLineIcons
                      name="minus"
                      size={20}
                      color={countDisabled ? "gray" : "black"}
                    />
                  </TouchableOpacity>
                  <TextInput
                    onChangeText={(text) => {
                      setCount(parseInt(text, 10) || 1);
                    }}
                    inputMode="numeric"
                    value={count.toString()}
                    style={{ width: 30, textAlign: "center" }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      increment();
                    }}
                  >
                    <SimpleLineIcons name="plus" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Divider marginTop={20} bg="$backgroundLight400" />
            <ProductAccordion accordionData={product} />
          </View>
        </ScrollView>
      </View>
      <ProductDetailFooter
        onPress={() => {
          console.log(CartData);
          addToCart(CartData.product_id, CartData.quantity, CartData.size);
        }}
        isDisabled={!selectedSize?.size}
      />
    </SafeAreaView>
  );
};

export default ProductDetails;

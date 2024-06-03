import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import {
  Divider,
  Spinner,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
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
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./ProductDetails.style";
import { useAddToCartApi, useViewCartApi } from "../../../API/CheckoutAPI";
import { useGetSingleProductApi } from "../../../API/ProductAPI";
import {
  setLoginModalOpen,
  userDataState,
} from "../../../redux/slice/app.slice";
import {
  ProductAccordion,
  ProductBottomSheet,
  ProductDetailFooter,
  ProductImageSlider,
  SizeSelection,
} from "../../organism";
import { COLORS } from "../../../constants";

const ProductDetails = () => {
  const route = useRoute();
  const { product_id } = route.params;

  const user = useSelector(userDataState);

  const dispatch = useDispatch();

  const { getProduct, product, loading } = useGetSingleProductApi();
  const { getCart } = useViewCartApi();
  const { addToCart, code, setCode } = useAddToCartApi();

  const [openSheet, setOpenSheet] = useState(false);
  const toast = useToast();

  const no_auth = !user?.user_role;

  useEffect(() => {
    getProduct({ productId: product_id });
  }, []);

  useEffect(() => {
    if (code === 200) {
      toast.show({
        description: "Success add to cart!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Success add to cart!</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      getCart();
      setCode(null);
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
            <ProductAccordion
              accordionData={product}
              onPressReference={() => setOpenSheet(true)}
            />
          </View>
        </ScrollView>
      </View>
      <ProductDetailFooter
        onPress={() => {
          if (no_auth) {
            dispatch(setLoginModalOpen(true));
          } else {
            addToCart(CartData.product_id, CartData.quantity, CartData.size);
          }
        }}
        isDisabled={!selectedSize?.size}
      />
      <ProductBottomSheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
        data={product?.references}
        product_name={product?.product_name}
      />
    </SafeAreaView>
  );
};

export default ProductDetails;

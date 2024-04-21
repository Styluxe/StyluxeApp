import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { Divider } from "@gluestack-ui/themed";
import React, { useState } from "react";
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
import {
  ProductAccordion,
  ProductDetailFooter,
  ProductImageSlider,
  SizeSelection,
} from "../../organism";

const ProductDetails = () => {
  const product_image = [
    "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Sites-skp-master-catalog/default/dw82b86445/images/hi-res/HCCL26153KBLU01_A.jpg?sw=900&sh=1105",
    "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Sites-skp-master-catalog/default/dw840d9c39/images/hi-res/HCCL26153KBLU01_B.jpg?sw=900&sh=1105",
    "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Sites-skp-master-catalog/default/dwa505737e/images/hi-res/HCCL26153KBLU01_D.jpg?sw=900&sh=1105",
  ];

  const accordionData = {
    id: 1,
    details: ["Wool", "100% comfort", "premium button"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    materials: {
      fabric: "Wool",
      Transparency: 1,
      Thickness: 3,
      stretchiness: 2,
    },
    care: {
      washing: "Hand Wash Cold Water",
      bleaching: "Do Not Bleach",
      drying: "Normal Dry",
      iron: "Iron Inside Out with Low Temperature",
      dry_clean: "do not dry clean",
    },
  };

  const star = [1, 2, 3, 4, 5];
  const total_rating = 4;
  const size = [
    {
      id: 1,
      size: "S",
      stock: 10,
    },
    {
      id: 2,
      size: "M",
      stock: 20,
    },
    {
      id: 3,
      size: "L",
      stock: 40,
    },
    {
      id: 4,
      size: "XL",
      stock: 50,
    },
  ];

  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const countDisabled = count === 1;

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
          <ProductImageSlider images={product_image} />

          <View style={styles.information_container}>
            <View style={styles.product_info_container}>
              <View style={{ gap: 5 }}>
                <Text style={styles.product_name}>Blue Long Sleeve Shirt</Text>
                <Text style={styles.product_category}>Shirts</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.product_price}>
                  <Text style={{ fontFamily: "semibold" }}>Rp</Text>200.000
                </Text>

                <View style={styles.rating_container}>
                  {star.map((item, index) => (
                    <FontAwesome
                      key={index}
                      name={item <= total_rating ? "star" : "star-o"}
                      size={18}
                      color="orange"
                    />
                  ))}

                  <Text style={styles.rating_total}>{total_rating}</Text>
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
                  data={size}
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
            <ProductAccordion accordionData={accordionData} />
          </View>
        </ScrollView>
      </View>
      <ProductDetailFooter />
    </SafeAreaView>
  );
};

export default ProductDetails;

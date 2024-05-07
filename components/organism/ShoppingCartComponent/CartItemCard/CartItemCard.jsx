import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const CartItemCard = ({ title, size, price, image, quantity = 1 }) => {
  const [count, setCount] = useState(quantity);
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
    <View
      style={{
        ...SHADOWS.medium,
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        padding: 5,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={{ width: 110, height: 115 }}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          source={
            !image
              ? require("../../../../assets/content/empty_product.png")
              : { uri: image }
          }
        />
      </View>
      <View style={{ gap: 8, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "semibold" }}>{title}</Text>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: "regular" }}>Size: {size}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "semibold" }}>Rp. {price}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: SIZES.large,
              gap: 10,
            }}
          >
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
    </View>
  );
};

export default CartItemCard;

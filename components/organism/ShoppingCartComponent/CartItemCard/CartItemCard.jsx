import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const CartItemCard = () => {
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
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={{
            uri: "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Sites-skp-master-catalog/default/dw82b86445/images/hi-res/HCCL26153KBLU01_A.jpg?sw=900&sh=1105",
          }}
        />
      </View>
      <View style={{ gap: 8, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "semibold" }}>Blue Shirt</Text>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: "regular" }}>Size: S</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "semibold" }}>Rp. 150,000</Text>
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

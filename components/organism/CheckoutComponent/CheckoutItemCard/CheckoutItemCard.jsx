import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS } from "../../../../constants";

const CheckoutItemCard = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
      }}
    >
      <View style={{ height: 100, width: 100 }}>
        <Image
          style={{ height: "100%", width: "100%", resizeMode: "cover" }}
          source={{
            uri: "https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg",
          }}
        />
      </View>

      <View>
        <Text style={{ fontFamily: "bold", fontSize: 16 }}>Baju Hitam</Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 12,
            color: COLORS.gray,
          }}
        >
          Size: XL
        </Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 12,
            color: COLORS.gray,
          }}
        >
          x2
        </Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 12,
            color: COLORS.primary,
          }}
        >
          Rp. 40.000
        </Text>
      </View>
    </View>
  );
};

export default CheckoutItemCard;

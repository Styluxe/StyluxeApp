import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";

const ActivityHistoryCard = () => {
  return (
    <View
      style={{
        padding: 8,
        gap: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        ...SHADOWS.medium,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          style={{
            width: 53,
            height: 74,
            resizeMode: "cover",
          }}
          source={require("../../../assets/content/empty_product.png")}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "semibold",
              fontSize: 14,
              alignSelf: "flex-end",
              marginBottom: 5,
              color: COLORS.primary,
            }}
          >
            12 April 2022
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              Baju biru Bagus
            </Text>
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              x2
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              Rp. 100.000
            </Text>
          </View>
          <View style={{ alignSelf: "flex-end", flexDirection: "row", gap: 5 }}>
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              Order's Total:
            </Text>
            <Text>Rp. 200.000</Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 14,
            color: COLORS.darkGray,
          }}
        >
          Show all Products
        </Text>
      </View>
    </View>
  );
};

export default ActivityHistoryCard;

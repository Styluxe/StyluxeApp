import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../../constants";

const CheckoutAddressCard = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.gray2,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "medium", fontSize: 14 }}>
          Delivery to Bryan, 13460
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: "medium",
            fontSize: 14,
            maxWidth: "80%",
          }}
        >
          Jl. Cempedak Raya No. 1 Jl. Cempedak Raya No. 1 Jl. Cempedak Raya No.
          1
        </Text>
      </View>

      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity>
          <View
            style={{
              paddingVertical: 2,
              paddingHorizontal: 5,
              borderRadius: 5,
              backgroundColor: COLORS.primary,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "medium",
                fontSize: 12,
              }}
            >
              Change
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutAddressCard;

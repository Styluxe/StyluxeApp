import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../../constants";

const CheckoutAddressCard = ({
  address_name = "address name",
  user_name = "user name",
  address = "address",
  phone = "phone",
  onPress = () => {},
}) => {
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
        <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
          {address_name}
        </Text>
        <Text style={{ fontFamily: "medium", fontSize: 14 }}>
          <Text style={{ fontFamily: "medium", fontSize: 14 }}>
            {user_name}
          </Text>
          , {phone}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: "medium",
            fontSize: 14,
            maxWidth: "80%",
          }}
        >
          {address}
        </Text>
      </View>

      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={onPress}>
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

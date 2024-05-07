import { Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
import React from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";

const AddressCard = ({ isPrimary, onRadioPress, addressData }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 11,
        paddingHorizontal: 15,
        gap: 6,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          {/* <Ionicons name="caret-forward-sharp" size={16} color="black" /> */}
          <Text style={{ fontFamily: "medium", fontSize: 14 }}>
            {addressData?.name}
          </Text>
          {isPrimary && (
            <View
              style={{
                paddingVertical: 1,
                paddingHorizontal: 3,
                backgroundColor: COLORS.lightBrown,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "normal",
                  fontSize: 12,
                  color: COLORS.darkGray,
                }}
              >
                main address
              </Text>
            </View>
          )}
        </View>

        <Ionicons
          name={isPrimary ? "radio-button-on-sharp" : "radio-button-off-sharp"}
          size={18}
          color={COLORS.primary}
          onPress={onRadioPress}
        />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontFamily: "semibold", fontSize: 16 }}>
          {addressData?.receiver_name}
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: 14 }}>
          {addressData?.mobile}
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: 14, minHeight: 40 }}>
          {addressData?.address}
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: 14 }}>
          {addressData?.city}, {addressData?.country},{" "}
          {addressData?.postal_code}
        </Text>
      </View>
      <Button
        variant="outline"
        borderWidth={2}
        borderColor={COLORS.primary}
        onPress={() => {}}
      >
        <Text
          style={{
            fontFamily: "semibold",
            fontSize: 14,
            color: COLORS.primary,
          }}
        >
          Edit Address
        </Text>
      </Button>
    </View>
  );
};

export default AddressCard;

import { Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";

const AddressCard = ({ isPrimary, onRadioPress, addressData, onDelete }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderWidth: isPrimary ? 3 : 1,
        borderRadius: 5,
        paddingVertical: 11,
        paddingHorizontal: 15,
        gap: 6,
        borderColor: isPrimary ? COLORS.primary : COLORS.gray2,
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
          <Text style={{ fontFamily: "medium", fontSize: 14 }}>
            {addressData?.name}
          </Text>
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
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Button
          variant="outline"
          borderWidth={2}
          borderColor={COLORS.primary}
          flex={1}
          onPress={() => {
            navigation.navigate("ManageAddress", { edit_data: addressData });
          }}
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
        {!isPrimary && (
          <Button
            variant="solid"
            bgColor="red"
            onPress={onDelete}
            borderRadius={5}
          >
            <Ionicons name="trash" size={24} color="white" />
          </Button>
        )}
      </View>
    </View>
  );
};

export default AddressCard;

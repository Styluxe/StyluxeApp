import { Button } from "@gluestack-ui/themed";
import React from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";
import { StarRating } from "../StarRating";

const BookingCard = () => {
  const past = false;
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.gray2,
        padding: 15,
        gap: 5,
        backgroundColor: COLORS.white,
      }}
    >
      <Text style={{ fontFamily: "semibold", fontSize: 16 }}>
        Order No: STLO32131
      </Text>

      <View>
        <Text
          style={{ fontFamily: "medium", fontSize: 14, color: COLORS.darkGray }}
        >
          Order Date: 25 may 2024
        </Text>
        <Text
          style={{ fontFamily: "medium", fontSize: 14, color: COLORS.darkGray }}
        >
          Order Time: 10:00 AM - 10.45 AM
        </Text>
      </View>

      <Text style={{ fontFamily: "semibold", fontSize: 16 }}>Kenz</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ fontFamily: "medium", fontSize: 14, color: COLORS.darkGray }}
        >
          Session: 45 Minutes
        </Text>

        <Text style={{ fontFamily: "medium", fontSize: 14 }}>Rp 35.000</Text>
      </View>

      {past ? (
        <StarRating />
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Button variant="outline" borderColor={COLORS.primary} flex={1}>
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 18,
                color: COLORS.primary,
              }}
            >
              Reject
            </Text>
          </Button>
          <Button flex={1} variant="solid" bgColor={COLORS.primary}>
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 18,
                color: COLORS.white,
              }}
            >
              Accept
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default BookingCard;

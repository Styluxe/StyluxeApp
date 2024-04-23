import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../constants";

const TimeSelect = ({ data, setSelectedTime, selectedTime }) => {
  return (
    <TouchableOpacity
      disabled={data?.status === "unavailable"}
      style={{ width: "31%" }}
      onPress={() => setSelectedTime(data?.time)}
    >
      <View
        style={{
          paddingVertical: 21,
          paddingHorizontal: 24,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.primary,
          alignItems: "center",
          backgroundColor:
            data?.status === "unavailable"
              ? COLORS.gray2
              : selectedTime === data?.time
                ? COLORS.secondary
                : "white",
        }}
      >
        <Text
          style={{
            fontFamily: "semibold",
            color: selectedTime === data?.time ? COLORS.white : COLORS.primary,
            fontSize: 12,
          }}
        >
          {data?.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TimeSelect;

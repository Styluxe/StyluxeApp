import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../constants";
import { formatTimeWithAMPM } from "../../../hook/hook";

const TimeSelect = ({ data, setSelectedTime, selectedTime, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ width: "31%" }}
      onPress={() => setSelectedTime(data?.time)}
    >
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.primary,
          alignItems: "center",
          backgroundColor: disabled
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
          {formatTimeWithAMPM(data?.time) + " " + "WIB"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TimeSelect;

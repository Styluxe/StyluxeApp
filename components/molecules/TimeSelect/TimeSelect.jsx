import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../constants";

const TimeSelect = ({ data, setSelectedTime, selectedTime, disabled }) => {
  const formatTimeWithAMPM = (time) => {
    // Convert time to 12-hour format with AM/PM
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

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

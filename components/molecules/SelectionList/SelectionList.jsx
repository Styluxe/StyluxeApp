import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../constants";

const SelectionList = ({
  iconName = "person-outline",
  onPress,
  text = "Isi disini",
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray2,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Ionicons name={iconName} size={24} color={COLORS.primary} />
          <Text style={{ fontFamily: "medium", fontSize: 16 }}>{text}</Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
};

export default SelectionList;

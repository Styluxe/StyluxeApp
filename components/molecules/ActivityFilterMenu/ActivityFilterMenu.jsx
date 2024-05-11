import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";

const ActivityFilterMenu = ({
  filterRef,
  filterItems,
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <View
      ref={filterRef}
      style={{
        position: "absolute",
        right: 20,
        top: 40,
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,
      }}
    >
      {filterItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => setSelectedFilter(item)}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              paddingVertical: 3,
            }}
          >
            <View
              style={{
                height: 15,
                width: 4,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor:
                  selectedFilter === item ? COLORS.primary : "transparent",
              }}
            />
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 12,
                paddingRight: 10,
              }}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ActivityFilterMenu;

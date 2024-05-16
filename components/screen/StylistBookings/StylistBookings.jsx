import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUpdateBookingStatus } from "../../../API/OrderAPI";
import { useGetActiveBookings } from "../../../API/StylistApi";
import { COLORS } from "../../../constants";
import { BookingCard } from "../../molecules";

const StylistBookings = () => {
  const [selectedMenu, setSelectedMenu] = useState("active");

  const { getActiveBookings, data } = useGetActiveBookings();
  const { updateBookingStatus, code, setCode } = useUpdateBookingStatus();

  useFocusEffect(
    useCallback(() => {
      getActiveBookings();
    }, []),
  );

  useEffect(() => {
    if (code === 200) {
      getActiveBookings();
      setCode(null);
    }
  });

  const menu = ["active", "upcoming", "past"];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "semibold" }}>
          My Bookings
        </Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={{ flexDirection: "row", backgroundColor: COLORS.bgGray }}>
          {menu.map((item, index) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              key={index}
              onPress={() => setSelectedMenu(item)}
            >
              <View
                style={{
                  paddingVertical: 4,
                  alignItems: "center",
                  borderBottomWidth: selectedMenu === item ? 2 : 0,
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedMenu === item ? COLORS.primary : COLORS.darkGray,
                    fontFamily: "semibold",
                  }}
                >
                  {item.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={data}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 20,
          }}
          renderItem={({ item }) => (
            <BookingCard
              data={item}
              handleAccept={() => {
                updateBookingStatus(item?.booking_id, undefined, "accepted");
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default StylistBookings;

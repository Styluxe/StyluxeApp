import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";

import { useGetMyBookings } from "../../../../API/ProfileApi";
import { useGetActiveBookings } from "../../../../API/StylistApi";
import { COLORS } from "../../../../constants";
import { MyBookingCard } from "../../../molecules";

const ActiveBooking = ({ role }) => {
  const { data, getMyBookings } = useGetMyBookings();
  const { getActiveBookings, data: bookingsStylist } = useGetActiveBookings();

  useFocusEffect(
    useCallback(() => {
      if (role === "stylist") {
        getActiveBookings();
      } else if (role === "user" || role === "admin") {
        getMyBookings();
      }
    }, []),
  );

  //filter booking stylist
  const filterBookingStylist = bookingsStylist
    ?.filter(
      (booking) =>
        booking?.status === "accepted" || booking?.status === "scheduled",
    )
    .sort((a, b) => {
      const dateA = new Date(
        `${a.booking_details.booking_date}T${a.booking_details.booking_time}:00+07:00`,
      );
      const dateB = new Date(
        `${b.booking_details.booking_date}T${b.booking_details.booking_time}:00+07:00`,
      );
      return dateA - dateB;
    });

  return (
    <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
      <Text style={{ fontSize: 18, fontFamily: "bold", color: COLORS.primary }}>
        My Bookings
      </Text>

      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        {data?.length > 0 ? (
          <MyBookingCard item={data[0]} />
        ) : bookingsStylist.length > 0 ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            data={filterBookingStylist}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 350,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <MyBookingCard item={item} role={role} />
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "semibold",
              color: COLORS.darkGray,
            }}
          >
            No Active Bookings
          </Text>
        )}
      </View>
    </View>
  );
};

export default ActiveBooking;

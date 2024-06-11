import { Spinner } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { useGetMyBookings } from "../../../../API/ProfileApi";
import { useGetActiveBookings } from "../../../../API/StylistApi";
import { COLORS, SIZES } from "../../../../constants";
import { MyBookingCard } from "../../../molecules";

const ActiveBooking = ({ role }) => {
  const { data, getMyBookings, loading } = useGetMyBookings();
  const {
    getActiveBookings,
    data: bookingsStylist,
    loading: loadingStylist,
  } = useGetActiveBookings();

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
        booking?.status === "on going" || booking?.status === "scheduled",
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.booking_date}T${a.booking_time}:00+07:00`);
      const dateB = new Date(`${b.booking_date}T${b.booking_time}:00+07:00`);
      return dateA - dateB;
    });

  const filterBookingUser = data
    ?.filter(
      (booking) =>
        booking?.status === "scheduled" || booking?.status === "on going",
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.booking_date}T${a.booking_time}:00+07:00`);
      const dateB = new Date(`${b.booking_date}T${b.booking_time}:00+07:00`);
      return dateA - dateB;
    });

  if (loading || loadingStylist) {
    return (
      <View>
        <Spinner color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
      <Text style={{ fontSize: 18, fontFamily: "bold", color: COLORS.primary }}>
        My Bookings
      </Text>

      <View>
        {filterBookingUser?.length > 0 ? (
          <View style={{ padding: 10 }}>
            <MyBookingCard item={filterBookingUser[0]} />
          </View>
        ) : filterBookingStylist?.length > 0 ? (
          <Carousel
            width={SIZES.width - 20}
            height={200}
            data={filterBookingStylist}
            loop={false}
            renderItem={({ index, item: booking }) => (
              <View
                style={{
                  flex: 1,
                  padding: 10,
                }}
              >
                <MyBookingCard item={booking} role={role} />
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

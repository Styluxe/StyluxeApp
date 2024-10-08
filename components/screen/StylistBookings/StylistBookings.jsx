import { Ionicons } from "@expo/vector-icons";
import { Switch } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useGetActiveBookings,
  useGetStylistByAuthApi,
  useUpdateOnlineStatus,
} from "../../../API/StylistApi";
import { COLORS } from "../../../constants";
import { BookingCard } from "../../molecules";

const StylistBookings = () => {
  const [selectedMenu, setSelectedMenu] = useState("active");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { getStylistByAuth, stylistData } = useGetStylistByAuthApi();
  const {
    updateOnlineStatus,
    code: statusCode,
    setCode: setStatusCode,
  } = useUpdateOnlineStatus();

  const { getActiveBookings, data } = useGetActiveBookings();

  const isOnline = stylistData?.online_status === "online";

  const navigation = useNavigation();

  const toggleOnlineStatus = async () => {
    if (isOnline) {
      setStatusCode(null);
      await updateOnlineStatus({ online_status: "offline" });
    } else {
      setStatusCode(null);
      await updateOnlineStatus({ online_status: "online" });
    }
  };

  // Filter and sort booking stylist
  const filterBookings = (menu) => {
    switch (menu) {
      case "active":
        return data?.filter((booking) => booking?.status === "on going");
      case "scheduled":
        return data?.filter((booking) => booking?.status === "scheduled");

      case "past":
        return data?.filter(
          (booking) =>
            booking?.status === "done" || booking?.status === "cancelled",
        );
      default:
        return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      getActiveBookings();
      getStylistByAuth();
    }, []),
  );

  useEffect(() => {
    if (statusCode === 200) {
      getStylistByAuth();
      setStatusCode(null);
    }
  }, [statusCode]);

  useEffect(() => {
    setFilteredBookings(filterBookings(selectedMenu));
  }, [selectedMenu, data]);

  const menu = ["active", "scheduled", "past"];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          name="calendar-outline"
          size={24}
          color={COLORS.primary}
          onPress={() => navigation.navigate("ManageSchedule")}
        />
        <Text style={{ fontSize: 20, fontFamily: "semibold" }}>
          My Bookings
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontFamily: "medium", color: isOnline ? "green" : "red" }}
          >
            {isOnline ? "Online" : "Offline"}
          </Text>
          <Switch
            size="md"
            value={isOnline}
            onToggle={toggleOnlineStatus}
            sx={{
              _android: {
                props: {
                  trackColor: { true: "green", false: "red" },
                },
              },
            }}
          />
        </View>
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
          data={filteredBookings}
          keyExtractor={(item) => item.booking_id.toString()}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 20,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                fontFamily: "semibold",
                color: COLORS.darkGray,
              }}
            >
              No Data
            </Text>
          }
          renderItem={({ item }) => <BookingCard data={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default StylistBookings;

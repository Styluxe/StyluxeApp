import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Spinner } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { useGetBookingsApi, useGetOrderApi } from "../../../API/OrderAPI";
import { useGetAllActivityApi } from "../../../API/ProfileApi";
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";
import { ActivityFilterMenu, ActivityHistoryCard } from "../../molecules";

const MyActivity = () => {
  const navigation = useNavigation();
  const userData = useSelector(userDataState);
  const isStylist = userData?.user_role === "stylist" || false;

  const [showFilter, setShowFilter] = useState(false);
  const filterItems = isStylist
    ? ["Fashion Purchase"]
    : ["All Activity", "Fashion Purchase", "Stylist Consultation"];
  const [selectedFilter, setSelectedFilter] = useState(filterItems[0]);
  const filterRef = useRef(null);

  const { getBookings, bookingsData, bookingsLoading } = useGetBookingsApi();
  const { getAllOrder, orderData, orderLoading } = useGetOrderApi();
  const {
    getAllActivity,
    allActivityData,
    loading: allActivityLoading,
  } = useGetAllActivityApi();

  const loading = allActivityLoading || orderLoading || bookingsLoading;

  useFocusEffect(
    useCallback(() => {
      switch (selectedFilter) {
        case "All Activity":
          getAllActivity();
          break;
        case "Fashion Purchase":
          getAllOrder();
          break;
        case "Stylist Consultation":
          getBookings();
          break;
        default:
          break;
      }
    }, [selectedFilter]),
  );

  const handlePressOutsideFilter = () => {
    setShowFilter(false);
  };

  console.log("selected", selectedFilter);

  const data =
    selectedFilter === "All Activity"
      ? allActivityData
      : selectedFilter === "Fashion Purchase"
        ? orderData
        : bookingsData;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handlePressOutsideFilter}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              borderBottomWidth: 1,
              borderColor: COLORS.gray2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={COLORS.primary}
                onPress={() => navigation.navigate("Profile")}
              />
              <Text style={{ fontFamily: "medium", fontSize: 16 }}>
                Activity History
              </Text>
            </View>

            <TouchableOpacity
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              disabled={isStylist}
              onPress={() => {
                setShowFilter(!showFilter);
              }}
            >
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                  color: COLORS.gray,
                }}
              >
                {selectedFilter}
              </Text>
              <AntDesign name="filter" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {loading ? (
            <Spinner />
          ) : (
            <FlatList
              data={data}
              contentContainerStyle={{
                paddingVertical: 7,
                paddingHorizontal: 10,
                gap: 10,
              }}
              renderItem={({ item }) => <ActivityHistoryCard item={item} />}
              ListEmptyComponent={
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Text style={{ fontFamily: "medium", fontSize: 16 }}>
                    There are no activities currently
                  </Text>
                </View>
              }
            />
          )}

          {showFilter && (
            <ActivityFilterMenu
              filterItems={filterItems}
              filterRef={filterRef}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MyActivity;

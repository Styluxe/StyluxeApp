import { AntDesign, Ionicons } from "@expo/vector-icons";
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

import { useGetOrderApi } from "../../../API/OrderAPI";
import { COLORS } from "../../../constants";
import { ActivityFilterMenu, ActivityHistoryCard } from "../../molecules";

const MyActivity = () => {
  const navigation = useNavigation();
  const [showFilter, setShowFilter] = useState(false);
  const filterItems = [
    "All Activity",
    "Fashion Purchase",
    "Stylist Consultation",
  ];
  const [selectedFilter, setSelectedFilter] = useState(filterItems[0]);
  const filterRef = useRef(null);

  const { getAllOrder, orderData } = useGetOrderApi();

  useFocusEffect(
    useCallback(() => {
      getAllOrder();
    }, []),
  );

  const handlePressOutsideFilter = () => {
    setShowFilter(false);
  };

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
              onPress={() => setShowFilter(!showFilter)}
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
              <AntDesign
                name="filter"
                size={24}
                color={COLORS.primary}
                onPress={() => setShowFilter(!showFilter)}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={orderData}
            contentContainerStyle={{
              paddingVertical: 7,
              paddingHorizontal: 10,
              gap: 10,
            }}
            renderItem={({ item }) => <ActivityHistoryCard item={item} />}
          />

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

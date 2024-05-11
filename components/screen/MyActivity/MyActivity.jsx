import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { ActivityFilterMenu, ActivityHistoryCard } from "../../molecules";
import { useGetOrderApi } from "../../../API/OrderAPI";

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

  const { error, loading, getAllOrder, orderData } = useGetOrderApi();

  useEffect(() => {
    getAllOrder();
  }, []);

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
                onPress={() => navigation.goBack()}
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
              flex: 1,
              paddingVertical: 7,
              paddingHorizontal: 10,
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

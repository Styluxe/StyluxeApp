import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetCustomerReviewsAPI } from "../../../API/StylistApi";
import { COLORS } from "../../../constants";
import { StylistReviewBox } from "../../molecules";

const StylistReviewList = () => {
  const { getCustomerReviews, reviewData } = useGetCustomerReviewsAPI();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getCustomerReviews();
    }, []),
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={32}
          color={COLORS.primary}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "semibold",
              fontSize: 20,
              color: COLORS.primary,
            }}
          >
            Customer Review
          </Text>
        </View>
      </View>
      <FlatList
        data={reviewData}
        contentContainerStyle={{ padding: 15, gap: 15 }}
        renderItem={({ item }) => (
          <StylistReviewBox
            content={item.feedback}
            date={item.createdAt}
            fullName={item?.user?.first_name + " " + item?.user?.last_name}
            rating={item.rating}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default StylistReviewList;

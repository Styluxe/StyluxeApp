import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetBookmarksApi } from "../../../API/DiscussionApi";
import { COLORS, SIZES } from "../../../constants";
import { DiscussionListCard } from "../../organism";

const DiscussionBookmarks = () => {
  const navigation = useNavigation();

  const { getBookmarks, responseData } = useGetBookmarksApi();

  useFocusEffect(
    useCallback(() => {
      getBookmarks();
    }, []),
  );

  const mappedData = responseData?.map((item) => item.post);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <Ionicons
          name="menu"
          size={32}
          color={COLORS.primary}
          onPress={() => navigation.openDrawer()}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ fontFamily: "bold", fontSize: 20, color: COLORS.primary }}
          >
            Your Bookmarks
          </Text>
        </View>
      </View>
      <FlatList
        data={mappedData}
        renderItem={({ item, index }) => (
          <DiscussionListCard key={index} postData={item} />
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: SIZES.height / 1.5,
            }}
          >
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 18,
                color: COLORS.darkGray,
              }}
            >
              No Bookmarks yet
            </Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
    </SafeAreaView>
  );
};

export default DiscussionBookmarks;

import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useGetLikedPostByAuthorIdApi,
  useGetPostByAuthorIdApi,
} from "../../../API/DiscussionApi";
import { COLORS } from "../../../constants";
import { DiscussionListCard } from "../../organism";

const DiscussionAuthor = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { author_id } = route.params;

  const navMenu = [
    {
      id: 1,
      name: "Posts",
    },
    {
      id: 2,
      name: "Likes",
    },
  ];

  const [selectedNavMenu, setSelectedNavMenu] = useState(1);
  const { getPostByAuthorId, responseData } = useGetPostByAuthorIdApi();
  const { getLikedPostByAuthorId, responseData: likedData } =
    useGetLikedPostByAuthorIdApi();

  useFocusEffect(
    useCallback(() => {
      if (selectedNavMenu === 1) {
        getPostByAuthorId(author_id);
      } else {
        getLikedPostByAuthorId(author_id);
      }
    }, [selectedNavMenu, author_id]),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          paddingVertical: 13,
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <Ionicons
          name="chevron-back-circle"
          size={30}
          color={COLORS.primary}
          onPress={() => navigation.goBack()}
        />

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ fontFamily: "bold", fontSize: 20, color: COLORS.primary }}
          >
            Discussion Profile
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ gap: 2 }}>
          <Text numberOfLines={1} style={{ fontFamily: "bold", fontSize: 15 }}>
            {responseData?.author?.first_name +
              " " +
              responseData?.author?.last_name}
          </Text>

          <Text style={{ fontSize: 14, fontFamily: "medium" }}>
            {responseData?.author?.email}
          </Text>
        </View>

        <View
          style={{
            width: 65,
            height: 65,
            backgroundColor: COLORS.gray2,
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <Image
            source={
              responseData?.author?.profile_picture
                ? { uri: responseData?.author?.profile_picture }
                : require("../../../assets/content/profpic.png")
            }
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        {navMenu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ flex: 1 }}
            onPress={() => setSelectedNavMenu(item.id)}
          >
            <View
              style={{
                paddingVertical: 5,
                alignItems: "center",
                borderBottomWidth: selectedNavMenu === item.id ? 2 : 0,
                borderColor:
                  selectedNavMenu === item.id ? COLORS.primary : null,
              }}
            >
              <Text
                style={{
                  color:
                    selectedNavMenu === item.id ? COLORS.primary : COLORS.gray,
                  fontFamily: "bold",
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={selectedNavMenu === 1 ? responseData?.posts : likedData}
        renderItem={({ item, index }) => (
          <DiscussionListCard key={index} postData={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        scrollEventThrottle={10}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
};

export default DiscussionAuthor;

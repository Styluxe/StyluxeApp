import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./Stylist.style";
import { useGetAllStylistApi } from "../../../API/StylistApi";
import { COLORS } from "../../../constants";
import { StylistDetailCard } from "../../organism";

const Stylist = () => {
  const [stylistList, setStylistList] = useState([]);
  const { getAllStylist, code, data, setCode } = useGetAllStylistApi();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  const filteredStylistList = () => {
    let filteredList = stylistList;

    if (selectedCategory) {
      filteredList = filteredList.filter(
        (item) => item?.type === selectedCategory,
      );
    }

    if (search) {
      filteredList = filteredList.filter((item) =>
        item?.brand_name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return filteredList;
  };

  const categoryData = [
    "Party Stylist",
    "Wedding Stylist",
    "Event Stylist",
    "Other",
  ];

  useFocusEffect(
    useCallback(() => {
      getAllStylist();
    }, []),
  );

  useEffect(() => {
    if (code === 200) {
      setStylistList(data);
      setCode(null);
    }
  }, [code, data]);

  const onSelectedCategory = (item) => {
    setSelectedCategory(selectedCategory === item ? null : item);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header_container}>
        <View style={styles.header_items_wrapper}>
          <TouchableOpacity
            style={{
              padding: 3,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: COLORS.primary,
              justifyContent: "center",
            }}
          >
            <Ionicons name="heart" size={28} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }}>
            <View style={styles.search_input_container}>
              <TextInput
                style={styles.search_input}
                placeholder="Search your stylist"
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <View style={styles.search_btn}>
                <Ionicons
                  name="search-outline"
                  size={24}
                  color={COLORS.white}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.category_container}>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectedCategory(item)}>
              <View
                style={
                  selectedCategory === item
                    ? styles.category_box_active
                    : styles.category_box
                }
              >
                <Text
                  style={
                    selectedCategory === item
                      ? styles.category_text_active
                      : styles.category_text
                  }
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
        />
      </View>

      <View style={styles.card_list_container}>
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <Text style={{ fontFamily: "semibold" }}>
                Stylist Recommendation
              </Text>
              <Text style={styles.header_2}>
                consultations with our top stylists
              </Text>
            </View>
          )}
          data={filteredStylistList()}
          renderItem={({ item }) => <StylistDetailCard stylist={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Stylist;

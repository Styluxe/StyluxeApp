import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
  const [stylistList, setStylistList] = useState([]);
  const { getAllStylist, code, data, setCode } = useGetAllStylistApi();

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header_container}>
        <View style={styles.header_items_wrapper}>
          <TouchableOpacity>
            <Ionicons name="menu" size={32} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("Search")}
          >
            <View style={styles.search_input_container}>
              <TextInput
                style={styles.search_input}
                placeholder="Search your stylist"
                editable={false}
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
            <TouchableOpacity>
              <View style={styles.category_box}>
                <Text style={styles.category_text}>{item}</Text>
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
          data={stylistList}
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

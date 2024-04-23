import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./Stylist.style";
import { COLORS } from "../../../constants";
import { StylistDetailCard } from "../../organism";

const Stylist = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header_container}>
        <View style={styles.header_items_wrapper}>
          <TouchableOpacity>
            <Ionicons name="menu" size={32} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }}>
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
          data={[1, 2, 3, 4, 5]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <TouchableOpacity>
              <View style={styles.category_box}>
                <Text style={styles.category_text}>Category 1</Text>
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
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({ item }) => <StylistDetailCard />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Stylist;

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./PopularStylist.style";
import { StylistCard } from "../../../molecules";

const PopularStylist = ({ listData }) => {
  return (
    <View style={styles.featured_container}>
      <View style={styles.featured_title_container}>
        <Text style={styles.featured_title}>Popular Fashion Stylist</Text>
        <TouchableOpacity>
          <Text style={styles.featured_see_all}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        renderItem={() => <StylistCard />}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
};

export default PopularStylist;

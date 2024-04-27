import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./PopularStylist.style";
import { dummyPopularStylist } from "../../../../mocks/DummyHome";
import { StylistCard } from "../../../molecules";

const PopularStylist = () => {
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
        data={dummyPopularStylist}
        renderItem={(data) => (
          <StylistCard
            image={data.item.image}
            name={data.item.name}
            price={data.item.price}
            rating={data.item.rating}
            type={data.item.type}
          />
        )}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
};

export default PopularStylist;

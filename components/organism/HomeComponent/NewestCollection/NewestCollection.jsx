import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./NewestCollection.style";
import { ProductCard } from "../../../molecules";

const NewestCollection = () => {
  return (
    <View style={styles.featured_container}>
      <View style={styles.featured_title_container}>
        <Text style={styles.featured_title}>Latest Collection</Text>
        <TouchableOpacity>
          <Text style={styles.featured_see_all}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        renderItem={() => (
          <ProductCard
            hasBanner
            imageUrl="https://img.lazcdn.com/g/p/49b09ac65cd105a535c7342974984cb3.jpg_720x720q80.jpg"
          />
        )}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
};

export default NewestCollection;

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./NewestCollection.style";
import { dummyLatestCollection } from "../../../../mocks/DummyHome";
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
        data={dummyLatestCollection.products}
        renderItem={(data) => (
          <ProductCard
            hasBanner
            imageUrl={data.item.image_url}
            category={data.item.category}
            price={data.item.price}
            rating={data.item.rating}
            title={data.item.name}
          />
        )}
        contentContainerStyle={{
          gap: 15,
        }}
      />
    </View>
  );
};

export default NewestCollection;

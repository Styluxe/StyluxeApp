import { Spinner } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./NewestCollection.style";
import { useGetLatestProductApi } from "../../../../API/ProductAPI";
import { COLORS } from "../../../../constants";
import { ProductCard } from "../../../molecules";

const NewestCollection = () => {
  const { getLatestProduct, products, loading } = useGetLatestProductApi();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getLatestProduct();
    }, []),
  );

  return (
    <View style={styles.featured_container}>
      <View style={styles.featured_title_container}>
        <Text style={styles.featured_title}>Latest Collection</Text>
        <TouchableOpacity>
          <Text style={styles.featured_see_all}>See All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Spinner color={COLORS.primary} />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              hasBanner
              bannerText="LATEST ITEM"
              imageUrl={item?.images[0]?.image_url}
              category={item?.sub_category?.sub_category_name}
              price={parseFloat(item?.product_price).toLocaleString("id-ID")}
              title={item?.product_name}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  product_id: item?.product_id,
                })
              }
            />
          )}
          contentContainerStyle={{
            gap: 15,
          }}
        />
      )}
    </View>
  );
};

export default NewestCollection;

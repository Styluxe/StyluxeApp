import { Spinner } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCategoryApi } from "../../../API/CategoryAPI";
import { COLORS } from "../../../constants";
import { CategoryMenu, SubCategoryItems } from "../../organism";

const Category = () => {
  const { getCategory, category, loading } = useCategoryApi();
  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setSelectedCategory(category[0]);
  }, [category]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 13,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <Text
          style={{ fontFamily: "bold", fontSize: 20, color: COLORS.primary }}
        >
          Category
        </Text>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* category menu */}
        <View
          style={{
            flex: 3,
            borderRightWidth: 1,
            backgroundColor: COLORS.gray2,
            borderColor: COLORS.gray,
          }}
        >
          {category?.map((item, index) => (
            <CategoryMenu
              key={index}
              data={item}
              onPress={() => setSelectedCategory(item)}
              selectedCategory={selectedCategory}
            />
          ))}
        </View>

        {/* category sub menu */}
        <View style={{ flex: 7 }}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <View style={{ padding: 10 }}>
                <Text style={{ fontFamily: "medium", fontSize: 16 }}>
                  {selectedCategory?.category_name}
                </Text>
              </View>
              <View style={{ padding: 10 }}>
                <FlatList
                  data={selectedCategory?.sub_categories}
                  renderItem={({ item }) => <SubCategoryItems data={item} />}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "space-evenly",
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Category;

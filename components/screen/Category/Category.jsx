import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { categoryData } from "../../../mocks/DummyCategory";
import { CategoryMenu, SubCategoryItems } from "../../organism";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);
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
          {categoryData.map((item) => (
            <CategoryMenu
              key={item.id}
              data={item}
              onPress={() => setSelectedCategory(item)}
              selectedCategory={selectedCategory}
            />
          ))}
        </View>

        {/* category sub menu */}
        <View style={{ flex: 7 }}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: "medium", fontSize: 16 }}>
              {selectedCategory.name}
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <FlatList
              data={selectedCategory.subCategory}
              renderItem={({ item }) => <SubCategoryItems data={item} />}
              numColumns={3}
              contentContainerStyle={{
                gap: 10,
                // alignItems: "center",
                padding: 5,
              }}
              columnWrapperStyle={{ gap: 15 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Category;

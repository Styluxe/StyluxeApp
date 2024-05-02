import { Ionicons } from "@expo/vector-icons";
import { VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TextInput, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { SelectionList } from "../../molecules";

const Search = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={32}
          color="black"
        />
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontFamily: "medium",
                color: COLORS.black,
                borderColor: COLORS.gray,
                borderWidth: 1,
              }}
              placeholder="What are you looking for?"
            />
          </View>

          <View
            style={{
              padding: 3,
              backgroundColor: COLORS.primary,
              borderRadius: 5,
              justifyContent: "center",
            }}
          >
            <Ionicons name="search-outline" size={24} color={COLORS.white} />
          </View>
        </View>
      </View>

      <ScrollView>
        <VStack style={{ padding: 10 }}>
          <Text style={{ fontFamily: "semibold", fontSize: 18 }}>Product</Text>

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SelectionList
              key={item}
              onPress={() => navigation.navigate("ProductDetails")}
            />
          ))}
        </VStack>
        <VStack style={{ padding: 10 }}>
          <Text style={{ fontFamily: "semibold", fontSize: 18 }}>Stylist</Text>

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SelectionList
              key={item}
              onPress={() => navigation.navigate("StylistDetails")}
              hasIcon
            />
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

import { Ionicons } from "@expo/vector-icons";
import { VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { SelectionList } from "../../molecules";
import { useSearchProductApi } from "../../../API/ProductAPI";
import { useSearchStylistApi } from "../../../API/StylistApi";

// Debounce function
const useDebounce = (callback, delay) => {
  const timer = useRef();

  const debouncedFunction = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFunction;
};

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const { searchProduct, products } = useSearchProductApi();
  const { searchStylist, stylist } = useSearchStylistApi();

  const handleSearch = (text) => {
    searchProduct(text);
    searchStylist(text);
  };

  const limitProduct = products.slice(0, 5);
  const limitStylist = stylist.slice(0, 5);

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleChangeText = (text) => {
    setSearch(text);
    debouncedSearch(text);
  };

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
              value={search}
              onChangeText={handleChangeText}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ProductList", { search })}
            disabled={!search}
            activeOpacity={0.7}
            style={{
              padding: 3,
              backgroundColor: COLORS.primary,
              borderRadius: 5,
              justifyContent: "center",
            }}
          >
            <Ionicons name="search-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <VStack style={{ padding: 10 }}>
          {limitProduct?.length > 0 && (
            <>
              <Text style={{ fontFamily: "semibold", fontSize: 18 }}>
                Product
              </Text>
              {limitProduct?.map((item, index) => (
                <SelectionList
                  key={index}
                  text={item?.product_name}
                  onPress={() =>
                    navigation.navigate("ProductList", {
                      search: item?.product_name,
                    })
                  }
                />
              ))}
            </>
          )}
        </VStack>
        <VStack style={{ padding: 10 }}>
          {limitStylist?.length > 0 && (
            <>
              <Text style={{ fontFamily: "semibold", fontSize: 18 }}>
                Stylist
              </Text>

              {limitStylist.map((item, index) => (
                <SelectionList
                  key={index}
                  onPress={() =>
                    navigation.navigate("StylistDetails", {
                      stylist_id: item?.stylist_id,
                    })
                  }
                  text={item?.brand_name}
                  hasIcon
                />
              ))}
            </>
          )}
        </VStack>
        {limitProduct?.length === 0 && limitStylist?.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "semibold",
              fontSize: 18,
            }}
          >
            Try Search Something
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

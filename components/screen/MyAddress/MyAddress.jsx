import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useAddressApi,
  useSetPrimaryAddressApi,
} from "../../../API/AddressApi";
import { COLORS } from "../../../constants";
import AddressCard from "../../molecules/AddressCard/AddressCard";

const MyAddress = () => {
  const { getAddress, address, loading } = useAddressApi();
  const { setPrimaryAddress, setCode, code } = useSetPrimaryAddressApi();
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  const searchAddress = () => {
    return address.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  };

  useFocusEffect(
    useCallback(() => {
      getAddress();
    }, []),
  );

  const handleRadioPress = (item) => {
    if (!item.is_primary) {
      setPrimaryAddress(item.address_id);
    }
  };

  useEffect(() => {
    if (code === 200) {
      getAddress();
      setCode(null);
    }
  }, [code]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
          <Text style={{ fontFamily: "medium", fontSize: 16 }}>
            Address List
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ManageAddress", { type: "new" })}
        >
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="add-outline" size={18} color={COLORS.darkGray} />
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.darkGray,
              }}
            >
              Add Address
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 12,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
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
              onChangeText={(text) => setSearch(text)}
            />
          </View>

          <TouchableOpacity
            style={{
              padding: 3,
              backgroundColor: COLORS.primary,
              borderRadius: 5,
              justifyContent: "center",
            }}
            onPress={searchAddress}
          >
            <Ionicons name="search-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={search ? searchAddress() : address}
        keyExtractor={(item) => item.address_id.toString()}
        renderItem={({ item }) => (
          <AddressCard
            addressData={item}
            isPrimary={item?.is_primary}
            onRadioPress={() => handleRadioPress(item)}
          />
        )}
        contentContainerStyle={{ padding: 12, gap: 15 }}
      />
    </SafeAreaView>
  );
};

export default MyAddress;

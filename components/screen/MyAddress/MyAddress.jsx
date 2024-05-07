import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAddressApi } from "../../../API/AddressApi";
import { COLORS } from "../../../constants";
import AddressCard from "../../molecules/AddressCard/AddressCard";

const MyAddress = () => {
  const { getAddress, address, loading } = useAddressApi();

  const navigation = useNavigation();

  useEffect(() => {
    getAddress();
  }, []);

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

        <TouchableOpacity>
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
      <FlatList
        data={address}
        renderItem={(data) => (
          <AddressCard
            addressData={data.item}
            isPrimary={data.item.is_primary}
          />
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </SafeAreaView>
  );
};

export default MyAddress;

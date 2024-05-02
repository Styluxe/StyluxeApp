import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";

const Checkout = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          gap: 25,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
          backgroundColor: COLORS.white,
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color={COLORS.primary}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontFamily: "medium", fontSize: 16 }}>
          Payment Summary
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: COLORS.bgGray, gap: 6 }}>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 10,
            gap: 20,
            flexDirection: "row",
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ height: 100, width: 100 }}>
            <Image
              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
              source={{
                uri: "https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg",
              }}
            />
          </View>

          <View>
            <Text style={{ fontFamily: "bold", fontSize: 16 }}>Baju Hitam</Text>
            <Text
              style={{ fontFamily: "medium", fontSize: 12, color: COLORS.gray }}
            >
              Size: XL
            </Text>
            <Text
              style={{ fontFamily: "medium", fontSize: 12, color: COLORS.gray }}
            >
              x2
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 12,
                color: COLORS.primary,
              }}
            >
              Rp. 40.000
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 16,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>Total</Text>
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              Rp. 80.000
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              Service Fee
            </Text>
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              Rp. 2.000
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 14,
                color: COLORS.primary,
              }}
            >
              Your Payment
            </Text>
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 14,
                color: COLORS.primary,
              }}
            >
              Rp. 82.000
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 16,
            backgroundColor: COLORS.white,
            flex: 1,
          }}
        >
          <Text style={{ fontFamily: "medium", fontSize: 14 }}>
            Choose your Payment Method
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <View style={{ gap: 5 }}>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              color: COLORS.darkGray,
            }}
          >
            Your Total
          </Text>
          <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
            Rp 82.000
          </Text>
        </View>

        <Button bgColor={COLORS.primary}>
          <ButtonText
            style={{
              color: COLORS.white,
              fontFamily: "semibold",
              fontSize: 14,
            }}
          >
            Confirm & Pay
          </ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

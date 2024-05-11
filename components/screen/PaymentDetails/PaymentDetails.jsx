import { Ionicons } from "@expo/vector-icons";
import { Button, Divider } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, SHADOWS } from "../../../constants";

const PaymentDetails = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-start", padding: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: "flex-start",
            ...SHADOWS.medium,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 100,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 20,
          gap: 10,
          paddingHorizontal: 40,
        }}
      >
        <Text style={{ fontFamily: "medium", fontSize: 20 }}>
          BCA Transfer Payment
        </Text>
        <Text
          style={{ fontFamily: "regular", fontSize: 14, textAlign: "center" }}
        >
          Hi Fildansyah Anggadikusumah
          {"\n"}
          IMPORTANT! Make payment before{" "}
          <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
            08 March 2024
          </Text>{" "}
          at{" "}
          <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
            17:17
          </Text>{" "}
          or your order will be automatically canceled by the system
        </Text>
      </View>
      <View style={{ backgroundColor: COLORS.bgGray }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: COLORS.gray2,
          }}
        >
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              flex: 1,
            }}
          >
            No Order
          </Text>
          <Text
            style={{
              fontFamily: "medium",
              flex: 1,
              fontSize: 14,
            }}
          >
            STLX1323132121
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: COLORS.gray2,
          }}
        >
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              flex: 1,
            }}
          >
            Payment Provider
          </Text>
          <Text
            style={{
              fontFamily: "medium",
              flex: 1,
              fontSize: 14,
            }}
          >
            BCA Transfer
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: COLORS.gray2,
          }}
        >
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              flex: 1,
            }}
          >
            Account Number
          </Text>
          <View style={{ flexDirection: "row", gap: 20, flex: 1 }}>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
              }}
            >
              8990321133
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: "blue",
                textDecorationLine: "underline",
              }}
              onPress={() => {}}
            >
              Copy
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: COLORS.gray2,
          }}
        >
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              flex: 1,
            }}
          >
            Total
          </Text>
          <View style={{ flexDirection: "row", gap: 20, flex: 1 }}>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
              }}
            >
              Rp 80.123
            </Text>

            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: "blue",
                textDecorationLine: "underline",
              }}
              onPress={() => {}}
            >
              Copy
            </Text>
          </View>
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <View
          style={{
            paddingVertical: 20,
            gap: 10,
            paddingHorizontal: 40,
          }}
        >
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              textAlign: "center",
              color: COLORS.tertiary,
            }}
          >
            Don't forget to add the last 3 digits in the amount column when
            making a transfer
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 14,
            padding: 10,
            textAlign: "center",
          }}
        >
          If you have already paid, please confirm payment by pressing the
          button below
        </Text>

        <Button bg={COLORS.primary}>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              color: COLORS.white,
            }}
          >
            I Have Paid
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PaymentDetails;

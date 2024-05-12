import { Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetOrderById, useUpdateStatus } from "../../../API/OrderAPI";
import { COLORS, SHADOWS } from "../../../constants";

const PaymentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { routeFrom, order_id } = route.params || {};

  const { getOrderById, orderData } = useGetOrderById();
  const { updateStatus, code, loading } = useUpdateStatus();

  useFocusEffect(
    useCallback(() => {
      getOrderById(order_id);
    }, [order_id]),
  );

  useEffect(() => {
    if (code === 200) {
      navigation.navigate("MyActivity");
    }
  }, [code]);

  const handlePayment = () => {
    updateStatus(order_id, "paid", "waiting for confirmation");
  };

  const isFromCheckout = routeFrom === "Checkout";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-start", padding: 10 }}>
        <TouchableOpacity
          onPress={() =>
            isFromCheckout ? navigation.navigate("Home") : navigation.goBack()
          }
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
          {orderData?.payment_details?.provider} Payment
        </Text>
        <Text
          style={{ fontFamily: "regular", fontSize: 14, textAlign: "center" }}
        >
          Hi Fildansyah Anggadikusumah
          {"\n"}
          IMPORTANT! Make payment before{" "}
          <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
            {moment(orderData?.payment_details?.payment_deadline).format("ll")}
          </Text>{" "}
          at{" "}
          <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
            {moment(orderData?.payment_details?.payment_deadline).format("LT")}
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
            {orderData?.order_number}
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
            {orderData.payment_details?.provider}
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
              Rp{" "}
              {parseInt(
                orderData.payment_details?.transfer_amount,
                10,
              ).toLocaleString("id-ID")}
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

        <Button bg={COLORS.primary} onPress={handlePayment}>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 14,
              color: COLORS.white,
            }}
          >
            {loading ? "Loading..." : "I Have Paid"}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PaymentDetails;

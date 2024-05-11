import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Divider, HStack, VStack } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetOrderById } from "../../../API/OrderAPI";
import { COLORS, SHADOWS } from "../../../constants";
import { CheckoutItemCard } from "../../organism";
import moment from "moment";

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getOrderById, orderData } = useGetOrderById();

  const { order_id } = route.params;

  // eslint-disable-next-line no-undef
  useEffect(() => {
    getOrderById(order_id);
  }, [order_id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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
            <Text style={{ fontFamily: "bold", fontSize: 16 }}>
              Orders # {orderData.order_number}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, padding: 10, gap: 10 }}>
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              ...SHADOWS.medium,
              gap: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                Pending Payment
              </Text>

              <MaterialCommunityIcons
                name="clock-alert-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <Divider bg={COLORS.gray2} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                  color: COLORS.darkGray,
                }}
              >
                Order No
              </Text>
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                {orderData.order_number}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                  color: COLORS.darkGray,
                }}
              >
                Purchase Date
              </Text>
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                {/* 20 April 2022, 10:00 WIB */}
                {moment(orderData.createdAt).format("DD MMM YYYY, HH:mm")}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                  color: COLORS.darkGray,
                }}
              >
                Payment Method
              </Text>
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                {orderData?.payment_details?.provider}
              </Text>
            </View>
            <Button
              size="sm"
              bg={COLORS.primary}
              onPress={() => {
                navigation.navigate("PaymentDetails");
              }}
            >
              <Text
                style={{ fontFamily: "medium", fontSize: 14, color: "white" }}
              >
                Pay Now
              </Text>
            </Button>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              gap: 10,
              ...SHADOWS.medium,
            }}
          >
            <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
              Shipping Details
            </Text>
            <Divider bg={COLORS.gray2} />
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              {orderData?.user_address?.receiver_name}
            </Text>
            <Text
              numberOfLines={2}
              style={{ fontFamily: "medium", fontSize: 14 }}
            >
              {orderData?.user_address?.address},
            </Text>
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              {orderData?.user_address?.mobile}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.white,
              gap: 10,
              ...SHADOWS.medium,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
              Order Details
            </Text>
            <Divider bg={COLORS.gray2} />
            <VStack>
              {orderData?.order_items?.map((item, index) => (
                <CheckoutItemCard
                  key={index}
                  image={item?.product?.images[0]?.image_url}
                  name={item?.product?.product_name}
                  price={item?.product?.product_price}
                  quantity={item?.quantity}
                  size={item?.size}
                />
              ))}
            </VStack>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.white,
              gap: 10,
              ...SHADOWS.medium,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
              Payment Details
            </Text>
            <Divider bg={COLORS.gray2} />
            <HStack justifyContent="space-between">
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Sub-Total:
              </Text>
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Rp. {parseFloat(orderData?.total).toLocaleString("id-ID")}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Shipping:{" "}
              </Text>
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>Free</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Total:{" "}
              </Text>
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Rp. {parseFloat(orderData?.total).toLocaleString("id-ID")}
              </Text>
            </HStack>
          </View>

          <Button size="sm" bg="$red900">
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: "white" }}
            >
              Cancel Order
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

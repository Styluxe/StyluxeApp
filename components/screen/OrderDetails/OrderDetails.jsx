import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Divider, HStack, VStack } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetBookingById, useGetOrderById } from "../../../API/OrderAPI";
import { COLORS, SHADOWS } from "../../../constants";
import { formatTimeWithAMPM } from "../../../hook/hook";
import { CheckoutItemCard } from "../../organism";

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getOrderById, orderData } = useGetOrderById();
  const { getBookingById, bookingData } = useGetBookingById();

  const { order_id, booking_id, routeFrom } = route.params;

  const isProduct = !!order_id;
  const isBooking = !!booking_id;

  console.log("booking", bookingData?.booking_date);
  const fullbookingDate =
    isBooking && `${bookingData?.booking_date}T00:00:00.000Z`;

  useFocusEffect(
    useCallback(() => {
      if (isProduct) {
        getOrderById(order_id);
      } else if (isBooking) {
        getBookingById(booking_id);
      }
    }, [order_id, isProduct]),
  );

  const isPaid =
    orderData?.payment_details?.payment_status === "paid" ||
    bookingData?.payment_details?.payment_status === "paid";
  const isRouteFromCheckout = routeFrom === "Checkout";

  const statusSwitch = (status) => {
    switch (status) {
      case "pending":
        return {
          color: COLORS.red,
          message: "Waiting for Payment",
        };
      case "waiting for confirmation":
        return {
          color: COLORS.primary,
          message: "Waiting for Confirmation",
        };
      case "processing":
        return {
          color: COLORS.primary,
          message: "Processing",
        };
      case "shipped":
        return {
          color: COLORS.primary,
          message: "Shipped",
        };
      case "delivered":
        return {
          color: COLORS.green,
          message: "Delivered",
        };
      case "cancelled":
        return {
          color: COLORS.red,
          message: "Cancelled",
        };
      case "accepted":
        return {
          color: COLORS.primary,
          message: "Accepted by Stylist",
        };
      default:
        return {
          color: COLORS.primary,
          message: status,
        };
    }
  };

  const isCancelBtnVisible =
    orderData?.order_status === "pending" || bookingData?.status === "pending";

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
              onPress={() =>
                isRouteFromCheckout
                  ? navigation.navigate("MyActivity")
                  : navigation.goBack()
              }
            />
            <Text style={{ fontFamily: "bold", fontSize: 16 }}>
              Orders #{" "}
              {isProduct
                ? orderData?.order_number
                : bookingData?.booking_number}
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
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 14,
                color:
                  statusSwitch(
                    isProduct ? orderData?.order_status : bookingData?.status,
                  )?.color || COLORS.primary,
              }}
            >
              {
                statusSwitch(
                  isProduct ? orderData?.order_status : bookingData?.status,
                )?.message
              }
            </Text>
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
                {isProduct
                  ? orderData?.order_number
                  : bookingData?.booking_number}
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
                {moment(
                  isProduct ? orderData?.createdAt : bookingData?.createdAt,
                ).format("DD MMM YYYY, HH:mm")}
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
                {isProduct
                  ? orderData?.payment_details?.provider
                  : bookingData?.payment_details?.provider}
              </Text>
            </View>
            <Button
              size="sm"
              bg={isPaid ? COLORS.green : COLORS.primary}
              disabled={isPaid}
              onPress={() => {
                navigation.navigate("PaymentDetails", {
                  routeFrom: "OrderDetails",
                  order_id,
                  booking_id,
                });
              }}
            >
              <Text
                style={{ fontFamily: "semibold", fontSize: 14, color: "white" }}
              >
                {isPaid ? "Paid" : "Pay"}
              </Text>
            </Button>
          </View>
          {isProduct && (
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
          )}
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
              {isProduct ? "Order Details" : "Booking Details"}
            </Text>
            <Divider bg={COLORS.gray2} />
            {isProduct ? (
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
            ) : (
              <VStack>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    Stylist Name:
                  </Text>
                  <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                    {bookingData?.stylist?.brand_name ||
                      bookingData?.stylist?.user?.first_name +
                        " " +
                        bookingData?.stylist?.user?.last_name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    Booking Date:
                  </Text>
                  <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                    {moment(fullbookingDate).format("DD MMM YYYY")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    Booking Time :
                  </Text>
                  <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                    {formatTimeWithAMPM(bookingData?.booking_time)}
                  </Text>
                </View>
              </VStack>
            )}
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
                Rp.{" "}
                {parseFloat(
                  isProduct
                    ? orderData?.total
                    : bookingData?.payment_details?.amount,
                ).toLocaleString("id-ID")}
              </Text>
            </HStack>
            {isProduct && (
              <HStack justifyContent="space-between">
                <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                  Shipping:{" "}
                </Text>
                <Text style={{ fontFamily: "medium", fontSize: 14 }}>Free</Text>
              </HStack>
            )}
            <HStack justifyContent="space-between">
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Total:{" "}
              </Text>
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                Rp.{" "}
                {parseFloat(
                  isProduct
                    ? orderData?.total
                    : bookingData?.payment_details?.amount,
                ).toLocaleString("id-ID")}
              </Text>
            </HStack>
          </View>

          {isCancelBtnVisible && (
            <Button size="sm" bg="$red900">
              <Text
                style={{ fontFamily: "medium", fontSize: 14, color: "white" }}
              >
                Cancel Order
              </Text>
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

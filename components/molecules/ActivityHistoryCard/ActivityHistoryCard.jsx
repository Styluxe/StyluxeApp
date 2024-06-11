import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";

const ActivityHistoryCard = ({ item }) => {
  const navigation = useNavigation();

  const product_image = item?.order_items?.[0]?.product?.images?.[0]
    ? item?.order_items[0].product.images[0]
    : item?.stylist?.images?.[0];

  const isOrder = item?.order_items?.length > 0;

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
          message: "On Delivery",
        };
      case "delivered":
        return {
          color: COLORS.blue,
          message: "Delivered",
        };
      case "done":
        return {
          color: COLORS.green,
          message: "Consultation Completed",
        };
      case "accepted":
        return {
          color: COLORS.green,
          message: "Product Accepted",
        };
      case "scheduled":
        return {
          color: COLORS.primary,
          message: "Scheduled",
        };
      case "on going":
        return {
          color: COLORS.primary,
          message: "On Going",
        };
      case "cancelled":
        return {
          color: COLORS.red,
          message: "Cancelled",
        };
      default:
        return { color: COLORS.primary, message: status };
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderDetails", {
          order_id: item?.order_id,
          booking_id: item?.booking_id,
        })
      }
      activeOpacity={0.8}
      style={{
        padding: 8,
        gap: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        ...SHADOWS.medium,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          style={{
            width: 53,
            height: 74,
            resizeMode: "cover",
          }}
          source={
            product_image
              ? { uri: product_image.image_url }
              : require("../../../assets/content/empty_product.png")
          }
        />
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 14,
                color:
                  statusSwitch(item?.order_status || item?.status).color ||
                  COLORS.primary,
              }}
            >
              {statusSwitch(item?.order_status || item?.status).message}
            </Text>
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 14,
                alignSelf: "flex-end",
                marginBottom: 5,
                color: COLORS.primary,
              }}
            >
              {moment(item?.createdAt).format("DD MMM YYYY")}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              {item?.order_items?.[0]?.product?.product_name
                ? item.order_items[0].product.product_name
                : item?.stylist?.brand_name ||
                  `${item?.stylist?.user?.first_name} ${item?.stylist?.user?.last_name}`}
            </Text>
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              {item?.order_items?.[0]?.quantity
                ? `x${item.order_items[0].quantity}`
                : "1 Session"}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              Rp.{" "}
              {item?.order_items?.[0]?.product?.product_price
                ? parseFloat(
                    item.order_items[0].product.product_price,
                  ).toLocaleString("id-ID")
                : parseFloat(item?.stylist?.price).toLocaleString("id-ID")}
            </Text>
          </View>
          <View style={{ alignSelf: "flex-end", flexDirection: "row", gap: 5 }}>
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              Order's Total:
            </Text>
            <Text>
              Rp.{" "}
              {parseFloat(item?.total || item?.stylist?.price).toLocaleString(
                "id-ID",
              )}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 14,
            color: COLORS.darkGray,
          }}
        >
          {item?.order_items
            ? `Show Detail Products (${item?.order_items?.length || 0} items)`
            : "Show Detail Bookings"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityHistoryCard;

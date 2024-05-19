import { Button } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";

const MyBookingCard = ({ item, role }) => {
  const navigation = useNavigation();

  const fullOrderDateTime = `${item?.booking_date}T${item?.booking_time}:00+07:00`;

  const product_image = item?.order_items?.[0]?.product?.images?.[0]
    ? item?.order_items[0].product.images[0]
    : item?.stylist?.images?.[0];

  const isAccepted = item?.status === "accepted";
  const isScheduled = item?.status === "scheduled";

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
      case "accepted":
        return {
          color: COLORS.primary,
          message: "Accepted by Stylist",
        };
      default:
        return { color: COLORS.primary, message: status };
    }
  };

  return (
    <View
      style={{
        padding: 8,
        gap: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        flex: 1,
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
                color: statusSwitch(item?.status).color || COLORS.primary,
              }}
            >
              {statusSwitch(item?.status).message}
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
            <Text
              numberOfLines={1}
              style={{ fontFamily: "medium", fontSize: 14, maxWidth: "50%" }}
            >
              {role === "stylist"
                ? `${item?.customer?.first_name} ${item?.customer?.last_name}`
                : item?.stylist?.brand_name ||
                  `${item?.stylist?.user?.first_name} ${item?.stylist?.user?.last_name}`}
            </Text>
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              1 Session
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              Date & Time
            </Text>

            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              {moment(fullOrderDateTime).format("DD MMM YYYY") +
                ", " +
                moment(fullOrderDateTime).format("HH:mm")}
            </Text>
          </View>

          <View
            style={{
              alignSelf: "flex-end",
              flexDirection: "row",
              gap: 5,
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              Order's Total:
            </Text>
            <Text>
              Rp. {parseFloat(item?.stylist?.price).toLocaleString("id-ID")}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {isAccepted ? (
          <Button bgColor={COLORS.secondary} disabled>
            <Text style={{ fontFamily: "semibold", color: COLORS.offwhite }}>
              Chat will be open in {moment(fullOrderDateTime).fromNow("day")}
            </Text>
          </Button>
        ) : isScheduled ? (
          <Button
            onPress={() => {
              navigation.navigate("ChatRoom", { booking_id: item?.booking_id });
            }}
            bgColor={COLORS.primary}
          >
            <Text style={{ fontFamily: "semibold", color: COLORS.white }}>
              Open Chat
            </Text>
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default MyBookingCard;

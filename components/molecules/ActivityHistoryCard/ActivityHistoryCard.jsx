import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";

const ActivityHistoryCard = ({ item }) => {
  const navigation = useNavigation();

  const product_image = item.order_items[0].product.images[0];

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderDetails", { order_id: item.order_id })
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
                  item.order_status === "pending" ? COLORS.red : COLORS.black,
              }}
            >
              {item.order_status}
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
              {moment(item.created_at).format("DD MMM YYYY")}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              {item.order_items[0].product.product_name}
            </Text>
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              x{item.order_items[0].quantity}
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
              {parseFloat(
                // eslint-disable-next-line prettier/prettier
                item.order_items[0].product.product_price
              ).toLocaleString("id-ID")}
            </Text>
          </View>
          <View style={{ alignSelf: "flex-end", flexDirection: "row", gap: 5 }}>
            <Text
              style={{ fontFamily: "medium", fontSize: 14, color: COLORS.gray }}
            >
              Order's Total:
            </Text>
            <Text>Rp. {parseFloat(item.total).toLocaleString("id-ID")}</Text>
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
          Show Detail Products
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityHistoryCard;

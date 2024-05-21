import moment from "moment";
import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS } from "../../../../constants";
import { formatTimeWithAMPM } from "../../../../hook/hook";

const CheckoutItemCard = ({
  image,
  name = "Nama Produk",
  size = "XL",
  quantity = 2,
  price = 40000,
  isStylist,
  orderDate,
  orderTime,
}) => {
  const fullOrderDateTime = `2024-05-14T${orderTime}:00+07:00`;

  const endTime = isStylist
    ? moment(fullOrderDateTime).add(30, "m").format("HH:mm")
    : null;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
      }}
    >
      <View style={{ height: 100, width: 100 }}>
        <Image
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          source={
            image
              ? {
                  uri: image,
                }
              : require("../../../../assets/content/empty_product.png")
          }
        />
      </View>

      <View>
        <Text style={{ fontFamily: "bold", fontSize: 16 }}>{name}</Text>
        {isStylist ? (
          <>
            <Text style={{ fontFamily: "medium", fontSize: 12 }}>
              Order Date: {moment(orderDate).format("DD MMM YYYY")}
            </Text>
            <Text style={{ fontFamily: "medium", fontSize: 12 }}>
              Order Time: {formatTimeWithAMPM(orderTime)} -{" "}
              {formatTimeWithAMPM(endTime)}
            </Text>
          </>
        ) : (
          <>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 12,
                color: COLORS.gray,
              }}
            >
              Size: {size}
            </Text>

            <Text
              style={{
                fontFamily: "medium",
                fontSize: 12,
                color: COLORS.gray,
              }}
            >
              x{quantity}
            </Text>
          </>
        )}

        <Text
          style={{
            fontFamily: "medium",
            fontSize: 12,
            color: COLORS.primary,
          }}
        >
          Rp. {parseFloat(price).toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
};

export default CheckoutItemCard;

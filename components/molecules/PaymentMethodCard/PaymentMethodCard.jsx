import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../constants";

const PaymentMethodCard = ({ setSelectedPayment, selectedPayment }) => {
  const paymentMethod = [
    {
      id: 1,
      group_name: "E-Money",
      payment: [
        {
          id: 1,
          payment_name: "Gopay",
        },
        {
          id: 2,
          payment_name: "OVO",
        },
        {
          id: 3,
          payment_name: "Dana",
        },
      ],
    },
    {
      id: 2,
      group_name: "Virtual Account",
      payment: [
        {
          id: 1,
          payment_name: "BCA Virtual Account",
        },
        {
          id: 2,
          payment_name: "BNI Virtual Account",
        },
        {
          id: 3,
          payment_name: "Mandiri Virtual Account",
        },
      ],
    },
    {
      id: 3,
      group_name: "Manual Transfer",
      payment: [
        {
          id: 1,
          payment_name: "BCA Transfer",
        },
        {
          id: 2,
          payment_name: "BNI Transfer",
        },
        {
          id: 3,
          payment_name: "Mandiri Transfer",
        },
      ],
    },
  ];

  const [selectedMenu, setSelectedMenu] = React.useState(paymentMethod[0]);

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: 60,
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderBottomWidth: 1,
        }}
      >
        {paymentMethod.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRightWidth: 1,
              backgroundColor:
                selectedMenu.id === item.id ? COLORS.primary : COLORS.secondary,
            }}
            onPress={() => {
              setSelectedMenu(item);
              setSelectedPayment(null);
            }}
          >
            <View
              style={{
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: 12,
                  color: COLORS.black,
                }}
              >
                {item.group_name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {selectedMenu.payment.map((item) => (
          <TouchableOpacity
            onPress={() => setSelectedPayment(item.payment_name)}
            key={item.id}
          >
            <View
              style={{
                paddingVertical: 18,
                paddingHorizontal: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                {item.payment_name}
              </Text>

              <Ionicons
                name={
                  selectedPayment === item.payment_name
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PaymentMethodCard;

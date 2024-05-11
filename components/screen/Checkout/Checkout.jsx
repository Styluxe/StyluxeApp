import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { PaymentMethodCard } from "../../molecules";
import { CheckoutAddressCard, CheckoutItemCard } from "../../organism";
import { useGetPaymentSummary } from "../../../API/OrderAPI";

const Checkout = () => {
  const navigation = useNavigation();

  const { getPaymentSummary, summaryData } = useGetPaymentSummary();

  useEffect(() => {
    getPaymentSummary();
  }, []);

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
      <View style={{ flex: 1, backgroundColor: COLORS.bgGray }}>
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 10,
              backgroundColor: COLORS.white,
            }}
          >
            <CheckoutAddressCard
              address_name={summaryData.address?.name}
              user_name={summaryData.address?.receiver_name}
              address={summaryData.address?.address}
              phone={summaryData.address?.mobile}
              onPress={() => navigation.navigate("MyAddress")}
            />
          </View>
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 10,
              backgroundColor: COLORS.white,
              gap: 15,
            }}
          >
            {summaryData.cartItems?.map((item) => (
              <CheckoutItemCard
                key={item.cart_item_id}
                image={item.product.images[0]?.image_url}
                name={item.product.product_name}
                price={item.product.product_price}
                quantity={item.quantity}
                size={item.size}
              />
            ))}
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
                Rp.{" "}
                {parseInt(summaryData.total_price, 10).toLocaleString("id-ID")}
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
                Rp.{" "}
                {parseInt(summaryData.total_price, 10).toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 16,
              backgroundColor: COLORS.white,
              flex: 1,
              gap: 15,
            }}
          >
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              Choose your Payment Method
            </Text>

            <PaymentMethodCard />

            <TouchableOpacity style={{ alignSelf: "flex-start" }}>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  backgroundColor: COLORS.gray2,
                  borderRadius: 20,
                  gap: 11,
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontFamily: "bold", fontSize: 10 }}>
                    Use Styluxe Point
                  </Text>
                  <Text style={{ fontFamily: "semibold", fontSize: 8 }}>
                    25.000 points
                  </Text>
                </View>

                <Ionicons
                  name="radio-button-off-outline"
                  size={16}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
            Rp {parseInt(summaryData.total_price, 10).toLocaleString("id-ID")}
          </Text>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 10,
              color: "green",
            }}
          >
            you saved 25.000 from using styluxe point!
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

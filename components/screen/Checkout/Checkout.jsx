import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCreateOrder, useGetPaymentSummary } from "../../../API/OrderAPI";
import { COLORS } from "../../../constants";
import { ConfirmationModal, PaymentMethodCard } from "../../molecules";
import { CheckoutAddressCard, CheckoutItemCard } from "../../organism";

const Checkout = () => {
  const navigation = useNavigation();

  const {
    getPaymentSummary,
    summaryData,
    code: summaryCode,
    setCode: setSummaryCode,
  } = useGetPaymentSummary();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { createOrder, responseData, code, setCode } = useCreateOrder();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  useFocusEffect(
    useCallback(() => {
      getPaymentSummary();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (summaryCode === 200) {
        if (!summaryData?.cartItems) {
          navigation.navigate("Home");
        }

        setSummaryCode(null);
      }
    }, [summaryData, summaryCode]),
  );

  const handleCheckout = () => {
    createOrder(selectedPayment, summaryData.address?.address_id);
    setShowModal(false);
  };

  useEffect(() => {
    if (code === 200) {
      navigation.navigate("PaymentDetails", {
        routeFrom: "Checkout",
        order_id: responseData.order_id,
      });

      setCode(null);
    }
  }, [responseData, code]);

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
            {summaryData?.address ? (
              <CheckoutAddressCard
                address_name={summaryData.address?.name}
                user_name={summaryData.address?.receiver_name}
                address={summaryData.address?.address}
                phone={summaryData.address?.mobile}
                onPress={() => navigation.navigate("MyAddress")}
              />
            ) : (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.gray2,
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "medium", fontSize: 14 }}>
                  You don't have any address
                </Text>

                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: 14,
                    color: COLORS.primary,
                    textDecorationLine: "underline",
                  }}
                  onPress={() =>
                    navigation.navigate("ManageAddress", { type: "new" })
                  }
                >
                  Create Now
                </Text>
              </View>
            )}
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

            <PaymentMethodCard
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
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
        </View>

        <Button
          disabled={!selectedPayment || !summaryData?.address}
          bgColor={
            !selectedPayment || !summaryData?.address
              ? COLORS.gray2
              : COLORS.primary
          }
          onPress={() => {
            setShowModal(true);
          }}
        >
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

      <ConfirmationModal
        modalRef={modalRef}
        setShowModal={setShowModal}
        showModal={showModal}
        title="Payment Confirmation"
        content="Are you sure you have double checked your order details?"
        handlePositive={handleCheckout}
      />
    </SafeAreaView>
  );
};

export default Checkout;

import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCreateBookingApi } from "../../../API/OrderAPI";
import { useGetStylistByIdApi } from "../../../API/StylistApi";
import { COLORS } from "../../../constants";
import { ConfirmationModal, PaymentMethodCard } from "../../molecules";
import { CheckoutItemCard } from "../../organism";

const StylistPayment = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { stylist_id, date, time } = route.params;

  const { getStylistById, data } = useGetStylistByIdApi();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { createBooking, code, responseData, setCode } = useCreateBookingApi();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  useFocusEffect(
    useCallback(() => {
      getStylistById(stylist_id);
    }, [stylist_id]),
  );

  useEffect(() => {
    if (code === 200) {
      navigation.navigate("PaymentDetails", {
        booking_id: responseData?.booking_id,
        routeFrom: "StylistPayment",
      });
      setCode(null);
      setShowModal(false);
    } else if (code === 500) {
      alert("Error");
    }
  }, [code]);

  const handlePayment = () => {
    const bookingData = {
      stylist_id,
      booking_date: moment(date).format(),
      booking_time: time,
      amount: data?.price || 0,
      provider: selectedPayment,
    };

    createBooking(bookingData);
  };

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
              gap: 15,
            }}
          >
            <CheckoutItemCard
              name={
                data?.brand_name ||
                `${data?.user?.first_name} ${data?.user?.last_name}`
              }
              price={data?.price || 0}
              orderDate={date}
              orderTime={time}
              isStylist
            />
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
                Rp. {parseInt(data?.price, 10).toLocaleString("id-ID")}
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
                Rp. {parseInt(data?.price, 10).toLocaleString("id-ID")}
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
            Rp {parseInt(data?.price, 10).toLocaleString("id-ID")}
          </Text>
          {/* <Text
            style={{
              fontFamily: "medium",
              fontSize: 10,
              color: "green",
            }}
          >
            you saved 25.000 from using styluxe point!
          </Text> */}
        </View>

        <Button
          disabled={!selectedPayment}
          bgColor={!selectedPayment ? COLORS.gray2 : COLORS.primary}
          onPress={() => setShowModal(true)}
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
        content="Are you sure you have double check on your booking details and continue to payment?"
        title="Confirm Booking Details"
        handlePositive={handlePayment}
      />
    </SafeAreaView>
  );
};

export default StylistPayment;

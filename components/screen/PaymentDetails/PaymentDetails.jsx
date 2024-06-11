import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  ButtonText,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useGetBookingById,
  useGetOrderById,
  useUpdateBookingStatus,
  useUpdateStatus,
} from "../../../API/OrderAPI";
import { COLORS, SHADOWS } from "../../../constants";

const PaymentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { routeFrom, order_id, booking_id } = route.params || {};
  const { getBookingById, bookingData } = useGetBookingById();
  const [showModal, setShowModal] = React.useState(false);
  const [imageReceipt, setImageReceipt] = React.useState(null);
  const modalRef = useRef();

  const { getOrderById, orderData } = useGetOrderById();
  const { updateStatus, code, loading, setCode } = useUpdateStatus();
  const {
    updateBookingStatus,
    code: bookingCode,
    setCode: setBookingCode,
  } = useUpdateBookingStatus();

  const isProduct = !!order_id;
  const isBooking = !!booking_id;

  useFocusEffect(
    useCallback(() => {
      if (isProduct) {
        getOrderById(order_id);
      } else if (isBooking) {
        getBookingById(booking_id);
      }
    }, [order_id]),
  );

  useEffect(() => {
    if (code === 200) {
      setShowModal(true);
      setCode(null);
    }
    if (bookingCode === 200) {
      setShowModal(true);
      setBookingCode(null);
    }
  }, [code, bookingCode]);

  //provider account number switch
  const providerAccountNumberSwitch = (provider) => {
    switch (provider) {
      case "OVO":
        return "30018123456789";
      case "DANA":
        return "6281234567890";
      case "GOPAY":
        return "085123456789";
      case "BCA Virtual Account":
        return "1122000078946";
      case "Mandiri Virtual Account":
        return "1122000078946";
      case "BNI Virtual Account":
        return "1122000078946";
      case "BCA Transfer":
        return "89901123 ";
      case "Mandiri Transfer":
        return "89901123 ";
      case "BNI Transfer":
        return "89901123 ";
      default:
        return "1122000078946";
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newFile = {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: `image${Math.floor(Math.random() * (999 - 100 + 1) + 100)}.jpeg`,
        };

        setImageReceipt(newFile);
      }
    } catch (error) {
      // Handle any errors that occur during the image picking process
      console.error("Error picking image:", error);
      // Provide feedback to the user that an error occurred
    }
  };

  const handlePayment = () => {
    if (isProduct) {
      updateStatus(order_id, "paid", "waiting for confirmation");
    }
    if (isBooking) {
      updateBookingStatus(booking_id, "paid", "scheduled");
    }
  };

  const isFromCheckout = routeFrom === "Checkout";
  const isFromStylistPayment = routeFrom === "StylistPayment";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: "flex-start", padding: 10 }}>
          <TouchableOpacity
            onPress={() =>
              isFromCheckout
                ? navigation.navigate("Home")
                : isFromStylistPayment
                  ? navigation.navigate("MyActivity")
                  : navigation.goBack()
            }
            style={{
              alignItems: "flex-start",
              ...SHADOWS.medium,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 100,
            }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 20,
            gap: 10,
            paddingHorizontal: 40,
          }}
        >
          <Text style={{ fontFamily: "medium", fontSize: 20 }}>
            {isProduct
              ? orderData?.payment_details?.provider
              : bookingData?.payment_details?.provider}{" "}
            Payment
          </Text>
          <Text
            style={{ fontFamily: "regular", fontSize: 14, textAlign: "center" }}
          >
            Hi Fildansyah Anggadikusumah
            {"\n"}
            IMPORTANT! Make payment before{" "}
            <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
              {moment(
                isProduct
                  ? orderData?.payment_details?.payment_deadline
                  : bookingData?.payment_details?.payment_deadline,
              ).format("ll")}
            </Text>{" "}
            at{" "}
            <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
              {moment(
                isProduct
                  ? orderData?.payment_details?.payment_deadline
                  : bookingData?.payment_details?.payment_deadline,
              ).format("LT")}
            </Text>{" "}
            or your order will be automatically canceled by the system
          </Text>
        </View>
        <View style={{ backgroundColor: COLORS.bgGray }}>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: COLORS.gray2,
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                flex: 1,
              }}
            >
              No Order
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                flex: 1,
                fontSize: 14,
              }}
            >
              {isProduct
                ? orderData?.order_number
                : bookingData?.booking_number}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: COLORS.gray2,
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                flex: 1,
              }}
            >
              Payment Provider
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                flex: 1,
                fontSize: 14,
              }}
            >
              {isProduct
                ? orderData?.payment_details?.provider
                : bookingData?.payment_details?.provider}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: COLORS.gray2,
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                flex: 1,
              }}
            >
              Account Number
            </Text>
            <View style={{ flexDirection: "row", gap: 20, flex: 1 }}>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                }}
              >
                {providerAccountNumberSwitch(
                  isProduct
                    ? orderData?.payment_details?.provider
                    : bookingData?.payment_details?.provider,
                )}
              </Text>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                  color: "blue",
                  textDecorationLine: "underline",
                }}
                onPress={() => {}}
              >
                Copy
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: COLORS.gray2,
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                flex: 1,
              }}
            >
              Total
            </Text>
            <View style={{ flexDirection: "row", gap: 20, flex: 1 }}>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                }}
              >
                Rp{" "}
                {parseInt(
                  isProduct
                    ? orderData?.payment_details?.transfer_amount
                    : bookingData?.payment_details?.transfer_amount,
                  10,
                ).toLocaleString("id-ID")}
              </Text>

              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                  color: "blue",
                  textDecorationLine: "underline",
                }}
                onPress={() => {}}
              >
                Copy
              </Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <View
            style={{
              paddingVertical: 20,
              gap: 10,
              paddingHorizontal: 40,
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                textAlign: "center",
                color: COLORS.tertiary,
              }}
            >
              Don't forget to add the last 3 digits in the amount column when
              making a transfer
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 5,
            gap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "regular",
              fontSize: 14,
              padding: 10,
              textAlign: "center",
            }}
          >
            If you have already paid, please confirm payment by pressing the
            button below
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleImagePick();
            }}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: COLORS.primary,
              alignSelf: "center",
              backgroundColor: COLORS.white,
            }}
          >
            <Ionicons name="images-outline" size={24} color={COLORS.primary} />

            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 14,
              }}
            >
              Add Payment Image
            </Text>
          </TouchableOpacity>
          {imageReceipt?.uri && (
            <View
              style={{
                width: 200,
                height: 200,
                borderRadius: 5,
                overflow: "hidden",
                alignSelf: "center",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
                source={{ uri: imageReceipt?.uri }}
              />

              <Ionicons
                name="close"
                size={24}
                color={COLORS.white}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: COLORS.red,
                  padding: 2,
                  borderRadius: 100,
                }}
                onPress={() => {
                  setImageReceipt(null);
                }}
              />
            </View>
          )}

          <Button
            bgColor={imageReceipt?.uri ? COLORS.primary : COLORS.secondary}
            disabled={!imageReceipt?.uri}
            onPress={handlePayment}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.white,
              }}
            >
              {loading ? "Loading..." : "I Have Paid"}
            </Text>
          </Button>
        </View>

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            navigation.navigate("MyActivity");
          }}
          finalFocusRef={modalRef}
          closeOnOverlayClick={false}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading
                size="lg"
                style={{ color: COLORS.green, fontFamily: "bold" }}
              >
                Payment Accepted
              </Heading>
            </ModalHeader>
            <ModalBody>
              <Text style={{ color: COLORS.darkGray, fontFamily: "medium" }}>
                Your payment has been received. and it will be confirmed soon.
                please wait...
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="solid"
                bgColor={COLORS.primary}
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                  navigation.navigate("MyActivity");
                  setShowModal(false);
                }}
              >
                <ButtonText
                  style={{ color: COLORS.white, fontFamily: "semibold" }}
                >
                  Continue
                </ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentDetails;

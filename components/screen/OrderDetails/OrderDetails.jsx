import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Divider,
  HStack,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useCancelBookingApi,
  useCancelOrderApi,
  useGetBookingById,
  useGetOrderById,
  useUpdateStatus,
} from "../../../API/OrderAPI";
import { useAddStylistReviewApi } from "../../../API/StylistApi";
import { COLORS, SHADOWS } from "../../../constants";
import { formatTimeWithAMPM } from "../../../hook/hook";
import { ConfirmationModal, ReviewModal } from "../../molecules";
import { CheckoutItemCard } from "../../organism";

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getOrderById, orderData } = useGetOrderById();
  const { getBookingById, bookingData } = useGetBookingById();
  const { addStylistReview, code, setCode } = useAddStylistReviewApi();
  const {
    cancelOrder,
    code: cancelCode,
    setCode: setCancelCode,
  } = useCancelOrderApi();
  const {
    updateStatus,
    code: statusCode,
    loading,
    setCode: setStatusCode,
  } = useUpdateStatus();
  const {
    cancelBooking,
    loading: cancelBookingLoading,
    code: cancelBookingCode,
    setCode: setCancelBookingCode,
  } = useCancelBookingApi();

  const { order_id, booking_id, routeFrom } = route.params;

  const toast = useToast();

  const modalRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deliveredModal, setDeliveredModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    feedback: "",
  });

  const isProduct = !!order_id;
  const isBooking = !!booking_id;
  const bookingComplete =
    isBooking && bookingData?.status === "done" && !bookingData?.isReviewed;

  const delivered = orderData?.order_status === "delivered";

  const fullbookingDate =
    isBooking && `${bookingData?.booking_date}T00:00:00.000Z`;

  const reviewRequest = {
    stylist_id: bookingData?.stylist_id,
    rating: reviewData.rating,
    feedback: reviewData.feedback,
    booking_id: bookingData?.booking_id,
  };

  const handleReview = () => {
    console.log(reviewRequest);
    addStylistReview(reviewRequest);
  };
  const handleDelivered = () => {
    updateStatus(order_id, null, "accepted");
  };

  const handleCancelOrder = () => {
    if (isProduct) {
      cancelOrder(order_id);
    } else if (isBooking) {
      cancelBooking(booking_id);
    }
  };

  useEffect(() => {
    if (code === 200) {
      getBookingById(booking_id);
      setCode(null);
      setShowModal(false);
    }

    if (cancelCode === 200) {
      getOrderById(order_id);
      setCancelCode(null);
      setConfirmModal(false);
      toast.show({
        description: "Order Cancelled",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Order Cancelled</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    }

    if (statusCode === 200) {
      getOrderById(order_id);
      setStatusCode(null);
      setDeliveredModal(false);
      toast.show({
        description: "Order Delivered",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Thank you for your order</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    }

    if (cancelBookingCode === 200) {
      getBookingById(booking_id);
      setCancelBookingCode(null);
      setConfirmModal(false);
      toast.show({
        description: "Booking Cancelled",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Booking Cancelled</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    }
  }, [
    code,
    cancelCode,
    booking_id,
    order_id,
    statusCode,
    toast,
    cancelBookingCode,
  ]);

  useFocusEffect(
    useCallback(() => {
      if (isProduct) {
        getOrderById(order_id);
      } else if (isBooking) {
        getBookingById(booking_id);
      }
    }, [order_id, isProduct]),
  );

  useEffect(() => {
    if (bookingComplete) {
      setShowModal(true);
    }
  }, [bookingComplete]);

  const isPaid =
    orderData?.payment_details?.payment_status === "paid" ||
    bookingData?.payment_details?.payment_status === "paid";
  const isRouteFromCheckout = routeFrom === "Checkout";
  const isCancelled =
    orderData?.order_status === "cancelled" ||
    bookingData?.status === "cancelled";

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
      case "cancelled":
        return {
          color: COLORS.red,
          message: "Cancelled",
        };
      case "on going":
        return {
          color: COLORS.primary,
          message: "On Going",
        };
      case "scheduled":
        return {
          color: COLORS.primary,
          message: "Scheduled",
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
            {!isCancelled && (
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
                  style={{
                    fontFamily: "semibold",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  {isPaid ? "Paid" : "Pay"}
                </Text>
              </Button>
            )}
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
              <VStack gap={10}>
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
                    {bookingData?.booking_date &&
                      moment(fullbookingDate).format("DD MMM YYYY")}
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
            <Button
              size="sm"
              bg="$red900"
              onPress={() => {
                setConfirmModal(true);
              }}
            >
              <Text
                style={{ fontFamily: "medium", fontSize: 14, color: "white" }}
              >
                Cancel Order
              </Text>
            </Button>
          )}
          {isBooking && bookingData?.status === "done" && (
            <Button
              size="sm"
              bgColor={COLORS.primary}
              onPress={() => {
                navigation.navigate("ChatRoom", {
                  booking_id: bookingData?.booking_id,
                });
              }}
            >
              <Text
                style={{ fontFamily: "medium", fontSize: 14, color: "white" }}
              >
                View Chat History
              </Text>
            </Button>
          )}

          {bookingComplete && (
            <Button
              size="sm"
              borderColor={COLORS.primary}
              borderWidth={2}
              variant="outline"
              bgColor={COLORS.white}
              onPress={() => setShowModal(true)}
            >
              <Text
                style={{
                  fontFamily: "semibold",
                  fontSize: 14,
                  color: COLORS.primary,
                }}
              >
                Write Review
              </Text>
            </Button>
          )}

          {delivered && (
            <Button
              size="sm"
              bgColor={COLORS.primary}
              onPress={() => setDeliveredModal(true)}
            >
              <Text
                style={{ fontFamily: "medium", fontSize: 14, color: "white" }}
              >
                i have received my product
              </Text>
            </Button>
          )}
        </View>
      </ScrollView>
      <ReviewModal
        modalRef={modalRef}
        setShowModal={setShowModal}
        showModal={showModal}
        reviewData={reviewData}
        setReviewData={setReviewData}
        handlePost={handleReview}
      />

      <ConfirmationModal
        modalRef={modalRef}
        setShowModal={setConfirmModal}
        showModal={confirmModal}
        title="Cancel Order"
        header_color="red"
        btnPositiveText="Cancel Order"
        btnNegativeText="Back"
        btnPositiveColor="red"
        content="Are you sure you want to cancel this order? You will not be able to undo this action."
        handlePositive={handleCancelOrder}
      />

      <ConfirmationModal
        modalRef={modalRef}
        setShowModal={setDeliveredModal}
        showModal={deliveredModal}
        title="Order Delivered"
        header_color="green"
        btnPositiveText="Confirm"
        btnNegativeText="Back"
        btnPositiveColor="green"
        content="Are you sure you have received your product?"
        handlePositive={handleDelivered}
      />
    </SafeAreaView>
  );
};

export default OrderDetails;

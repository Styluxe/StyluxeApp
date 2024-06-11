import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Spinner,
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
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import { styles } from "./ChatRoom.style";
import {
  useGetConversationById,
  useGetMessageById,
  usePostMessage,
} from "../../../API/ConversationAPI";
import { useEndBookingApi, useRefundBookingAPI } from "../../../API/OrderAPI";
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";
import {
  ChatBox,
  ChatModal,
  ConfirmationModal,
  ImageModal,
} from "../../molecules";

const ChatRoom = () => {
  const [inputText, setInputText] = useState("");
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();
  const userData = useSelector(userDataState);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();
  const [remainingTime, setRemainingTime] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const timerIntervalRef = useRef();

  const route = useRoute();
  const { booking_id } = route.params;
  const isCustomer = userData?.user_role !== "stylist";

  const navigation = useNavigation();
  const { conversation, getConversationById } = useGetConversationById();
  const {
    endBooking,
    code: endBookingCode,
    setCode: setEndBookingCode,
  } = useEndBookingApi();
  const {
    refundBooking,
    code: refundCode,
    setCode: setRefundCode,
  } = useRefundBookingAPI();
  const {
    getMessageById,
    message: fetchedMessages,
    code: fetchedCode,
    setCode: setFetchedCode,
  } = useGetMessageById();
  const { postMessage, code, setCode, loading } = usePostMessage();

  const toast = useToast();

  const display_name = isCustomer
    ? conversation?.booking?.stylist?.brand_name ||
      conversation?.booking?.stylist?.user?.first_name +
        " " +
        conversation?.booking?.stylist?.user?.last_name
    : conversation?.booking?.customer?.first_name +
      " " +
      conversation?.booking?.customer?.last_name;

  useFocusEffect(
    useCallback(() => {
      const socket = io("http://10.0.2.2:8080");

      socket.on("connect", () => {
        console.log("connected to server");

        socket.emit("joinRoom", {
          conversation_id: conversation?.conversation_id,
        });

        socket.on("new-message", (newMessage) => {
          console.log("Received new message", newMessage);
          if (newMessage?.conversation_id === conversation?.conversation_id) {
            setMessages((prevMessages) => [
              ...prevMessages,
              newMessage.message,
            ]);
          }
        });

        socket.on("error", (error) => {
          console.error("Socket error:", error);
        });

        socket.on("disconnect", () => {
          console.log("Disconnected from server");
        });
      });

      getConversationById(booking_id);
      getMessageById(booking_id);

      return () => {
        socket.disconnect();
      };
    }, [conversation?.conversation_id, booking_id]),
  );

  useEffect(() => {
    if (fetchedCode === 200) {
      setMessages(fetchedMessages);
      setFetchedCode(null);
    }
  }, [fetchedCode]);

  useEffect(() => {
    if (code === 201) {
      setInputText("");
      setCode(null);
    }
  }, [code]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (flatListRef.current) {
        setTimeout(() => {
          flatListRef.current.scrollToEnd({ animated: true });
        }, 100);
      }
    };
    scrollToBottom();
  }, [messages]);

  const handleTextChange = (text) => {
    setInputText(text);
    if (text.length > 40) {
      setNumberOfLines(2);
    } else if (text.length > 60) {
      setNumberOfLines(3);
    } else {
      setNumberOfLines(1);
    }
  };

  const endTime = conversation?.end_time;

  useEffect(() => {
    if (endTime) {
      const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const end = new Date(endTime).getTime();
        const timeLeft = Math.max(0, end - now);
        setRemainingTime(timeLeft);
      };

      calculateRemainingTime();

      timerIntervalRef.current = setInterval(calculateRemainingTime, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [endTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const isEnded = remainingTime === 0;

  const handleEndBooking = () => {
    endBooking(booking_id);
  };

  const handleRefund = () => {
    refundBooking(booking_id);
    toast.show({
      description: "Booking ended!",
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack>
              <ToastTitle>
                Your booking has been ended, and it will be refunded in 24 hours
              </ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  useEffect(() => {
    if (endBookingCode === 200) {
      toast.show({
        description: "Booking ended!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Booking Ended</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      navigation.goBack();
      setEndBookingCode(null);
      setShowModal(false);
      setEndBookingCode(null);
    }

    if (refundCode === 200) {
      setRefundCode(null);
      setShowRefundModal(false);
      toast.show({
        description: "Booking refunded!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>
                  Your booking has been ended, and it will be refunded shortly
                </ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    }
  }, [endBookingCode, refundCode]);

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
          name: `chat-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}.jpeg`,
        };

        postMessage(booking_id, "image", newFile);
      }
    } catch (error) {
      // Handle any errors that occur during the image picking process
      console.error("Error picking image:", error);
      // Provide feedback to the user that an error occurred
    }
  };

  //const handle show refund button if no message from other participant after 10 minutes from start_time
  const showRefundButton = () => {
    const filterConversation = messages?.filter(
      (m) => m?.participant?.user_id !== userData?.user_id,
    );

    const now = moment();
    const start = moment(conversation?.start_time);
    const timediff = now.diff(start, "minutes");

    if (filterConversation.length === 0 && timediff > 10) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header_container}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={32}
            color={COLORS.primary}
          />
          <View>
            <Text
              numberOfLines={1}
              style={{ fontFamily: "bold", fontSize: 16, maxWidth: 200 }}
            >
              {display_name}
            </Text>
            {isCustomer && (
              <Text style={{ fontFamily: "regular", fontSize: 14 }}>
                {conversation?.booking?.stylist?.type}
              </Text>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 15 }}>
          {isCustomer && !isEnded && showRefundButton() && (
            <TouchableOpacity
              onPress={() => setShowRefundModal(true)}
              activeOpacity={0.8}
              style={{
                padding: 5,
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "semibold",
                  fontSize: 12,
                  color: COLORS.white,
                }}
              >
                Refund Bookings
              </Text>
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="timer-outline" size={24} color="black" />
            {/* timer */}
            <Text style={{ fontFamily: "regular", fontSize: 14 }}>
              {remainingTime !== null ? formatTime(remainingTime) : "00:00"}
            </Text>
          </View>
          {!isCustomer && !isEnded && (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="red"
              onPress={() => setShowModal(true)}
            />
          )}
        </View>
      </View>
      <View style={styles.chat_container}>
        <FlatList
          data={messages}
          contentContainerStyle={{
            paddingVertical: 25,
            paddingHorizontal: 15,
            gap: 24,
            flexDirection: "column",
          }}
          renderItem={({ item }) => (
            <ChatBox
              content={item?.message_text}
              isSender={item?.participant?.user_id === userData?.user_id}
              time={item?.createdAt}
              image={item?.media}
              onPressImage={() => {
                setSelectedImage(item?.media);
                setShowImageModal(true);
              }}
            />
          )}
          ref={flatListRef}
          keyExtractor={(item) => item.message_id.toString()}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
      </View>
      {isEnded ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "semibold",
              color: COLORS.darkGray,
            }}
          >
            The conversation has ended
          </Text>
        </View>
      ) : (
        <View style={styles.footer_container}>
          {loading && (
            <HStack space="md">
              <Spinner color={COLORS.primary} $active-alignSelf="start" />
              <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                Sending Message..
              </Text>
            </HStack>
          )}

          <View style={styles.input_container}>
            <View style={styles.camera_input_wrapper}>
              <Ionicons
                name="camera-outline"
                size={29}
                onPress={handleImagePick}
              />
              <TextInput
                editable={!loading}
                style={{ flex: 1 }}
                multiline
                numberOfLines={numberOfLines}
                value={inputText}
                onChangeText={handleTextChange}
                placeholder="Type a message"
              />
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={() => postMessage(booking_id, inputText)}
            >
              <View
                style={[
                  styles.send_button,
                  {
                    backgroundColor: loading
                      ? COLORS.secondary
                      : COLORS.primary,
                  },
                ]}
              >
                <Ionicons name="send" size={18} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!isCustomer && !isEnded && (
        <ChatModal
          setShowModal={setShowModal}
          showModal={showModal}
          modalRef={ref}
          handleEnd={handleEndBooking}
        />
      )}

      <ImageModal
        image_url={selectedImage}
        modalRef={ref}
        setShowModal={setShowImageModal}
        showModal={showImageModal}
      />

      <ConfirmationModal
        showModal={showRefundModal}
        modalRef={ref}
        setShowModal={setShowRefundModal}
        title="Refund Booking"
        header_color={COLORS.primary}
        content="Are you sure you want to refund this booking?"
        btnPositiveText="Refund"
        btnNegativeText="Back"
        btnPositiveColor={COLORS.primary}
        handlePositive={handleRefund}
      />
    </SafeAreaView>
  );
};

export default ChatRoom;

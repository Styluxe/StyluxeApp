import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";
import { ChatBox, ChatModal } from "../../molecules";

const ChatRoom = () => {
  const [inputText, setInputText] = useState("");
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();
  const userData = useSelector(userDataState);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();

  const route = useRoute();
  const { booking_id } = route.params;
  const isCustomer = userData?.user_role !== "stylist";

  const navigation = useNavigation();
  const { conversation, getConversationById } = useGetConversationById();
  const {
    getMessageById,
    message: fetchedMessages,
    code: fetchedCode,
    setCode: setFetchedCode,
  } = useGetMessageById();
  const { postMessage, code, setCode } = usePostMessage();

  const display_name = isCustomer
    ? conversation?.booking?.stylist?.brand_name ||
      conversation?.booking?.stylist?.user?.first_name +
        " " +
        conversation?.booking?.stylist?.user?.last_name
    : conversation?.booking?.customer?.first_name +
      " " +
      conversation?.booking?.customer?.last_name;

  useEffect(() => {
    const socket = io("http://10.0.2.2:8080");
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("new-message", (newMessage) => {
      if (newMessage?.conversation_id === conversation?.conversation_id) {
        setMessages((prevMessages) => [...prevMessages, newMessage.message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      getConversationById(booking_id);
      getMessageById(booking_id);
    }, [booking_id]),
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
              style={{ fontFamily: "bold", fontSize: 16, maxWidth: "90%" }}
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
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="timer-outline" size={24} color="black" />
            <Text style={{ fontFamily: "regular", fontSize: 14 }}>30:00</Text>
          </View>
          {!isCustomer && (
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
      <View style={styles.footer_container}>
        <View style={styles.input_container}>
          <View style={styles.camera_input_wrapper}>
            <Ionicons name="camera-outline" size={29} />
            <TextInput
              style={{ flex: 1 }}
              multiline
              numberOfLines={numberOfLines}
              value={inputText}
              onChangeText={handleTextChange}
              placeholder="Type a message"
            />
          </View>

          <TouchableOpacity onPress={() => postMessage(booking_id, inputText)}>
            <View style={styles.send_button}>
              <Ionicons name="send" size={18} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {!isCustomer && (
        <ChatModal
          setShowModal={setShowModal}
          showModal={showModal}
          modalRef={ref}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatRoom;

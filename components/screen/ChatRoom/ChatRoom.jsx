import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, SHADOWS } from "../../../constants";
import { dummyChatData } from "../../../mocks/DummyChat";
import { ChatBox } from "../../molecules";

const ChatRoom = () => {
  const [inputText, setInputText] = useState("");
  const [numberOfLines, setNumberOfLines] = useState(1);
  const flatListRef = useRef();

  const navigation = useNavigation();

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

  const headerData = dummyChatData.users.filter(
    // eslint-disable-next-line prettier/prettier
    (user) => user.type === "Stylist",
  );
  const headerDataObj = headerData[0];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={32}
            color={COLORS.primary}
          />
          <View>
            <Text style={{ fontFamily: "bold", fontSize: 18 }}>
              {headerDataObj.name}
            </Text>
            <Text style={{ fontFamily: "regular", fontSize: 14 }}>
              {headerDataObj.category}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Ionicons name="timer-outline" size={24} color="black" />
          <Text style={{ fontFamily: "regular", fontSize: 14 }}>
            {dummyChatData.timer}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: COLORS.gray2,
          backgroundColor: COLORS.white,
        }}
      >
        <FlatList
          data={dummyChatData.chat_data}
          contentContainerStyle={{
            paddingVertical: 25,
            paddingHorizontal: 15,
            gap: 24,
            flexDirection: "column-reverse",
            flex: 1,
          }}
          renderItem={(item) => (
            <ChatBox
              isSender={item.item.user.type === "User"}
              content={item.item.message}
              time={item.item.time}
            />
          )}
          ref={flatListRef}
          inverted
        />
      </View>

      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 21,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            padding: 13,
            flexDirection: "row",
            borderRadius: 20,
            alignItems: "center",
            backgroundColor: COLORS.lightGray,
            ...SHADOWS.small,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              overflow: "hidden",
              flex: 1,
            }}
          >
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

          <TouchableOpacity>
            <View
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderRadius: 100,
                backgroundColor: COLORS.primary,
              }}
            >
              <Ionicons name="send" size={18} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;

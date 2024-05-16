import moment from "moment";
import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";

const ChatBox = ({ isSender, content, time }) => {
  return (
    <View style={{ flexDirection: isSender ? "row-reverse" : "row", gap: 10 }}>
      {!isSender && (
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 100,
            overflow: "hidden",
            alignSelf: "flex-end",
          }}
        >
          <Image
            source={require("../../../assets/content/profpic.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 100,
            }}
          />
        </View>
      )}
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 8,
          backgroundColor: isSender ? COLORS.primary : COLORS.offwhite,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: isSender ? 20 : 0,
          borderBottomRightRadius: isSender ? 0 : 20,
          borderTopRightRadius: 20,
          maxWidth: "70%",
          ...SHADOWS.medium,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontFamily: "medium",
            color: isSender ? COLORS.white : COLORS.black,
          }}
        >
          {content}
        </Text>
        <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 12,
            fontFamily: "regular",
            color: isSender ? COLORS.lightGray : COLORS.darkGray,
          }}
        >
          {moment(time).format("LT")}
        </Text>
      </View>
    </View>
  );
};

export default ChatBox;

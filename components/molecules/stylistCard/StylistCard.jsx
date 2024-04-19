import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../constants";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";

const StylistCard = () => {
  const [liked, setLiked] = useState(false);

  const total_likes = 3;

  const date = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const star = [1, 2, 3, 4, 5];

  return (
    <View
      style={{
        width: 240,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: COLORS.gray2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View style={{ width: 32, height: 32 }}>
            <Image
              source={require("../../../assets/content/profpic.png")}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </View>
          <Text
            style={{
              fontFamily: "bold",
              color: COLORS.black,
              maxWidth: 100,
            }}
            numberOfLines={2}
          >
            Dan Stylist
          </Text>
        </View>

        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            color={liked ? COLORS.red : COLORS.black}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={{ fontFamily: "semibold", color: COLORS.primary, fontSize: 16 }}
      >
        Wedding Stylist
      </Text>

      <View style={{ flexDirection: "row" }}>
        {date.map((item, index) => (
          <Text
            key={index}
            style={{ fontFamily: "regular", color: COLORS.black }}
          >
            {item}
            {index < date.length - 1 && ", "}
          </Text>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          paddingVertical: 10,
        }}
      >
        {star.map((item, index) => (
          <Octicons
            key={index}
            name={item <= total_likes ? "star-fill" : "star"}
            color={COLORS.primary}
            size={24}
          />
        ))}

        <Text
          style={{ fontFamily: "bold", color: COLORS.primary, fontSize: 16 }}
        >
          ({total_likes})
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={{ fontFamily: "bold", color: COLORS.black, fontSize: 16 }}>
          Rp 132.000
        </Text>
        <Text
          style={{ fontFamily: "regular", color: COLORS.black, fontSize: 14 }}
        >
          - Per Session
        </Text>
      </View>
    </View>
  );
};

export default StylistCard;

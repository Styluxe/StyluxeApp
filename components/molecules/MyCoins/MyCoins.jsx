import { Button } from "@gluestack-ui/themed";
import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS } from "../../../constants";

const MyCoins = () => {
  const coin_repeater = [
    {
      id: 1,
      title: "Today",
      value: 50,
    },
    {
      id: 2,
      title: "Day 2",
      value: 50,
    },
    {
      id: 3,
      title: "Day 3",
      value: 100,
    },
    {
      id: 4,
      title: "Day 4",
      value: 100,
    },
    {
      id: 5,
      title: "Day 5",
      value: 150,
    },
    {
      id: 6,
      title: "Day 6",
      value: 50,
    },
    {
      id: 7,
      title: "Day 7",
      value: 300,
    },
  ];
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: COLORS.white,
      }}
    >
      <View>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "bold", fontSize: 14 }}>Your Point</Text>

          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              <Text style={{ fontFamily: "bold" }}>0</Text> pts
            </Text>

            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: COLORS.lightGray,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 15, resizeMode: "contain" }}
                source={require("../../../assets/content/coin.png")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {coin_repeater.map((item, index) => (
            <View key={index} style={{ alignItems: "center", gap: 2 }}>
              <View
                style={{
                  borderRadius: 5,
                  padding: 10,
                  gap: 5,
                  backgroundColor: COLORS.lightGray,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "semibold", fontSize: 12 }}>
                  +{item.value}
                </Text>
                <Image
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                  source={require("../../../assets/content/coin.png")}
                  alt="coin"
                />
              </View>
              <Text style={{ fontFamily: "semibold", fontSize: 12 }}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 5 }}>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 12,
            color: COLORS.darkGray,
            textAlign: "center",
          }}
        >
          Check in the next 7 days to earn up to 300 coins
        </Text>

        <Button size="xs" bgColor={COLORS.primary} borderRadius={20}>
          <Text style={{ color: COLORS.white, fontFamily: "medium" }}>
            Check in to get coins
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default MyCoins;

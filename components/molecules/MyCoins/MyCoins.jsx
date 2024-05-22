import { Button, Spinner } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image } from "react-native";

import { useClaimCoinApi, useGetUserCoinsApi } from "../../../API/ProfileApi";
import { COLORS } from "../../../constants";

const MyCoins = () => {
  const [lastClaimDate, setLastClaimDate] = useState(null);
  const [points, setPoints] = useState(0);
  const [claimDay, setClaimDay] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { getUserCoins, data, code, setCode, loading } = useGetUserCoinsApi();
  const {
    claimCoin,
    code: claimCode,
    setCode: setClaimCode,
  } = useClaimCoinApi();

  const checkingCoints = [
    { id: 1, title: "Day 1", value: 50 },
    { id: 2, title: "Day 2", value: 50 },
    { id: 3, title: "Day 3", value: 100 },
    { id: 4, title: "Day 4", value: 100 },
    { id: 5, title: "Day 5", value: 150 },
    { id: 6, title: "Day 6", value: 50 },
    { id: 7, title: "Day 7", value: 300 },
  ];

  useFocusEffect(
    useCallback(() => {
      getUserCoins();
    }, []),
  );

  const differenceDays = moment().diff(moment(lastClaimDate), "days");

  useEffect(() => {
    if (code === 200 && data) {
      const { last_claim_date, coin_amount, claim_day } = data;

      setLastClaimDate(last_claim_date);
      setPoints(coin_amount);
      setClaimDay(claim_day);

      // Check if the last claim date is today and disable the button if true
      setButtonDisabled(moment().isSame(moment(last_claim_date), "day"));

      setCode(null);
    }
  }, [code, data]);

  console.log("check", checkingCoints[1].value + points);

  const handleClaim = async () => {
    if (!buttonDisabled) {
      // Add points based on current day

      if (claimDay === "day 1" && differenceDays === 1) {
        const newPoints = points + checkingCoints[1].value;
        await claimCoin(newPoints, moment().toISOString(), "day 2");
        setButtonDisabled(true);
      } else if (claimDay === "day 2" && differenceDays === 1) {
        const newPoints = points + checkingCoints[2].value;
        await claimCoin(newPoints, moment().toISOString(), "day 3");
        setButtonDisabled(true);
      } else if (claimDay === "day 3" && differenceDays === 1) {
        const newPoints = points + checkingCoints[3].value;
        await claimCoin(newPoints, moment().toISOString(), "day 4");
        setButtonDisabled(true);
      } else if (claimDay === "day 4" && differenceDays === 1) {
        const newPoints = points + checkingCoints[4].value;
        await claimCoin(newPoints, moment().toISOString(), "day 5");
        setButtonDisabled(true);
      } else if (claimDay === "day 5" && differenceDays === 1) {
        const newPoints = points + checkingCoints[5].value;
        await claimCoin(newPoints, moment().toISOString(), "day 6");
        setButtonDisabled(true);
      } else if (claimDay === "day 6" && differenceDays === 1) {
        const newPoints = points + checkingCoints[6].value;
        await claimCoin(newPoints, moment().toISOString(), "day 7");
        setButtonDisabled(true);
      } else if (claimDay === "day 7" && differenceDays === 1) {
        const newPoints = points + checkingCoints[0].value;
        await claimCoin(newPoints, moment().toISOString(), "day 1");
        setButtonDisabled(true);
      } else {
        const newPoints = points + checkingCoints[0].value;
        await claimCoin(newPoints, moment().toISOString(), "day 1");
        setButtonDisabled(true);
      }
    }
  };

  useEffect(() => {
    if (claimCode === 201) {
      getUserCoins();
      setClaimCode(null);
    }
  }, [claimCode]);

  if (loading) {
    return (
      <View>
        <Spinner color={COLORS.primary} />
      </View>
    );
  }

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
          <Text style={{ fontFamily: "bold", fontSize: 14 }}>
            Your Styluxe Coins
          </Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text style={{ fontFamily: "medium", fontSize: 14 }}>
              <Text style={{ fontFamily: "bold" }}>{points || 0}</Text> pts
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
          {checkingCoints.map((item, index) => {
            const [_, number] = claimDay?.split(" ");

            const isClaimable = number ? item.id === parseInt(number, 10) : 0;
            const isClaimed = item.id < parseInt(number, 10) + 1;
            return (
              <View key={index} style={{ alignItems: "center", gap: 2 }}>
                <View
                  style={{
                    borderRadius: 5,
                    padding: 10,
                    gap: 5,
                    backgroundColor: COLORS.lightGray,
                    alignItems: "center",
                    borderWidth: isClaimable ? 2 : 1,
                    borderColor: isClaimable
                      ? COLORS.primary
                      : isClaimed
                        ? COLORS.secondary
                        : COLORS.gray2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "semibold",
                      fontSize: 12,
                      color: isClaimable
                        ? COLORS.primary
                        : isClaimed
                          ? COLORS.secondary
                          : COLORS.black,
                    }}
                  >
                    +{item.value}
                  </Text>
                  <Image
                    style={{ width: 20, height: 20, resizeMode: "contain" }}
                    source={require("../../../assets/content/coin.png")}
                    alt="coin"
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "semibold",
                    fontSize: 12,
                    color: isClaimable
                      ? COLORS.primary
                      : isClaimed
                        ? COLORS.secondary
                        : COLORS.black,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            );
          })}
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
        <Button
          size="xs"
          bgColor={buttonDisabled ? COLORS.gray2 : COLORS.primary}
          disabled={buttonDisabled}
          onPress={handleClaim}
        >
          <Text style={{ color: COLORS.white, fontFamily: "medium" }}>
            Check in to get coins
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default MyCoins;

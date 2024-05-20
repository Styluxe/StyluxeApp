import { Button } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";
import { formatTimeWithAMPM } from "../../../hook/hook";
import { StarRating } from "../StarRating";

const BookingCard = ({ data, handleAccept, handleReject }) => {
  const navigation = useNavigation();

  const fullDate = `${data?.booking_date}T${data?.booking_time}:00+07:00`;

  const endDate = moment(fullDate).add(30, "m").toISOString();

  const endTime = moment(endDate).format("HH:mm");

  const isAccepted = data?.status === "accepted";
  const isScheduled = data?.status === "scheduled";
  const past = data?.status === "done";

  const [timeFromNow, setTimeFromNow] = useState(moment(fullDate).fromNow());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeFromNow(moment(fullDate).fromNow());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [fullDate]);

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.gray2,
        padding: 15,
        gap: 5,
        backgroundColor: COLORS.white,
      }}
    >
      <Text style={{ fontFamily: "semibold", fontSize: 16 }}>
        Order No: {data?.booking_number}
      </Text>

      <View>
        <Text
          style={{ fontFamily: "medium", fontSize: 14, color: COLORS.darkGray }}
        >
          Order Date: {moment(fullDate).format("DD MMM YYYY")}
        </Text>
        <Text
          style={{ fontFamily: "medium", fontSize: 14, color: COLORS.darkGray }}
        >
          Order Time: {formatTimeWithAMPM(data?.booking_time)} -{" "}
          {formatTimeWithAMPM(endTime)}
        </Text>
      </View>

      <Text style={{ fontFamily: "semibold", fontSize: 16 }}>
        {data?.customer?.first_name + " " + data?.customer?.last_name}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ fontFamily: "medium", fontSize: 14, color: COLORS.darkGray }}
        >
          Session: 30 Minutes
        </Text>

        <Text style={{ fontFamily: "medium", fontSize: 14 }}>
          Rp {parseFloat(data?.stylist?.price).toLocaleString("id-ID")}
        </Text>
      </View>

      {past ? (
        <StarRating />
      ) : isAccepted ? (
        <Button disabled bgColor={COLORS.secondary}>
          <Text style={{ fontFamily: "semibold", color: COLORS.offwhite }}>
            Chat will be open in {timeFromNow}
          </Text>
        </Button>
      ) : isScheduled ? (
        <Button
          bgColor={COLORS.primary}
          onPress={() => {
            navigation.navigate("ChatRoom", { booking_id: data?.booking_id });
          }}
        >
          <Text style={{ fontFamily: "semibold", color: COLORS.white }}>
            Open Chat with customer
          </Text>
        </Button>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Button
            onPress={handleReject}
            variant="outline"
            borderColor={COLORS.primary}
            flex={1}
          >
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 18,
                color: COLORS.primary,
              }}
            >
              Reject
            </Text>
          </Button>
          <Button
            onPress={handleAccept}
            flex={1}
            variant="solid"
            bgColor={COLORS.primary}
          >
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 18,
                color: COLORS.white,
              }}
            >
              Accept
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default BookingCard;

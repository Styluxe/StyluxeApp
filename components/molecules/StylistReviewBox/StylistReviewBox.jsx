import React from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";
import { StarRating } from "../StarRating";
import moment from "moment";

const StylistReviewBox = ({ fullName, rating, content, date }) => {
  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray2,
      }}
    >
      <View style={{ gap: 5 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "semibold" }}>{fullName}</Text>
          <StarRating total_likes={rating} fontSize={14} iconSize={20} />
        </View>
        <Text style={{ fontFamily: "medium", color: COLORS.darkGray }}>
          {moment(date).fromNow()}
        </Text>
        <Text style={{ fontFamily: "regular" }}>{content}</Text>
      </View>
    </View>
  );
};

export default StylistReviewBox;

import { Avatar, AvatarImage } from "@gluestack-ui/themed";
import moment from "moment";
import React from "react";
import { View, Text } from "react-native";

import { styles } from "./ReviewBox.style";
import { StarRating } from "../StarRating";

const ReviewBox = ({ name, rating, comment, created_at, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar_container}>
        <Avatar size="sm">
          <AvatarImage
            source={
              !image
                ? require("../../../assets/content/profpic.png")
                : { uri: image }
            }
            alt="profpic"
          />
        </Avatar>

        <Text style={styles.username}>{name}</Text>
      </View>
      <View style={styles.rating_container}>
        <StarRating iconSize={16} fontSize={14} total_likes={rating} />

        <Text style={styles.day_text}>{moment(created_at).fromNow()}</Text>
      </View>
      <Text style={styles.content}>{comment}</Text>
    </View>
  );
};

export default ReviewBox;

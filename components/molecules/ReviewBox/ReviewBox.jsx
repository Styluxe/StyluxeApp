import { Avatar, AvatarImage } from "@gluestack-ui/themed";
import React from "react";
import { View, Text } from "react-native";

import { styles } from "./ReviewBox.style";
import { StarRating } from "../StarRating";

const ReviewBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar_container}>
        <Avatar size="sm">
          <AvatarImage
            source={require("../../../assets/content/profpic.png")}
            alt="profpic"
          />
        </Avatar>

        <Text style={styles.username}>Jamet</Text>
      </View>
      <View style={styles.rating_container}>
        <StarRating iconSize={16} fontSize={14} />

        <Text style={styles.day_text}>2 Days ago</Text>
      </View>
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Eum laudantium ipsum
        maiores iusto est voluptates consequatur nobis obcaecati quas eaque
        expedita vitae sequi unde et, tenetur voluptatibus asperiores! Quis,
        voluptatum!
      </Text>
    </View>
  );
};

export default ReviewBox;

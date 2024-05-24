import React from "react";
import { Image, Text, View } from "react-native";

import { styles } from "./DiscussionCommentCard.style";
import moment from "moment";

const DiscussionCommentCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile_container}>
        <Image
          source={
            data?.user?.profile_picture
              ? { uri: data?.user?.profile_picture }
              : require("../../../../assets/content/profpic.png")
          }
          style={styles.profile_image}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.profile_name}>
            {data?.user?.first_name + " " + data?.user?.last_name}
          </Text>
          <Text style={styles.upload_time}>
            {moment(data?.createdAt).fromNow()}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.comment}>{data?.content}</Text>
      </View>
    </View>
  );
};

export default DiscussionCommentCard;

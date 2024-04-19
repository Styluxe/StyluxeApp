import { Image, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../constants";
import { styles } from "./DiscussionCommentCard.style";

const DiscussionCommentCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile_container}>
        <Image
          source={require("../../../../assets/content/profpic.png")}
          style={styles.profile_image}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.profile_name}>john Doe</Text>
          <Text style={styles.upload_time}>1h ago</Text>
        </View>
      </View>
      <View>
        <Text style={styles.comment}>Mantap Banget Infonya Brok</Text>
      </View>
    </View>
  );
};

export default DiscussionCommentCard;

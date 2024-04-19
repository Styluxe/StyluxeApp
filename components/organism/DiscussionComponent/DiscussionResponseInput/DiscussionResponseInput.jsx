import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./DiscussionResponseInput.style";

const DiscussionResponseInput = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.counter_container}>
        <Text style={styles.counter_text}>Response</Text>
        <View style={styles.number_container}>
          <Text style={styles.number_text}>{data.comments.length}</Text>
        </View>
      </View>
      <View style={styles.input_container}>
        <View style={styles.profile_container}>
          <Image
            source={require("../../../../assets/content/profpic.png")}
            style={styles.profile_image}
          />
          <Text style={styles.profile_name}>john Doe</Text>
        </View>
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{ padding: 5 }}
          placeholder="Write a comment"
        />
        <View>
          <TouchableOpacity style={styles.comment_btn}>
            <Text style={styles.btn_text}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DiscussionResponseInput;

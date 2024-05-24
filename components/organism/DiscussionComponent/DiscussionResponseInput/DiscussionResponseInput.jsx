import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { styles } from "./DiscussionResponseInput.style";
import { userDataState } from "../../../../redux/slice/app.slice";

const DiscussionResponseInput = ({
  length,
  comment,
  setComment,
  onComment,
}) => {
  const useProfile = useSelector(userDataState);
  return (
    <View style={styles.container}>
      <View style={styles.counter_container}>
        <Text style={styles.counter_text}>Response</Text>
        <View style={styles.number_container}>
          <Text style={styles.number_text}>{length}</Text>
        </View>
      </View>
      <View style={styles.input_container}>
        <View style={styles.profile_container}>
          <Image
            source={
              useProfile.profile_picture
                ? { uri: useProfile.profile_picture }
                : require("../../../../assets/content/profpic.png")
            }
            style={styles.profile_image}
          />
          <Text style={styles.profile_name}>
            {useProfile.first_name + " " + useProfile.last_name}
          </Text>
        </View>
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{ padding: 5, fontFamily: "regular", fontSize: 14 }}
          placeholder="Write a comment"
          onChangeText={(text) => setComment(text)}
          value={comment}
        />
        <View>
          <TouchableOpacity
            disabled={!comment}
            onPress={onComment}
            style={!comment ? styles.comment_btn_disabled : styles.comment_btn}
          >
            <Text style={styles.btn_text}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DiscussionResponseInput;

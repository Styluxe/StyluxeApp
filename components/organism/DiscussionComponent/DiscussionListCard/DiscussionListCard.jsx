import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "./DiscussionListCard.style";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSelectedDiscussion } from "../../../../redux/slice/discussion.slice";

const DiscussionListCard = ({ postData }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onTouchCard = () => {
    navigation.navigate("DiscussionDetails");
    dispatch(setSelectedDiscussion(postData));
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onTouchCard}>
      <View style={styles.container}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {postData.title}
        </Text>
        <View style={styles.userContainer}>
          <Image
            source={require("../../../../assets/content/profpic.png")}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text style={styles.name}>{postData.author.first_name}</Text>
                <Text style={styles.mail}>{postData.author.email}</Text>
              </View>
              <Text style={styles.time}>
                {moment(postData.created_at).fromNow()}
              </Text>
            </View>
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{postData.category}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>{postData.content}</Text>
          {postData.images.length === 1 ? (
            <TouchableOpacity style={{ flex: 1, maxHeight: 200 }}>
              <Image
                source={{ uri: postData.images[0] }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          ) : (
            <FlatList
              data={postData.images}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flex: 1, maxHeight: 200, padding: 2 }}
                >
                  <Image
                    source={{ uri: item }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <TouchableOpacity>
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("DiscussionDetails")}
            >
              <View style={styles.commentContainer}>
                <Ionicons name="chatbubble" size={18} color={COLORS.primary} />
                <Text style={styles.commentText}>
                  add comment ({postData.comments.length})
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View style={styles.footerRight}>
              <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
              <Text style={styles.likes}>{postData.reactions.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscussionListCard;

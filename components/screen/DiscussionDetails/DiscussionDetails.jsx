import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants";
import styles from "./DiscussionDetails.style";
import { useSelector } from "react-redux";
import { selectedDiscussionState } from "../../../redux/slice/discussion.slice";
import moment from "moment";
import { DiscussionCommentCard, DiscussionResponseInput } from "../../organism";
import { SafeAreaView } from "react-native-safe-area-context";

const DiscussionDetails = () => {
  const navigation = useNavigation();
  const selectedDiscussion = useSelector(selectedDiscussionState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPressIn={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
      </View>
      <FlatList
        data={["post"]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            <View style={styles.container}>
              <View
                style={{
                  borderBottomColor: COLORS.gray2,
                  borderBottomWidth: 3,
                  paddingBottom: 30,
                }}
              >
                <View style={styles.userContainer}>
                  <Image
                    source={require("../../../assets/content/profpic.png")}
                    style={styles.profileImage}
                  />
                  <View style={styles.userInfo}>
                    <View style={styles.nameContainer}>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.name}>
                          {selectedDiscussion.author.first_name}
                        </Text>
                        <Text style={styles.mail}>
                          {selectedDiscussion.author.email}
                        </Text>
                      </View>
                      <Text style={styles.time}>
                        {moment(selectedDiscussion.created_at).format(
                          "DD/MM/YYYY"
                        )}{" "}
                        •{" "}
                        {moment(selectedDiscussion.created_at).format(
                          "HH:mm a"
                        )}
                      </Text>
                    </View>
                    <View style={styles.tagContainer}>
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>
                          {selectedDiscussion.category}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  {selectedDiscussion.title}
                </Text>
                <View style={styles.content}>
                  <Text style={styles.contentText}>
                    {selectedDiscussion.content}
                  </Text>
                  {selectedDiscussion.images.length === 1 ? (
                    <TouchableOpacity style={{ flex: 1, maxHeight: 200 }}>
                      <Image
                        source={{ uri: selectedDiscussion.images[0] }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <FlatList
                      data={selectedDiscussion.images}
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
                  </View>
                  <TouchableOpacity>
                    <View style={styles.footerRight}>
                      <Ionicons
                        name="heart-outline"
                        size={24}
                        color={COLORS.primary}
                      />
                      <Text style={styles.likes}>
                        {selectedDiscussion.reactions.length}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <DiscussionResponseInput data={selectedDiscussion} />
              <FlatList
                data={selectedDiscussion.comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <DiscussionCommentCard />}
              />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default DiscussionDetails;

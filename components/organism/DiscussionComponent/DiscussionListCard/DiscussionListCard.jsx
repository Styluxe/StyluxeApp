import { Ionicons } from "@expo/vector-icons";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DiscussionListCard.style";
import {
  useAddToBookmarkApi,
  useReactDiscussionApi,
} from "../../../../API/DiscussionApi";
import { COLORS } from "../../../../constants";
import {
  setLoginModalOpen,
  userDataState,
} from "../../../../redux/slice/app.slice";
import { ConfirmationModal, ImageModal } from "../../../molecules";

const DiscussionListCard = ({ postData, onPressDelete }) => {
  const navigation = useNavigation();
  const { reactDiscussion } = useReactDiscussionApi();
  const { addToBookmark } = useAddToBookmarkApi();
  const userData = useSelector(userDataState);

  const initialLikeState = postData.reactions?.some(
    (reaction) => reaction.user_id === userData?.user_id,
  );

  const initialBookmarkState = postData.bookmarks?.some(
    (bookmark) => bookmark.user_id === userData?.user_id,
  );

  const [like, setLike] = useState(initialLikeState);
  const [likeCounter, setLikeCounter] = useState(null);
  const [bookmark, setBookmark] = useState(initialBookmarkState);
  const dispatch = useDispatch();
  const [openSheet, setOpenSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setLike(initialLikeState);
    setLikeCounter(postData.reactions.length);
    setBookmark(initialBookmarkState);
  }, [initialLikeState]);

  const onTouchCard = () => {
    navigation.navigate("DiscussionDetails", {
      post_id: postData.post_id,
    });
  };

  const onLike = async () => {
    try {
      if (!userData) {
        dispatch(setLoginModalOpen(true));
        return;
      }

      await reactDiscussion(postData.post_id);
      if (like) {
        setLike(false);
        setLikeCounter(likeCounter - 1);
      } else {
        setLike(true);
        setLikeCounter(likeCounter + 1);
      }
    } catch (error) {
      console.error("Failed to like/unlike the post:", error);
    }
  };

  const onComment = async () => {
    try {
      if (!userData) {
        dispatch(setLoginModalOpen(true));
        return;
      }
      navigation.navigate("DiscussionDetails", {
        post_id: postData.post_id,
      });
    } catch (error) {
      console.error("Failed to comment on the post:", error);
    }
  };

  const onBookmark = async () => {
    if (!userData) {
      dispatch(setLoginModalOpen(true));
      return;
    }
    try {
      await addToBookmark(postData.post_id);
      if (bookmark) {
        setBookmark(false);
      } else {
        setBookmark(true);
      }
    } catch (error) {
      console.error("Failed to bookmark/unbookmark the post:", error);
    }
  };

  const myPost = () => {
    if (postData.author?.user_id === userData?.user_id) {
      return true;
    }
    return false;
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onTouchCard}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {postData.title}
          </Text>
          {myPost() && (
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              onPress={() => setOpenSheet(true)}
              color={COLORS.black}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DiscussionAuthor", {
              author_id: postData.author?.user_id,
            })
          }
          activeOpacity={0.8}
          style={styles.userContainer}
        >
          <Image
            source={
              postData.author?.profile_picture
                ? { uri: postData.author?.profile_picture }
                : require("../../../../assets/content/profpic.png")
            }
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text style={styles.name}>{postData.author?.first_name}</Text>
                <Text style={styles.mail}>{postData.author?.email}</Text>
              </View>
              <Text style={styles.time}>
                {moment(postData.createdAt).fromNow()}
              </Text>
            </View>
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {postData.category.category_name}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.contentText}>{postData.content}</Text>
          {postData.images?.length === 1 ? (
            <TouchableOpacity
              style={{ flex: 1, maxHeight: 400 }}
              onPress={() => {
                setSelectedImage(postData.images[0].image_uri);
                setShowImage(true);
              }}
            >
              <Image
                source={{ uri: postData.images[0].image_uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <FlatList
              data={postData.images}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flex: 1, maxHeight: 200, padding: 2 }}
                  onPress={() => {
                    setSelectedImage(item.image_uri);
                    setShowImage(true);
                  }}
                >
                  <Image
                    source={{ uri: item.image_uri }}
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
                name={bookmark ? "bookmark" : "bookmark-outline"}
                size={24}
                color={COLORS.primary}
                onPress={onBookmark}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onComment}>
              <View style={styles.commentContainer}>
                <Ionicons name="chatbubble" size={18} color={COLORS.primary} />
                <Text style={styles.commentText}>
                  add comment ({postData.comments?.length})
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onLike}>
            <View style={styles.footerRight}>
              <Ionicons
                name={like ? "heart" : "heart-outline"}
                size={24}
                color={like ? "red" : COLORS.primary}
              />
              <Text style={styles.likes}>{likeCounter}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Actionsheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(null)}
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetItem
            onPress={() => {
              navigation.navigate("CreateDiscussion", { edit_data: postData });
              setOpenSheet(false);
            }}
          >
            <ActionsheetItemText
              style={{ fontFamily: "medium", color: COLORS.primary }}
            >
              Edit Discussion
            </ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => {
              setOpenSheet(false);
              setShowModal(postData.post_id);
            }}
          >
            <ActionsheetItemText style={{ fontFamily: "medium", color: "red" }}>
              Delete Discussion
            </ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      <ConfirmationModal
        showModal={showModal === postData.post_id}
        setShowModal={setShowModal}
        modalRef={modalRef}
        btnPositiveColor="red"
        header_color="red"
        title="Delete Discussion"
        content="Are you sure want to delete this discussion? You can't undo this action"
        btnPositiveText="Delete"
        btnNegativeText="Cancel"
        handlePositive={onPressDelete}
      />

      <ImageModal
        image_url={selectedImage}
        showModal={showImage}
        modalRef={modalRef}
        setShowModal={setShowImage}
      />
    </TouchableOpacity>
  );
};

export default DiscussionListCard;

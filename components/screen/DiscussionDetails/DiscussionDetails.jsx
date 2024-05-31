import { Ionicons } from "@expo/vector-icons";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DiscussionDetails.style";
import {
  useAddToBookmarkApi,
  useCommentDiscussionApi,
  useDeleteDiscussionApi,
  useGetPostByIdApi,
  useReactDiscussionApi,
} from "../../../API/DiscussionApi";
import { COLORS } from "../../../constants";
import {
  setLoginModalOpen,
  userDataState,
} from "../../../redux/slice/app.slice";
import { ConfirmationModal, ImageModal } from "../../molecules";
import { DiscussionCommentCard, DiscussionResponseInput } from "../../organism";

const DiscussionDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { post_id } = route.params;
  const { getPostById, responseData: post } = useGetPostByIdApi();
  const { reactDiscussion } = useReactDiscussionApi();
  const { commentDiscussion, code, setCode } = useCommentDiscussionApi();
  const { addToBookmark } = useAddToBookmarkApi();
  const userData = useSelector(userDataState);
  const [openSheet, setOpenSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [like, setLike] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [bookmark, setBookmark] = useState(false);

  const {
    deleteDiscussion,
    code: deleteCode,
    setCode: setDeleteCode,
  } = useDeleteDiscussionApi();

  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      getPostById(post_id);
    }, [post_id]),
  );

  useEffect(() => {
    if (deleteCode === 200) {
      navigation.goBack();
      toast.show({
        title: "Success",
        description: "Discussion deleted successfully",
        status: "success",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Discussion deleted successfully</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setDeleteCode(null);
    }
  }, [deleteCode]);

  useEffect(() => {
    if (post) {
      const initialLikeState = post.reactions.some(
        (reaction) => reaction?.user_id === userData?.user_id,
      );

      const initialBookmarkState = post.bookmarks.some(
        (bookmark) => bookmark?.user_id === userData?.user_id,
      );

      setLike(initialLikeState);
      setBookmark(initialBookmarkState);
      setLikeCounter(post.reactions.length);
    }
  }, [post, userData?.user_id]);

  const onLike = async () => {
    try {
      if (!userData) {
        dispatch(setLoginModalOpen(true));
        return;
      }

      await reactDiscussion(post?.post_id);
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

  const handleComment = () => {
    if (comment) {
      commentDiscussion(post?.post_id, comment);
      setComment("");
    }
  };

  useEffect(() => {
    if (code === 201) {
      getPostById(post_id);
      setCode(null);
    }
  }, [code]);

  const onBookmark = async () => {
    if (!userData) {
      dispatch(setLoginModalOpen(true));
      return;
    }

    try {
      await addToBookmark(post.post_id);
      if (bookmark) {
        setBookmark(false);
      } else {
        setBookmark(true);
      }
    } catch (error) {
      console.error("Failed to bookmark/unbookmark the post:", error);
    }
  };

  const sort_data = (data) => {
    return data?.sort((a, b) => {
      return new Date(b?.createdAt) - new Date(a?.createdAt);
    });
  };

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
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("DiscussionAuthor", {
                      author_id: post?.author?.user_id,
                    });
                  }}
                  style={styles.userContainer}
                >
                  <Image
                    source={
                      post?.author?.profile_picture
                        ? { uri: post?.author?.profile_picture }
                        : require("../../../assets/content/profpic.png")
                    }
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
                          {post?.author.first_name}
                        </Text>
                        <Text style={styles.mail}>{post?.author.email}</Text>
                      </View>
                      <Text style={styles.time}>
                        {moment(post?.createdAt).format("DD/MM/YYYY")} •{" "}
                        {moment(post?.createdAt).format("HH:mm a")}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.tagContainer}>
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>
                            {post?.category?.category_name}
                          </Text>
                        </View>
                      </View>

                      <Ionicons
                        name="ellipsis-vertical"
                        size={28}
                        color={COLORS.black}
                        onPress={() => setOpenSheet(true)}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  {post?.title}
                </Text>
                <View style={styles.content}>
                  <Text style={styles.contentText}>{post?.content}</Text>
                  {post?.images?.length === 1 ? (
                    <TouchableOpacity
                      style={{ flex: 1, maxHeight: 400 }}
                      onPress={() => {
                        setSelectedImage(post?.images[0].image_uri);
                        setShowImage(true);
                      }}
                    >
                      <Image
                        source={{ uri: post?.images[0].image_uri }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <FlatList
                      data={post?.images}
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
              {userData && (
                <DiscussionResponseInput
                  data={post}
                  length={post?.comments.length}
                  comment={comment}
                  setComment={setComment}
                  onComment={handleComment}
                />
              )}
              <FlatList
                data={sort_data(post?.comments)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <DiscussionCommentCard key={item.comment_id} data={item} />
                )}
              />
            </View>
          </>
        )}
      />

      <Actionsheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(null)}
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetItem
            onPress={() => {
              navigation.navigate("CreateDiscussion", { edit_data: post });
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
              setShowModal(post_id);
            }}
          >
            <ActionsheetItemText style={{ fontFamily: "medium", color: "red" }}>
              Delete Discussion
            </ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      <ConfirmationModal
        showModal={showModal === post_id}
        setShowModal={setShowModal}
        modalRef={modalRef}
        btnPositiveColor="red"
        header_color="red"
        title="Delete Discussion"
        content="Are you sure want to delete this discussion? You can't undo this action"
        btnPositiveText="Delete"
        btnNegativeText="Cancel"
        handlePositive={() => {
          deleteDiscussion(post_id);
        }}
      />

      <ImageModal
        image_url={selectedImage}
        showModal={showImage}
        modalRef={modalRef}
        setShowModal={setShowImage}
      />
    </SafeAreaView>
  );
};

export default DiscussionDetails;

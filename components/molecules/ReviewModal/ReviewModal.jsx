import { Ionicons } from "@expo/vector-icons";
import {
  ButtonText,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { View, Text, TextInput } from "react-native";

import { COLORS } from "../../../constants";

const ReviewModal = ({
  showModal,
  setShowModal,
  modalRef,
  handlePost,
  reviewData,
  setReviewData,
}) => {
  const star = [1, 2, 3, 4, 5];

  const handleClose = () => {
    setShowModal(false);
    setReviewData({ rating: 0, feedback: "" });
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={handleClose}
      finalFocusRef={modalRef}
      closeOnOverlayClick={false}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading
            size="lg"
            style={{ color: COLORS.primary, fontFamily: "bold" }}
          >
            Stylist Review
          </Heading>
        </ModalHeader>
        <ModalBody>
          <VStack gap={5}>
            <Text style={{ color: COLORS.darkGray, fontFamily: "medium" }}>
              Please write a review for your stylist
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {star.map((item) => (
                <Ionicons
                  onPress={() => setReviewData({ ...reviewData, rating: item })}
                  style={{
                    color:
                      reviewData.rating >= item ? "orange" : COLORS.darkGray,
                  }}
                  key={item}
                  name={reviewData.rating >= item ? "star" : "star-outline"}
                  size={24}
                  color="orange"
                />
              ))}
            </View>
            <TextInput
              multiline
              numberOfLines={5}
              value={reviewData.feedback}
              onChangeText={(text) =>
                setReviewData({ ...reviewData, feedback: text })
              }
              style={{
                borderWidth: 1,
                borderColor: COLORS.gray2,
                borderRadius: 5,
                padding: 5,
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.darkGray,
                textAlignVertical: "top",
                marginTop: 10,
              }}
              placeholder="Write a review"
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={handleClose}
          >
            <ButtonText style={{ color: COLORS.primary, fontFamily: "medium" }}>
              Cancel
            </ButtonText>
          </Button>
          <Button
            size="sm"
            bgColor={
              reviewData.rating === 0 || reviewData.feedback === ""
                ? COLORS.secondary
                : COLORS.primary
            }
            borderWidth="$0"
            onPress={handlePost}
            disabled={reviewData.rating === 0 || reviewData.feedback === ""}
          >
            <ButtonText style={{ color: COLORS.white, fontFamily: "medium" }}>
              Review
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;

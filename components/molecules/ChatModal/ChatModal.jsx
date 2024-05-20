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
} from "@gluestack-ui/themed";
import React from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";

const ChatModal = ({ showModal, setShowModal, modalRef, handleEnd }) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      finalFocusRef={modalRef}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" style={{ color: COLORS.red, fontFamily: "bold" }}>
            End this Chat
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text style={{ color: COLORS.darkGray, fontFamily: "medium" }}>
            Are you sure you want to end this chat? you will leave the chat
            after this
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              setShowModal(false);
            }}
          >
            <ButtonText style={{ color: COLORS.primary, fontFamily: "medium" }}>
              Cancel
            </ButtonText>
          </Button>
          <Button
            size="sm"
            action="negative"
            borderWidth="$0"
            onPress={handleEnd}
          >
            <ButtonText style={{ color: COLORS.white, fontFamily: "medium" }}>
              End now
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChatModal;

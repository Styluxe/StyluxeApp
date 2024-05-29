import {
  Button,
  Heading,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal,
  ButtonText,
} from "@gluestack-ui/themed";
import React from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  modalRef,
  handlePositive,
}) => {
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
              No
            </ButtonText>
          </Button>
          <Button
            size="sm"
            action="negative"
            borderWidth="$0"
            onPress={handlePositive}
          >
            <ButtonText style={{ color: COLORS.white, fontFamily: "medium" }}>
              Yes
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;

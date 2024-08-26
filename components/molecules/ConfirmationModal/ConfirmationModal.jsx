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
  title = "Confirmation",
  content = "Are you sure you want to proceed?",
  header_color = COLORS.primary,
  btnPositiveText = "Yes",
  btnNegativeText = "No",
  btnNegativeColor = COLORS.primary,
  btnPositiveColor = COLORS.primary,
  btnPositiveTextColor = COLORS.white,
  btnNegativeTextColor = COLORS.white,
  disabled = false,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(null);
      }}
      finalFocusRef={modalRef}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading
            size="lg"
            style={{ color: header_color, fontFamily: "bold" }}
          >
            {title}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text style={{ color: COLORS.darkGray, fontFamily: "medium" }}>
            {content}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              setShowModal(null);
            }}
          >
            <ButtonText
              style={{ color: btnNegativeColor, fontFamily: "medium" }}
            >
              {btnNegativeText}
            </ButtonText>
          </Button>
          <Button
            size="sm"
            bgColor={btnPositiveColor}
            borderWidth="$0"
            onPress={handlePositive}
            disabled={disabled}
          >
            <ButtonText
              style={{ color: btnPositiveTextColor, fontFamily: "medium" }}
            >
              {btnPositiveText}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;

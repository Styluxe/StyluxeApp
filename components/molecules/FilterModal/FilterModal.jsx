import { Ionicons } from "@expo/vector-icons";
import {
  ButtonText,
  Heading,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Modal,
  ModalCloseButton,
} from "@gluestack-ui/themed";
import React from "react";

import { COLORS } from "../../../constants";
import { FilterAccordion } from "../FilterAccordion";

const FilterModal = ({
  showModal,
  setShowModal,
  modalRef,
  handleApply,
  selectedSize,
  setSelectedSize,
  selectedSort,
  setSelectedSort,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      finalFocusRef={modalRef}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading
            size="lg"
            style={{ color: COLORS.black, fontFamily: "bold" }}
          >
            Filters
          </Heading>
          <ModalCloseButton>
            <Ionicons name="close" size={24} onPress={() => {}} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <FilterAccordion
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
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
            borderColor={COLORS.primary}
          >
            <ButtonText style={{ color: COLORS.primary, fontFamily: "medium" }}>
              Cancel
            </ButtonText>
          </Button>
          <Button
            size="sm"
            borderWidth="$0"
            bgColor={COLORS.primary}
            onPress={handleApply}
          >
            <ButtonText style={{ color: COLORS.white, fontFamily: "medium" }}>
              Apply
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;

import { Ionicons } from "@expo/vector-icons";
import { Modal, ModalBackdrop, ModalContent } from "@gluestack-ui/themed";
import React from "react";
import { View, Text, Image } from "react-native";

const ImageModal = ({ showModal, setShowModal, modalRef, image_url }) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      finalFocusRef={modalRef}
    >
      <ModalBackdrop />
      <ModalContent h="60%" width="90%" style={{ backgroundColor: "black" }}>
        <View style={{ backgroundColor: "black", flex: 1 }}>
          <Image
            source={{ uri: image_url }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <Ionicons
          name="close"
          size={32}
          color="white"
          onPress={() => setShowModal(false)}
          style={{ position: "absolute", top: 10, right: 10 }}
        />
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;

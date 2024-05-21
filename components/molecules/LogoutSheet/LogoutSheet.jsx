import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonText,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { View, Text } from "react-native";

import { COLORS } from "../../../constants";

const LogoutSheet = ({ showBottomSheet, setShowBottomSheet, handleLogout }) => {
  return (
    <Actionsheet
      isOpen={showBottomSheet}
      onClose={() => {
        setShowBottomSheet(false);
        alert("close");
      }}
      zIndex={999}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack justifyContent="center" paddingVertical={5} width="$full">
          <View
            style={{
              borderBottomWidth: 1,
              alignItems: "center",
              borderColor: COLORS.gray2,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "semibold" }}>
              Log Out
            </Text>
          </View>
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "medium",
                color: COLORS.darkGray,
              }}
            >
              Are you sure you want to log out?
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              borderRadius={20}
              variant="outline"
              borderColor={COLORS.primary}
              flex={1}
              onPress={() => setShowBottomSheet(false)}
            >
              <ButtonText
                style={{ color: COLORS.primary, fontFamily: "medium" }}
              >
                Cancel
              </ButtonText>
            </Button>
            <Button
              borderRadius={20}
              variant="primary"
              backgroundColor={COLORS.primary}
              flex={1}
              onPress={handleLogout}
            >
              <ButtonText style={{ color: COLORS.white, fontFamily: "medium" }}>
                Yes, Log Out
              </ButtonText>
            </Button>
          </View>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default LogoutSheet;

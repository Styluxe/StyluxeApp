import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: COLORS.gray2,
    justifyContent: "center",
  },
  button_container: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    alignItems: "center",
  },
  button_love: {
    padding: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  button_cart: {
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  button_text: {
    fontFamily: "bold",
    color: COLORS.white,
  },
});

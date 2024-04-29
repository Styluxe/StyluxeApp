import { StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  cart_counter_container: {
    justifyContent: "center",
    padding: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    minWidth: 18,
    height: 18,
    borderRadius: 100,
    position: "absolute",
    top: -5,
    right: -5,
  },
  cart_counter_text: {
    fontFamily: "semibold",
    color: COLORS.white,
    fontSize: 8,
  },
});

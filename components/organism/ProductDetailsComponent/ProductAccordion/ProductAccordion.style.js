import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
  reference_button: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.primary,
  },
  reference_button_text: {
    fontFamily: "medium",
    color: COLORS.primary,
  },
  detail_container: {
    flexDirection: "row",
    gap: 5,
  },
  detail_label: {
    fontFamily: "bold",
    flex: 4,
  },
  detail_content: {
    fontFamily: "regular",
    flex: 6,
  },
});

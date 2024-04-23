import { StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 5,
  },
  avatar_container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  username: {
    fontFamily: "semibold",
  },
  rating_container: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  day_text: {
    fontFamily: "regular",
    fontSize: 12,
    color: COLORS.primary,
  },
  content: {
    fontFamily: "regular",
    fontSize: 14,
  },
});

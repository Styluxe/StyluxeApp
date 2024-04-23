import { StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  star_container: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 10,
  },
  total_rating: {
    fontFamily: "medium",
    color: COLORS.gray,
  },
});

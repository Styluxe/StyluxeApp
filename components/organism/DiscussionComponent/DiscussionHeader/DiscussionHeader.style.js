import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.gray2,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
    color: COLORS.primary,
  },
});

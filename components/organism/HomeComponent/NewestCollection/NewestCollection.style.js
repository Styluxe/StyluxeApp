import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
  featured_container: {
    gap: 7,
    paddingHorizontal: 15,
    paddingBottom: 20,
    marginTop: 24,
  },
  featured_title_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  featured_title: {
    fontFamily: "bold",
    color: COLORS.primary,
    fontSize: 18,
  },
  featured_see_all: {
    fontFamily: "medium",
    color: COLORS.gray,
    fontSize: 14,
  },
});

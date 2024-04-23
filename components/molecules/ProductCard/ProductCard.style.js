import { StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    width: 180,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  image_container: {
    height: 120,
    backgroundColor: COLORS.white,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  banner_container: {
    position: "absolute",
    bottom: 0,
    borderTopEndRadius: 5,
  },
  banner_text: {
    fontFamily: "semibold",
    color: COLORS.white,
    fontSize: 10,
    paddingHorizontal: 5,
  },
});

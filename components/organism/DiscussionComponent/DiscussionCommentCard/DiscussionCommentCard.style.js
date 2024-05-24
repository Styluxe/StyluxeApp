import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.gray2,
  },
  profile_container: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  profile_image: {
    width: 38,
    height: 38,
    borderRadius: 5,
  },
  profile_name: {
    fontFamily: "semibold",
    fontSize: 14,
  },
  upload_time: {
    fontFamily: "regular",
    fontSize: 12,
  },
  comment: {
    padding: 5,
    fontFamily: "regular",
  },
});

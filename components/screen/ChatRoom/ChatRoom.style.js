import { StyleSheet } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";

export const styles = StyleSheet.create({
  header_container: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chat_container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
  },
  footer_container: {
    paddingVertical: 15,
    paddingHorizontal: 21,
    backgroundColor: COLORS.white,
  },
  input_container: {
    padding: 13,
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    ...SHADOWS.small,
  },
  camera_input_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    overflow: "hidden",
    flex: 1,
  },
  send_button: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 100,
  },
});

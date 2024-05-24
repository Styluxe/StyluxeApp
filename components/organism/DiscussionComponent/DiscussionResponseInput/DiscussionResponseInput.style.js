import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  counter_container: {
    flexDirection: "row",
    gap: 13,
    alignItems: "center",
  },
  counter_text: {
    fontFamily: "semibold",
    fontSize: 20,
  },
  number_container: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  number_text: {
    fontFamily: "semibold",
    color: COLORS.white,
  },
  input_container: {
    backgroundColor: COLORS.lightWhite,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
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
  comment_btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "flex-end",
    marginHorizontal: 12,
    marginVertical: 10,
  },
  comment_btn_disabled: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "flex-end",
    marginHorizontal: 12,
    marginVertical: 10,
  },
  btn_text: {
    fontFamily: "semibold",
    color: COLORS.white,
  },
});

import { StyleSheet } from "react-native";

import { COLORS, SHADOWS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E1E1",
  },
  detail_body_container: {
    paddingHorizontal: 22,
    paddingVertical: 35,
    flex: 1,
    gap: 15,
  },
  card_container: {
    ...SHADOWS.medium,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 13,
  },
  back_btn: {
    ...SHADOWS.medium,
    padding: 15,
    borderRadius: 100,
    position: "absolute",
    left: -10,
    top: 10,
    backgroundColor: COLORS.white,
    zIndex: 9999,
  },
  image_container: {
    height: 360,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "cover",
  },
  info_container: {
    marginTop: 11,
  },
  info_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stylist_header: {
    fontFamily: "semibold",
    fontSize: 18,
  },
  stylist_status_container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  status_text: {
    fontFamily: "semibold",
    fontSize: 12,
  },
  category_text: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.darkGray,
  },
  price_container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.gray2,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  price_text: {
    fontFamily: "semibold",
    fontSize: 16,
  },
  price_info_text: {
    fontFamily: "regular",
    fontSize: 12,
  },
  stylist_content_text: {
    fontFamily: "regular",
    fontSize: 14,
  },
  schedule_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  schedule_label: {
    fontFamily: "bold",
    fontSize: 14,
    color: COLORS.primary,
    flex: 1,
  },
  schedule_text: {
    fontFamily: "regular",
    fontSize: 14,
    flex: 1,
  },
  load_container: {
    width: "25%",
    alignSelf: "flex-end",
  },
  load_text: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "medium",
  },
  review_container: {
    ...SHADOWS.medium,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 13,
    gap: 10,
  },
  footer_container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: COLORS.gray2,
  },
  like_btn: {
    padding: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  consult_btn: {
    padding: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  consult_text: {
    fontFamily: "bold",
    color: COLORS.white,
  },
});

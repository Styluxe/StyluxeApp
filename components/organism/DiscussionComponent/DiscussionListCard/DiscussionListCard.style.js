import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  title: {
    fontFamily: "semibold",
    fontSize: 20,
    maxWidth: "95%",
  },
  mail: {
    fontFamily: "regular",
    fontSize: 12,
  },
  userContainer: {
    paddingTop: 5,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 5,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  nameContainer: {
    flexDirection: "column",
  },
  name: {
    fontFamily: "semibold",
    fontSize: 14,
  },
  time: {
    fontFamily: "regular",
    fontSize: 12,
  },
  tagContainer: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    height: "100%",
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 10,
  },
  tag: {
    fontFamily: "semibold",
    fontSize: 12,
    color: COLORS.white,
  },
  tagText: {
    fontFamily: "semibold",
    fontSize: 12,
    color: COLORS.black,
  },
  content: {
    paddingTop: 20,
    flexDirection: "column",
    gap: 10,
  },
  contentText: {
    fontFamily: "medium",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 32,
  },
  footerLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "row",
    gap: 5,
    padding: 7,
    backgroundColor: COLORS.gray2,
    borderRadius: 5,
    alignItems: "center",
  },
  commentText: {
    fontFamily: "regular",
    fontSize: 12,
  },
  footerRight: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  likes: {
    fontFamily: "semibold",
  },
});

export default styles;

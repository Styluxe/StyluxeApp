import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  location_txt: {
    fontFamily: "medium",
    color: COLORS.black,
  },
  target_location_txt: {
    fontFamily: "bold",
    color: COLORS.primary,
  },
  header_action_list: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  avatar_container: {
    width: 24,
    height: 24,
    borderRadius: 10,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tagline_container: {
    paddingHorizontal: 15,
  },
  h1_tagline: {
    fontFamily: "bold",
    color: COLORS.primary,
    fontSize: 40,
  },
  h2_tagline: {
    fontFamily: "bold",
    color: "#616161",
    fontSize: 36,
  },
  search_container: {
    paddingHorizontal: 15,
    marginTop: 20,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  search_input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "medium",
    color: COLORS.black,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  search_btn: {
    padding: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
  },
  carousel_container: { paddingVertical: 24, paddingHorizontal: 15 },
  carousel: {
    flex: 1,
    borderRadius: 10,
  },
  carousel_img: {
    width: "100%",
    height: "100%",
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    width: 240,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
  },
  stylist_info_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stylist_profile_container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image_container: {
    width: 32,
    height: 27,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  stylist_name: {
    fontFamily: "bold",
    color: COLORS.black,
    maxWidth: 100,
  },
  stylist_type: {
    fontFamily: "semibold",
    color: COLORS.primary,
    fontSize: 16,
    marginTop: 5,
  },
  stylist_date: {
    fontFamily: "regular",
    color: COLORS.black,
  },
  star_container: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 10,
  },
  total_rating: {
    fontFamily: "bold",
    color: COLORS.primary,
    fontSize: 16,
  },
  price_container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  price: {
    fontFamily: "bold",
    color: COLORS.black,
    fontSize: 16,
  },
  price_info: {
    fontFamily: "regular",
    color: COLORS.black,
    fontSize: 14,
  },
});

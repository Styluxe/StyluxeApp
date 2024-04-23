import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    padding: 16,
    flexDirection: "row",
    borderRadius: 10,
    gap: 20,
    backgroundColor: COLORS.white,
  },
  image_container: {
    width: 85,
    height: 135,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  information_container: {
    gap: 8,
    flex: 1,
  },
  name_container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "bold",
    maxWidth: 160,
  },
  status_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  status: {
    fontFamily: "medium",
    color: "#3A70E2",
  },
  category: {
    fontFamily: "regular",
    fontSize: 12,
    color: COLORS.darkGray,
  },
  rating_container: {
    flexDirection: "row",
    gap: 5,
  },
  rating: {
    color: "gray",
    fontSize: 14,
    fontFamily: "medium",
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
  consult_button: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    // alignSelf: "flex-end",
  },
  consult_text: {
    fontFamily: "semibold",
    color: COLORS.white,
  },
});

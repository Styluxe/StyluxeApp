import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

export const styles = StyleSheet.create({
  information_container: {
    padding: 10,
  },
  product_info_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  product_name: {
    fontFamily: "semibold",
    fontSize: 16,
    color: COLORS.primary,
  },
  product_category: {
    fontFamily: "regular",
    fontSize: 14,
    color: "gray",
  },
  product_price: {
    fontFamily: "semibold",
    fontSize: 18,
    color: COLORS.primary,
  },
  rating_container: {
    flexDirection: "row",
    gap: 5,
  },
  rating_total: {
    color: "gray",
    fontSize: 14,
    fontFamily: "medium",
  },
  size_selection_label_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  size_selection_label: {
    fontFamily: "semibold",
    fontSize: 18,
    color: COLORS.primary,
  },
  size_button_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  size_list_container: {
    gap: 10,
    alignItems: "center",
  },
  counter_container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
    gap: 10,
  },
});

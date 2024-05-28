import { StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  header_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  header_items_wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  search_input_container: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  search_input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
  },
  search_btn: {
    padding: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
  },
  category_container: {
    borderBottomWidth: 2,
    borderColor: COLORS.gray2,
    paddingBottom: 10,
  },
  category_box: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  category_box_active: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  category_text_active: {
    color: COLORS.white,
    fontFamily: "medium",
    fontSize: 12,
  },
  category_text: {
    color: COLORS.primary,
    fontFamily: "medium",
    fontSize: 12,
  },
  card_list_container: {
    padding: 15,
    gap: 10,
    flex: 1,
  },
  header_2: {
    fontFamily: "regular",
    fontSize: 12,
    color: COLORS.primary,
  },
});

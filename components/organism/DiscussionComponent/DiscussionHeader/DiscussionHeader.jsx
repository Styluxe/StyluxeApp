import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./DiscussionHeader.style";

const DiscussionHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={COLORS.primary} />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications" size={32} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default DiscussionHeader;

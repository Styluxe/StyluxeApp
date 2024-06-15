import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./DiscussionHeader.style";
import { COLORS } from "../../../../constants";

const DiscussionHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={COLORS.primary} />
      </TouchableOpacity>
      <View style={{ alignItems: "center", flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default DiscussionHeader;

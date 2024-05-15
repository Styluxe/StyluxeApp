import { Octicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles.rating";

const StarRating = ({ total_likes = 5, iconSize = 24, fontSize = 18 }) => {
  const star = [1, 2, 3, 4, 5];
  return (
    <View style={styles.star_container}>
      {star.map((item, index) => (
        <Octicons
          key={index}
          name={item <= total_likes ? "star-fill" : "star"}
          color="orange"
          size={iconSize}
        />
      ))}

      <Text style={[styles.total_rating, { fontSize }]}>
        {total_likes || 0}
      </Text>
    </View>
  );
};

export default StarRating;

import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../constants";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { styles } from "./StylistCard.style";

const StylistCard = () => {
  const [liked, setLiked] = useState(false);

  const total_likes = 3;

  const date = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const star = [1, 2, 3, 4, 5];

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.stylist_info_container}>
          <View style={styles.stylist_profile_container}>
            <View style={styles.image_container}>
              <Image
                source={require("../../../assets/content/profpic.png")}
                style={styles.image}
              />
            </View>
            <Text style={styles.stylist_name} numberOfLines={2}>
              Dan Stylist
            </Text>
          </View>

          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              color={liked ? COLORS.red : COLORS.black}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.stylist_type}>Wedding Stylist</Text>

        <View style={{ flexDirection: "row" }}>
          {date.map((item, index) => (
            <Text key={index} style={styles.stylist_date}>
              {item}
              {index < date.length - 1 && ", "}
            </Text>
          ))}
        </View>

        <View style={styles.star_container}>
          {star.map((item, index) => (
            <Octicons
              key={index}
              name={item <= total_likes ? "star-fill" : "star"}
              color="orange"
              size={24}
            />
          ))}

          <Text style={styles.total_rating}>{total_likes}</Text>
        </View>

        <View style={styles.price_container}>
          <Text style={styles.price}>Rp 132.000</Text>
          <Text style={styles.price_info}>- Per Session</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StylistCard;

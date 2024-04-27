import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./StylistCard.style";
import { COLORS } from "../../../constants";

const StylistCard = ({ image, name, dates, rating, price, type }) => {
  const [liked, setLiked] = useState(false);

  const navigation = useNavigation();

  const date = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const star = [1, 2, 3, 4, 5];

  return (
    <TouchableOpacity onPress={() => navigation.navigate("StylistDetails")}>
      <View style={styles.container}>
        <View style={styles.stylist_info_container}>
          <View style={styles.stylist_profile_container}>
            <View style={styles.image_container}>
              <Image
                source={
                  !image
                    ? require("../../../assets/content/profpic.png")
                    : { uri: image }
                }
                style={styles.image}
              />
            </View>
            <Text style={styles.stylist_name} numberOfLines={2}>
              {name}
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

        <Text style={styles.stylist_type}>{type}</Text>

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
              name={item <= rating ? "star-fill" : "star"}
              color="orange"
              size={24}
            />
          ))}

          <Text style={styles.total_rating}>{rating}</Text>
        </View>

        <View style={styles.price_container}>
          <Text style={styles.price}>Rp {price}</Text>
          <Text style={styles.price_info}>- Per Session</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StylistCard;

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./StylistDetailCard.style";
import { COLORS } from "../../../../constants";

const StylistDetailCard = () => {
  const navigation = useNavigation();
  const date = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return (
    <TouchableOpacity onPress={() => navigation.navigate("StylistDetails")}>
      <View style={styles.container}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={{
              uri: "https://blog.myskill.id/wp-content/uploads/2024/02/11-fascinating-facts-about-fashion-designer-1695688811-825x510.webp",
            }}
          />
        </View>
        <View style={styles.information_container}>
          <View style={{ gap: 2 }}>
            <View style={styles.name_container}>
              <Text numberOfLines={1} style={styles.name}>
                Dan Stylist
              </Text>
              <View style={styles.status_container}>
                <FontAwesome name="circle" size={10} color="#3A70E2" />
                <Text style={styles.status}>Available</Text>
              </View>
            </View>
            <Text style={styles.category}>Wedding Stylist</Text>
          </View>

          <View style={styles.rating_container}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <FontAwesome key={index} name="star" size={18} color="orange" />
            ))}
            <Text style={styles.rating}>5</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            {date.map((item, index) => (
              <Text
                key={index}
                style={{
                  fontFamily: "regular",
                  color: COLORS.black,
                }}
              >
                {item}
                {index < date.length - 1 && ", "}
              </Text>
            ))}
          </View>

          <View style={styles.price_container}>
            <Text style={styles.price}>Rp 132.000</Text>
            <Text style={styles.price_info}>- Per Session</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StylistDetailCard;

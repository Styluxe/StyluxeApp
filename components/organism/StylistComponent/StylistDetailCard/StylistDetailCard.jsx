import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./StylistDetailCard.style";
import { COLORS } from "../../../../constants";

const StylistDetailCard = ({ stylist }) => {
  const navigation = useNavigation();
  const isOnline = stylist?.online_status === "online";

  const dayFromSchedule = () => {
    if (stylist?.schedules) {
      return stylist?.schedules
        .map((item) => {
          return item.day.substring(0, 2);
        })
        .join(", ");
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("StylistDetails", {
          stylist_id: stylist.stylist_id,
        })
      }
    >
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
                {stylist.brand_name ||
                  stylist?.user.first_name + " " + stylist?.user.last_name}
              </Text>
              <View style={styles.status_container}>
                <FontAwesome
                  name="circle"
                  size={10}
                  color={isOnline ? "#3A70E2" : COLORS.darkGray}
                />
                <Text
                  style={
                    (styles.status,
                    { color: isOnline ? "#3A70E2" : COLORS.darkGray })
                  }
                >
                  {stylist?.online_status === "online"
                    ? "Available"
                    : "Offline"}
                </Text>
              </View>
            </View>
            <Text style={styles.category}>{stylist?.type}</Text>
          </View>

          <View style={styles.rating_container}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <FontAwesome
                key={index}
                name="star"
                size={18}
                color={stylist.rating >= item ? "orange" : "gray"}
              />
            ))}
            <Text style={styles.rating}>{stylist?.rating || 0}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "regular",
                color: COLORS.black,
              }}
            >
              {dayFromSchedule()}
            </Text>
          </View>

          <View style={styles.price_container}>
            <Text style={styles.price}>
              Rp {parseFloat(stylist.price).toLocaleString("id-ID")}
            </Text>
            <Text style={styles.price_info}>- Per Session</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StylistDetailCard;

import { FontAwesome, Ionicons } from "@expo/vector-icons";
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
          return item.day.substring(0, 3);
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
          {stylist?.images?.length > 0 ? (
            <Image
              style={styles.image}
              source={{
                uri: stylist?.images[0]?.image_url,
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="image-sharp" size={50} color={COLORS.primary} />
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 12,
                  color: COLORS.primary,
                }}
              >
                No Image
              </Text>
            </View>
          )}
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

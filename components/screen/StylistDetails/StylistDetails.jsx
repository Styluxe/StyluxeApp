import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./StylistDetail.style";
import { COLORS } from "../../../constants";
import { ReviewBox, StarRating } from "../../molecules";

const StylistDetails = () => {
  const navigation = useNavigation();
  const [numToShow, setNumToShow] = useState(3);
  const [dayToShow, setDayToShow] = useState(3);

  const schedule = [
    {
      day: "Sunday",
      time: "Unavailable",
    },
    {
      day: "Monday",
      time: "10:00 - 20:00",
    },
    {
      day: "Tuesday",
      time: "10:00 - 20:00",
    },
    {
      day: "Wednesday",
      time: "10:00 - 20:00",
    },
    {
      day: "Thursday",
      time: "10:00 - 20:00",
    },
    {
      day: "Friday",
      time: "10:00 - 20:00",
    },
    {
      day: "Saturday",
      time: "10:00 - 18:00",
    },
  ];

  const loadMoreItems = () => {
    setNumToShow(numToShow + 3);
  };

  const handleShowSchedule = () => {
    if (dayToShow === 3) {
      setDayToShow(7);
    } else {
      setDayToShow(3);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1]}
        renderItem={() => (
          <View style={styles.detail_body_container}>
            <View style={styles.card_container}>
              <View style={styles.image_container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://media.voguebusiness.com/photos/5d9746ff4f244c00081cd1df/2:3/w_2560%2Cc_limit/stylists-oct-credit-nat-michelle-month-19-article.jpg",
                  }}
                />
              </View>

              <View style={styles.info_container}>
                <View style={styles.info_wrapper}>
                  <Text style={styles.stylist_header}>Hanny's Stylist</Text>

                  <View style={styles.stylist_status_container}>
                    <FontAwesome name="circle" size={10} color="#3A70E2" />
                    <Text style={styles.status_text}>Available</Text>
                  </View>
                </View>

                <Text style={styles.category_text}>Party Stylist</Text>
              </View>

              <StarRating />

              <View style={styles.price_container}>
                <Text style={styles.price_text}>
                  Rp 132.000{" "}
                  <Text style={styles.price_info_text}>- per Session</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPressIn={() => navigation.goBack()}
                activeOpacity={1}
                style={styles.back_btn}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.card_container}>
              <Text style={styles.stylist_header}>About Stylist</Text>
              <Text style={styles.stylist_content_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum
              </Text>
            </View>

            <View style={styles.card_container}>
              <Text style={styles.stylist_header}>Stylist Schedule</Text>
              <View style={{ gap: 10 }}>
                {schedule.slice(0, dayToShow).map((day, index) => (
                  <View key={index} style={styles.schedule_container}>
                    <Text style={styles.schedule_label}>{day.day}</Text>
                    <Text
                      style={[
                        styles.schedule_text,
                        {
                          color:
                            day.time === "Unavailable"
                              ? "red"
                              : COLORS.darkGray,
                        },
                      ]}
                    >
                      {day.time}
                    </Text>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.load_container}
                  onPress={handleShowSchedule}
                >
                  <Text style={styles.load_text}>
                    {dayToShow === 3 ? "Load More" : "Show Less"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.review_container}>
              <Text style={styles.stylist_header}>Customer's Review</Text>

              <FlatList
                data={[1, 2, 3, 4, 5].slice(0, numToShow)}
                renderItem={() => <ReviewBox />}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListFooterComponentStyle={{ paddingVertical: 10 }}
                ListFooterComponent={
                  numToShow < 5 ? (
                    <Button
                      color={COLORS.primary}
                      title="Show All"
                      onPress={loadMoreItems}
                    />
                  ) : null
                }
              />
            </View>
          </View>
        )}
      />

      <View style={styles.footer_container}>
        <TouchableOpacity>
          <View style={styles.like_btn}>
            <AntDesign name="hearto" size={24} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("StylistDate")}
          style={{ flex: 1 }}
        >
          <View style={styles.consult_btn}>
            <Text style={styles.consult_text}>Consult Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StylistDetails;

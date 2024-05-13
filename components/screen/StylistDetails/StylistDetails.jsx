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
import { COLORS, SHADOWS } from "../../../constants";
import { dummyStylistDetail } from "../../../mocks/DummyStylist";
import { ReviewBox, StarRating } from "../../molecules";
import Swiper from "react-native-swiper";

const StylistDetails = () => {
  const navigation = useNavigation();
  const [numToShow, setNumToShow] = useState(3);
  const [dayToShow, setDayToShow] = useState(3);

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
                <Swiper
                  showsButtons={dummyStylistDetail.images.length > 1}
                  activeDotColor={COLORS.primary}
                  nextButton={
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: COLORS.white,
                        borderRadius: 100,
                        ...SHADOWS.medium,
                      }}
                    >
                      <AntDesign
                        name="arrowright"
                        size={24}
                        color={COLORS.primary}
                      />
                    </View>
                  }
                  prevButton={
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: COLORS.white,
                        borderRadius: 100,
                        ...SHADOWS.medium,
                      }}
                    >
                      <AntDesign
                        name="arrowleft"
                        size={24}
                        color={COLORS.primary}
                      />
                    </View>
                  }
                >
                  {dummyStylistDetail.images.map((item, index) => (
                    <View key={index} style={{ flex: 1 }}>
                      <Image
                        source={{ uri: item.image_url }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                      />
                    </View>
                  ))}
                </Swiper>
              </View>

              <View style={styles.info_container}>
                <View style={styles.info_wrapper}>
                  <Text style={styles.stylist_header}>
                    {dummyStylistDetail.name}
                  </Text>

                  <View style={styles.stylist_status_container}>
                    <FontAwesome name="circle" size={10} color="#3A70E2" />
                    <Text style={styles.status_text}>
                      {dummyStylistDetail.online_status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.category_text}>
                  {dummyStylistDetail.type}
                </Text>
              </View>

              <StarRating total_likes={dummyStylistDetail.rating} />

              <View style={styles.price_container}>
                <Text style={styles.price_text}>
                  Rp {dummyStylistDetail.price}{" "}
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
                {dummyStylistDetail.about}
              </Text>
            </View>

            <View style={styles.card_container}>
              <Text style={styles.stylist_header}>Stylist Schedule</Text>
              <View style={{ gap: 10 }}>
                {dummyStylistDetail.schedule
                  .slice(0, dayToShow)
                  .map((day, index) => (
                    <View key={index} style={styles.schedule_container}>
                      <Text style={styles.schedule_label}>{day.day}</Text>
                      <Text
                        style={[
                          styles.schedule_text,
                          {
                            color:
                              day?.times.length === 0 ? "red" : COLORS.darkGray,
                          },
                        ]}
                      >
                        {day?.times.length === 0
                          ? "Unavailable"
                          : day?.times[0]?.time}{" "}
                        - {day?.times[day?.times.length - 1]?.time}
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
                data={dummyStylistDetail.customer_review.slice(0, numToShow)}
                renderItem={(data) => (
                  <ReviewBox
                    name={data.item.name}
                    rating={data.item.rating}
                    comment={data.item.comment}
                    created_at={data.item.created_at}
                    image={data.item.image_url}
                  />
                )}
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

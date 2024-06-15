import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Spinner } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./StylistDetail.style";
import { useGetStylistByIdApi } from "../../../API/StylistApi";
import { COLORS, SHADOWS } from "../../../constants";
import { dummyStylistDetail } from "../../../mocks/DummyStylist";
import {
  setLoginModalOpen,
  userDataState,
} from "../../../redux/slice/app.slice";
import { ReviewBox, StarRating } from "../../molecules";

const StylistDetails = () => {
  const navigation = useNavigation();
  const [numToShow, setNumToShow] = useState(3);
  const [dayToShow, setDayToShow] = useState(3);
  const { getStylistById, code, setCode, data, loading } =
    useGetStylistByIdApi();
  const [stylistData, setStylistData] = useState(null);

  const route = useRoute();
  const { stylist_id } = route.params;
  const user = useSelector(userDataState);
  const dispatch = useDispatch();
  const no_auth = !user?.user_role;

  useEffect(() => {
    if (user?.user_role === "stylist") {
      navigation.navigate("Home");
    }
  }, [user?.user_role]);

  useFocusEffect(
    useCallback(() => {
      getStylistById(stylist_id);
    }, [stylist_id]),
  );

  useEffect(() => {
    if (code === 200) {
      setStylistData(data);
      setCode(null);
    }
  }, [code, data]);

  const loadMoreItems = () => {
    setNumToShow(numToShow + 3);
  };

  const handleShowSchedule = () => {
    setDayToShow(dayToShow === 3 ? 7 : 3);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Spinner color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  const sort_data = (data) => {
    return data?.sort((a, b) => {
      return new Date(b?.createdAt) - new Date(a?.createdAt);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1]}
        renderItem={() => (
          <View style={styles.detail_body_container}>
            <View style={styles.card_container}>
              <View style={styles.image_container}>
                {stylistData?.images?.length > 0 ? (
                  <Swiper
                    showsButtons={stylistData?.images.length > 1}
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
                    {stylistData.images.map((item, index) => (
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
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="image-sharp"
                      size={50}
                      color={COLORS.primary}
                    />
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

              <View style={styles.info_container}>
                <View style={styles.info_wrapper}>
                  <Text style={styles.stylist_header}>
                    {stylistData?.brand_name ||
                      `${stylistData?.user?.first_name} ${stylistData?.user?.last_name}`}
                  </Text>

                  <View style={styles.stylist_status_container}>
                    <FontAwesome
                      name="circle"
                      size={10}
                      color={
                        stylistData?.online_status === "online"
                          ? "#3A70E2"
                          : "red"
                      }
                    />
                    <Text
                      style={{
                        color:
                          stylistData?.online_status === "online"
                            ? "#3A70E2"
                            : "red",
                      }}
                    >
                      {stylistData?.online_status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.category_text}>
                  {dummyStylistDetail.type}
                </Text>
              </View>

              <StarRating total_likes={stylistData?.rating} />

              <View style={styles.price_container}>
                <Text style={styles.price_text}>
                  Rp {parseFloat(stylistData?.price).toLocaleString("id-ID")}{" "}
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
                {stylistData?.about}
              </Text>
            </View>

            <View style={styles.card_container}>
              <Text style={styles.stylist_header}>Stylist Schedule</Text>
              <View style={{ gap: 10 }}>
                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  stylistData?.schedules
                    .slice(0, dayToShow)
                    .map((day, index) => (
                      <View key={index} style={styles.schedule_container}>
                        <Text style={styles.schedule_label}>{day.day}</Text>
                        <Text
                          style={[
                            styles.schedule_text,
                            {
                              color:
                                day?.times.length === 0
                                  ? "red"
                                  : COLORS.darkGray,
                            },
                          ]}
                        >
                          {day?.times.length === 0
                            ? "Unavailable"
                            : `${day?.times[0]?.time} - ${
                                day?.times[day?.times.length - 1]?.time
                              }`}
                        </Text>
                      </View>
                    ))
                )}

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
                data={sort_data(stylistData?.reviews.slice(0, numToShow))}
                renderItem={({ item }) => (
                  <ReviewBox
                    name={item.user.first_name}
                    rating={item.rating}
                    comment={item.feedback}
                    created_at={item.createdAt}
                    image={item.user.profile_picture}
                  />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "regular",
                      color: COLORS.darkGray,
                    }}
                  >
                    No Review yet
                  </Text>
                }
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListFooterComponentStyle={{ paddingVertical: 10 }}
                ListFooterComponent={
                  numToShow < 5 && stylistData?.reviews.length !== 0 ? (
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

      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => {
            if (no_auth) {
              dispatch(setLoginModalOpen(true));
            } else {
              navigation.navigate("StylistDate", {
                stylist_id: stylistData.stylist_id,
              });
            }
          }}
        >
          <Text
            onPress={() => {
              if (no_auth) {
                dispatch(setLoginModalOpen(true));
              } else {
                navigation.navigate("StylistDate", {
                  stylist_id: stylistData.stylist_id,
                });
              }
            }}
            style={styles.consult_text}
          >
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StylistDetails;

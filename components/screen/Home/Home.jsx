import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.style";
import useAuth from "../../../API/AuthAPI";
import { COLORS, SIZES, images } from "../../../constants";
import {
  authKeyState,
  setLoginModalOpen,
} from "../../../redux/slice/app.slice";
import { CartIcon, LoginModal } from "../../molecules";
import { NewestCollection, PopularStylist } from "../../organism/HomeComponent";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const slides = [
    "https://tlz.ae/wp-content/uploads/2022/10/TZ_featured-image.png",
    "https://media.glamourmagazine.co.uk/photos/657b2069cd763cb5be091396/16:9/w_1280,c_limit/AW%20FASHION%20TRENDS%20141223%20AW-FASHION-TRENDS-MAIN.jpg",
    "https://www.womanindonesia.co.id/wp-content/uploads/2021/11/Trend-fashion-2022-terins-dari-flora-dan-fauna_womanindonesia.jpg",
  ];
  const auth = useSelector(authKeyState);

  const { checkExpiryDate } = useAuth();

  const serviceMenu = [
    {
      id: 1,
      title: "Online\nFashion\nConsultation",
      image: require("../../../assets/content/consult_ilust.png"),
      onPress: () => {
        navigation.navigate("Stylist");
      },
    },
    {
      id: 2,
      title: "Variety of Fashion Products",
      image: require("../../../assets/content/shopping_ilust.png"),
      onPress: () => {
        navigation.navigate("Category");
      },
    },
    {
      id: 3,
      title: "Discussion about Fashion",
      image: require("../../../assets/content/discussion_ilust.png"),
      onPress: () => {
        navigation.navigate("Discussion");
      },
    },
  ];

  useEffect(() => {
    checkExpiryDate();

    // if (!auth) {
    //   dispatch(setLoginModalOpen(true));
    // }
  }, [auth, checkExpiryDate, dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Ionicons name="location-outline" size={24} color={COLORS.primary} />
          <Text style={styles.location_txt}>
            Shipped to
            <Text style={styles.target_location_txt}>{" Rumah"}</Text>
          </Text>
        </View>

        <View style={styles.header_action_list}>
          <TouchableOpacity onPress={() => navigation.navigate("ChatRoom")}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <CartIcon />

          <TouchableOpacity
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions
              auth
                ? navigation.navigate("Profile")
                : dispatch(setLoginModalOpen(true));
            }}
          >
            <View style={styles.avatar_container}>
              <Image
                style={styles.avatar}
                source={require("../../../assets/content/profpic.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 200 }}>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            source={require("../../../assets/content/dummy_header.jpg")}
          />
          {/* <ImageBackground
            source={require("../../../assets/content/dummy_header.jpg")}
          >
            <View style={styles.tagline_container}>
              <Text style={styles.h1_tagline}>Place to Find</Text>
              <Text style={styles.h2_tagline}>Your Fashion Solution</Text>
            </View>
          </ImageBackground> */}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <View style={styles.search_container}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.search_input}
                placeholder="What are you looking for?"
                editable={false}
              />
            </View>

            <View style={styles.search_btn}>
              <Ionicons name="search-outline" size={24} color={COLORS.white} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ gap: 16, paddingHorizontal: 14, paddingVertical: 24 }}>
          <Text
            style={{ fontSize: 18, fontFamily: "bold", color: COLORS.primary }}
          >
            Featured
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {serviceMenu.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  borderRadius: 24,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                }}
                onPress={item.onPress}
              >
                <View
                  style={{
                    height: 172,
                    paddingHorizontal: 12,
                    paddingTop: 16,
                    justifyContent: "space-between",
                    backgroundColor: COLORS.cream,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: "bold",
                      fontSize: 14,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Image
                    style={{ height: 72, width: "100%", resizeMode: "contain" }}
                    source={item.image}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PopularStylist />
        <NewestCollection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

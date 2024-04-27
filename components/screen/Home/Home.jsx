import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.style";
import useAuth from "../../../API/AuthAPI";
import { COLORS, SIZES } from "../../../constants";
import {
  authKeyState,
  setLoginModalOpen,
} from "../../../redux/slice/app.slice";
import { LoginModal } from "../../molecules";
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

  useEffect(() => {
    checkExpiryDate();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Ionicons name="location-outline" size={24} color={COLORS.primary} />
          <Text style={styles.location_txt}>
            Welcome
            <Text style={styles.target_location_txt}>{" Rumah"}</Text>
          </Text>
        </View>

        <View style={styles.header_action_list}>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ShoppingCart")}>
            <View>
              <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
              <View style={styles.cart_counter_container}>
                <Text style={styles.cart_counter_text}>0</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
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
        <View style={styles.tagline_container}>
          <Text style={styles.h1_tagline}>Place to Find</Text>
          <Text style={styles.h2_tagline}>Your Fashion Solution</Text>
        </View>

        <TouchableOpacity>
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

        <View style={styles.carousel_container}>
          <Carousel
            loop
            width={SIZES.width}
            height={SIZES.height / 4}
            autoPlay
            scrollAnimationDuration={5000}
            data={slides}
            renderItem={({ index, item: src }) => (
              <View key={index} style={styles.carousel}>
                <Image source={{ uri: src }} style={styles.carousel_img} />
              </View>
            )}
          />
        </View>
        <PopularStylist />
        <NewestCollection />
      </ScrollView>

      <LoginModal />
    </SafeAreaView>
  );
};

export default Home;

import { Ionicons } from "@expo/vector-icons";
import React from "react";
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

import styles from "./Home.style";
import { COLORS, SIZES } from "../../../constants";
import { NewestCollection, PopularStylist } from "../../organism/HomeComponent";

const Home = () => {
  const slides = [
    "https://tlz.ae/wp-content/uploads/2022/10/TZ_featured-image.png",
    "https://media.glamourmagazine.co.uk/photos/657b2069cd763cb5be091396/16:9/w_1280,c_limit/AW%20FASHION%20TRENDS%20141223%20AW-FASHION-TRENDS-MAIN.jpg",
    "https://www.womanindonesia.co.id/wp-content/uploads/2021/11/Trend-fashion-2022-terins-dari-flora-dan-fauna_womanindonesia.jpg",
  ];

  return (
    <SafeAreaView style={{ flex: 1, gap: 24 }}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Ionicons name="location-outline" size={24} color={COLORS.primary} />
          <Text style={styles.location_txt}>
            Shipped To
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

          <TouchableOpacity>
            <View>
              <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
              <View style={styles.cart_counter_container}>
                <Text style={styles.cart_counter_text}>0</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
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

        <View style={styles.search_container}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.search_input}
              placeholder="What are you looking for?"
            />
          </View>

          <TouchableOpacity>
            <View style={styles.search_btn}>
              <Ionicons name="search-outline" size={24} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>

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
    </SafeAreaView>
  );
};

export default Home;

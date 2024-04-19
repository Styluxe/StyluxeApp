import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import Carousel from "react-native-reanimated-carousel";
import { StylistCard } from "../../molecules";
import styles from "./Home.style";

const Home = () => {
  const slides = [
    "https://tlz.ae/wp-content/uploads/2022/10/TZ_featured-image.png",
    "https://media.glamourmagazine.co.uk/photos/657b2069cd763cb5be091396/16:9/w_1280,c_limit/AW%20FASHION%20TRENDS%20141223%20AW-FASHION-TRENDS-MAIN.jpg",
    "https://www.womanindonesia.co.id/wp-content/uploads/2021/11/Trend-fashion-2022-terins-dari-flora-dan-fauna_womanindonesia.jpg",
  ];

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <SafeAreaView style={{ flex: 1, gap: 24 }}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Ionicons name="location-outline" size={24} color={COLORS.primary} />
          <Text style={styles.location_txt}>
            Shipped To
            <Text style={styles.target_location_txt}>{" " + "Rumah"}</Text>
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
            <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
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

      <ScrollView>
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

          <View style={styles.search_btn}>
            <Ionicons name="search-outline" size={24} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.carousel_container}>
          <Carousel
            loop
            width={width - 30}
            height={height / 4}
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

        <View style={styles.featured_container}>
          <View style={styles.featured_title_container}>
            <Text style={styles.featured_title}>Popular Fashion Stylist</Text>
            <TouchableOpacity>
              <Text style={styles.featured_see_all}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3, 4, 5]}
            renderItem={() => <StylistCard />}
            contentContainerStyle={{
              gap: 10,
            }}
          />
        </View>

        {/* popular fashin stylist */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

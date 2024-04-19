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
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 12,
          paddingBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Ionicons name="location-outline" size={24} color={COLORS.primary} />
          <Text style={{ fontFamily: "medium", color: COLORS.black }}>
            Shipped To
            <Text style={{ fontFamily: "bold", color: COLORS.primary }}>
              {" "}
              Rumah
            </Text>
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
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
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                source={require("../../../assets/content/profpic.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Header */}
      <ScrollView>
        {/* TagMark */}
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={{ fontFamily: "bold", color: COLORS.primary, fontSize: 40 }}
          >
            Place to Find
          </Text>
          <Text style={{ fontFamily: "bold", color: "#616161", fontSize: 36 }}>
            Your Fashion Solution
          </Text>
        </View>
        {/* TagMark */}

        {/* search */}
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 20,
            flexDirection: "row",
            gap: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={{
                backgroundColor: "#F2F2F2",
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontFamily: "medium",
                color: COLORS.black,
                borderColor: COLORS.gray,
                borderWidth: 1,
              }}
              placeholder="What are you looking for?"
            />
          </View>

          <View
            style={{
              padding: 3,
              backgroundColor: COLORS.primary,
              borderRadius: 5,
              justifyContent: "center",
            }}
          >
            <Ionicons name="search-outline" size={24} color={COLORS.white} />
          </View>
        </View>
        {/* search */}

        {/* Carousels */}
        <View style={{ paddingVertical: 24, paddingHorizontal: 15 }}>
          <Carousel
            loop
            width={width - 30}
            height={height / 4}
            autoPlay
            scrollAnimationDuration={5000}
            data={slides}
            renderItem={({ index, item: src }) => (
              <View
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{ uri: src }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            )}
          />
        </View>
        {/* Carousels */}

        {/* popular fashin stylist */}
        <View style={{ gap: 7, paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "bold",
                color: COLORS.primary,
                fontSize: 18,
              }}
            >
              Popular Fashion Stylist
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: "medium",
                  color: COLORS.gray,
                  fontSize: 14,
                }}
              >
                See All
              </Text>
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

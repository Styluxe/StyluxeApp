import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.style";
import useAuth from "../../../API/AuthAPI";
import { useGetProfileApi } from "../../../API/ProfileApi";
import { COLORS } from "../../../constants";
import {
  authKeyState,
  setLoginModalOpen,
  userDataState,
} from "../../../redux/slice/app.slice";
import { CartIcon } from "../../molecules";
import { ActiveBooking, NewestCollection } from "../../organism/HomeComponent";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector(authKeyState);
  const profile = useSelector(userDataState);
  const [refreshing, setRefreshing] = useState(false);

  const { checkExpiryDate } = useAuth();
  const { getProfile } = useGetProfileApi();

  const isCustomer = profile?.user_role !== "stylist";

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
  useFocusEffect(
    useCallback(() => {
      checkExpiryDate();

      if (auth) {
        getProfile();
      }
    }, [auth]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <View style={{ width: 25, height: 25 }}>
            <Image
              source={require("../../../assets/icon.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={styles.location_txt}>
            Welcome to <Text style={{ color: COLORS.primary }}>Styluxe</Text>
          </Text>
        </View>

        <View style={styles.header_action_list}>
          <CartIcon />

          <TouchableOpacity
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions
              auth
                ? navigation.navigate("Profile")
                : dispatch(setLoginModalOpen(true));
            }}
          >
            {!auth ? (
              <View
                style={{
                  padding: 5,
                  backgroundColor: COLORS.primary,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: 12,
                    color: COLORS.white,
                  }}
                >
                  Login
                </Text>
              </View>
            ) : (
              <View style={styles.avatar_container}>
                <Image
                  style={styles.avatar}
                  source={
                    profile?.profile_picture
                      ? { uri: profile.profile_picture }
                      : require("../../../assets/content/profpic.png")
                  }
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 200 }}>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            source={require("../../../assets/content/dummy_header.jpg")}
          />
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

        {profile?.user_role && <ActiveBooking role={profile?.user_role} />}

        {isCustomer ? (
          <>
            <View
              style={{ gap: 16, paddingHorizontal: 14, paddingVertical: 24 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "bold",
                  color: COLORS.primary,
                }}
              >
                Features
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
                        backgroundColor: COLORS.lightBrown,
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
                        style={{
                          height: 72,
                          width: "100%",
                          resizeMode: "contain",
                        }}
                        source={item.image}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : null}

        <NewestCollection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  AvatarImage,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import useAuth from "../../../API/AuthAPI";
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";
import useProfile from "../../../API/UserAPI";

const Profile = () => {
  const userData = useSelector(userDataState);
  const { logout } = useAuth();
  const { getProfile, loading } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  const navigation = useNavigation();
  const toast = useToast();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "bold" }}>Profile</Text>
        <Avatar size="2xl" marginTop={5}>
          <AvatarImage
            source={require("../../../assets/content/profpic.png")}
            alt="profpic"
          />
        </Avatar>

        <Text
          style={{
            fontSize: 18,
            fontFamily: "semibold",
            marginTop: 18,
            color: COLORS.primary,
          }}
        >
          {loading
            ? "Loading..."
            : userData?.first_name + " " + userData?.last_name}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity>
          <View
            style={{
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text style={{ fontFamily: "medium", fontSize: 16 }}>
                My Profile
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
            navigation.navigate("Home");
            toast.show({
              description: "Login success!",
              placement: "bottom",
              render: ({ id }) => {
                const toastId = "toast-" + id;
                return (
                  <Toast nativeID={toastId} action="success" variant="solid">
                    <VStack>
                      <ToastTitle>Logout Success</ToastTitle>
                    </VStack>
                  </Toast>
                );
              },
            });
          }}
        >
          <View
            style={{
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text style={{ fontFamily: "medium", fontSize: 16 }}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

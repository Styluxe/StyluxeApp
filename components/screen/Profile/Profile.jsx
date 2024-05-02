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
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import useAuth from "../../../API/AuthAPI";
import useProfile from "../../../API/UserAPI";
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";
import { LogoutSheet, SelectionList } from "../../molecules";

const Profile = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const userData = useSelector(userDataState);
  const { logout } = useAuth();
  const { getProfile, loading } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  const navigation = useNavigation();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    setShowBottomSheet(false);
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
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color={COLORS.primary}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Profile
          </Text>
        </View>
        <Avatar alignSelf="center" size="2xl" marginTop={5}>
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
            alignSelf: "center",
          }}
        >
          {loading
            ? "Loading..."
            : userData?.first_name + " " + userData?.last_name}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <SelectionList hasIcon iconName="person-outline" text="My Profile" />
        <SelectionList hasIcon iconName="bookmarks-outline" text="My Address" />
        <SelectionList
          hasIcon
          iconName="clipboard-outline"
          text="My Activity"
        />
        <SelectionList
          hasIcon
          iconName="exit-outline"
          text="Logout"
          onPress={() => setShowBottomSheet(true)}
        />
      </View>
      <LogoutSheet
        setShowBottomSheet={setShowBottomSheet}
        showBottomSheet={showBottomSheet}
        handleLogout={handleLogout}
      />
    </SafeAreaView>
  );
};

export default Profile;

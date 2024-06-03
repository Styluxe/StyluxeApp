import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../../constants";
import {
  authKeyState,
  setLoginModalOpen,
  userDataState,
} from "../../redux/slice/app.slice";
import { Discussion } from "../screen/Discussion";
import { DiscussionBookmarks, DiscussionProfile } from "../screen";

const DrawerNavigationDiscussion = () => {
  const Drawer = createDrawerNavigator();
  const userData = useSelector(userDataState);
  const dispatch = useDispatch();

  const auth = useSelector(authKeyState);

  // Custom drawer content component
  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        {auth ? (
          <View style={styles.drawerHeader}>
            <Image
              style={styles.profileImage}
              source={
                userData?.profile_picture
                  ? {
                      uri: userData?.profile_picture,
                    }
                  : require("../../assets/content/profpic.png")
              }
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.username}>
                {userData?.first_name} {userData?.last_name}
              </Text>
              <Text style={styles.email}>{userData?.email}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.drawerHeader}>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontFamily: "bold" }}>
                Please Login to share your thoughts
              </Text>

              <Button
                onPress={() => dispatch(setLoginModalOpen(true))}
                variant="solid"
                backgroundColor={COLORS.primary}
              >
                <ButtonText style={{ color: COLORS.white, fontFamily: "bold" }}>
                  Login
                </ButtonText>
              </Button>
            </View>
          </View>
        )}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Explore"
      screenOptions={{
        unmountOnBlur: true,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {auth && (
        <Drawer.Screen
          name="My Profile"
          component={DiscussionProfile}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.primary}
              />
            ),
            drawerStyle: styles.drawerStyle,
            drawerLabelStyle: styles.drawerLabelStyle,
          }}
        />
      )}

      <Drawer.Screen
        name="Explore"
        component={Discussion}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ionicons name="globe-outline" size={24} color={COLORS.primary} />
          ),
          drawerStyle: styles.drawerStyle,
          drawerLabelStyle: styles.drawerLabelStyle,
        }}
      />
      {auth && (
        <Drawer.Screen
          name="Bookmark"
          component={DiscussionBookmarks}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <Ionicons
                name="bookmarks-outline"
                size={24}
                color={COLORS.primary}
              />
            ),
            drawerStyle: styles.drawerStyle,
            drawerLabelStyle: styles.drawerLabelStyle,
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  drawerLabelStyle: {
    fontFamily: "bold",
    color: COLORS.primary,
    fontSize: 18,
  },
  drawerHeader: {
    padding: 20,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    flexDirection: "col",
    alignItems: "start",
    gap: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: "semibold",
  },
  email: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: "regular",
  },
});

export default DrawerNavigationDiscussion;

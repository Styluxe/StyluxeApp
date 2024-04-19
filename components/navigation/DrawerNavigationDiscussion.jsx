import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { StyleSheet, Text, View, Image } from "react-native";
import { Discussion } from "../screen/Discussion";

const DrawerNavigationDiscussion = () => {
  const Drawer = createDrawerNavigator();

  // Custom drawer content component
  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/content/profpic.png")}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.email}>John@mail.com</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={{ fontFamily: "regular", fontSize: 12 }}>
              <Text style={{ fontFamily: "bold" }}>100</Text> Following
            </Text>
            <Text style={{ fontFamily: "regular", fontSize: 12 }}>
              <Text style={{ fontFamily: "bold" }}>300</Text> Followers
            </Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Explore"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
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

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text } from "react-native";

import DrawerNavigationDiscussion from "./DrawerNavigationDiscussion";
import { COLORS } from "../../constants";
import { Category, Home, Stylist } from "../screen";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarHideOnKeyboard: true,
  headerShown: false,
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "bag-check" : "bag-check-outline"}
                size={20}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontFamily: "bold",
                  color: focused ? COLORS.primary : COLORS.gray2,
                  fontSize: 12,
                }}
              >
                Featured
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={20}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontFamily: "bold",
                  color: focused ? COLORS.primary : COLORS.gray2,
                  fontSize: 12,
                }}
              >
                Categories
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Discussion"
        component={DrawerNavigationDiscussion}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={20}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontFamily: "bold",
                  color: focused ? COLORS.primary : COLORS.gray2,
                  fontSize: 12,
                }}
              >
                Discussion
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Stylist"
        component={Stylist}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "shirt" : "shirt-outline"}
                size={20}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontFamily: "bold",
                  color: focused ? COLORS.primary : COLORS.gray2,
                  fontSize: 12,
                }}
              >
                Stylist
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

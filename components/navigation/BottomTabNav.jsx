import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../constants";
import React from "react";
import { Text } from "react-native";
import { Category, Discussion, Home, Stylist } from "../screen";

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
                name={focused ? "home" : "home-outline"}
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
                Home
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
        component={Discussion}
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

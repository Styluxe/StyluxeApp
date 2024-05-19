import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

import DrawerNavigationDiscussion from "./DrawerNavigationDiscussion";
import { COLORS } from "../../constants";
import { userDataState } from "../../redux/slice/app.slice";
import { Category, Home, Stylist, StylistBookings } from "../screen";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarHideOnKeyboard: true,
  headerShown: false,
  unmountOnBlur: true,
};

const BottomTabNav = () => {
  const userData = useSelector(userDataState);

  const isStylist = userData?.user_role === "stylist" || false;

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
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

      {!isStylist && (
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
      )}

      {isStylist ? (
        <Tab.Screen
          name="Bookings"
          component={StylistBookings}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
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
                  Bookings
                </Text>
              );
            },
          }}
        />
      ) : (
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
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNav;

import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Provider } from "react-redux";

import { LoginModal } from "./components/molecules";
import { BottomTabNav } from "./components/navigation";
import {
  ChatRoom,
  DiscussionDetails,
  ProductDetails,
  ProductList,
  Profile,
  Register,
  Search,
  ShoppingCart,
  StylistDate,
  StylistDetails,
  Checkout,
  MyProfile,
  MyAddress,
  MyActivity,
  OrderDetails,
  PaymentDetails,
  StylistAboutMe,
  StylistManageSchedule,
  StylistPayment,
} from "./components/screen";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./fonts/Poppins-Regular.ttf"),
    light: require("./fonts/Poppins-Light.ttf"),
    medium: require("./fonts/Poppins-Medium.ttf"),
    semibold: require("./fonts/Poppins-SemiBold.ttf"),
    bold: require("./fonts/Poppins-Bold.ttf"),
    extrabold: require("./fonts/Poppins-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  onLayoutRootView();

  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="bottomTab"
              component={BottomTabNav}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="DiscussionDetails"
              component={DiscussionDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProductList"
              component={ProductList}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="StylistDetails"
              component={StylistDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="StylistDate"
              component={StylistDate}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ShoppingCart"
              component={ShoppingCart}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MyProfile"
              component={MyProfile}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MyAddress"
              component={MyAddress}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MyActivity"
              component={MyActivity}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="OrderDetails"
              component={OrderDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="PaymentDetails"
              component={PaymentDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AboutMe"
              component={StylistAboutMe}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ManageSchedule"
              component={StylistManageSchedule}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="StylistPayment"
              component={StylistPayment}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          {/* Login Modal */}
          <LoginModal />
        </NavigationContainer>
      </Provider>
    </GluestackUIProvider>
  );
}

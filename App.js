import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Provider } from "react-redux";

import { BottomTabNav } from "./components/navigation";
import { DiscussionDetails, ProductDetails } from "./components/screen";
import store from "./redux/store";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

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
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GluestackUIProvider>
  );
}

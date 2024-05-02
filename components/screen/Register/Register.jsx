import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputField,
  InputSlot,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import { COLORS } from "../../../constants";
import { setLoginModalOpen } from "../../../redux/slice/app.slice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24, gap: 24 }}>
          <View style={{ gap: 12, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ maxHeight: "20%" }}
              onPress={() => navigation.goBack()}
            >
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: COLORS.primary,
                  padding: 4,
                }}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 120, height: 120 }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                  source={require("../../../assets/logo_nob.png")}
                />
              </View>
              <Text style={{ fontFamily: "bold", fontSize: 24 }}>
                Register Now
              </Text>
            </View>
          </View>
          <VStack gap={14}>
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  First Name
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField placeholder="Enter your first name" />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Last Name
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField placeholder="Enter your Last name" />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Email
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField
                  keyboardType="email-address"
                  placeholder="Enter your email"
                />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Mobile
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField
                  keyboardType="number-pad"
                  placeholder="Enter your email"
                />
              </Input>
            </FormControl>

            {/* formcontrol password */}
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Password
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField type="password" placeholder="Enter your password" />
                <InputSlot
                  pr="$3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                  />
                </InputSlot>
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Repeat Password
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField type="password" placeholder="Repeat password" />
                <InputSlot
                  pr="$3"
                  onPress={() => setShowRepeatPassword(!showPassword)}
                >
                  <Ionicons
                    name={
                      showRepeatPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={24}
                  />
                </InputSlot>
              </Input>
            </FormControl>

            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: "regular", fontSize: 14 }}>
                Already have an account?
              </Text>
              <Text
                style={{
                  fontFamily: "semibold",
                  fontSize: 14,
                  textDecorationLine: "underline",
                }}
                onPress={() => {
                  navigation.goBack();
                  dispatch(setLoginModalOpen(true));
                }}
              >
                Login
              </Text>
            </View>
          </VStack>
          <View>
            <Button onPress={() => {}} backgroundColor={COLORS.primary}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "bold",
                  fontSize: 16,
                }}
              >
                Register
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

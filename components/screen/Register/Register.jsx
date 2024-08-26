import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  Input,
  InputField,
  InputSlot,
  Spinner,
  Toast,
  ToastTitle,
  VStack,
  View,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import { useRegisterApi } from "../../../API/ProfileApi";
import { COLORS } from "../../../constants";
import { setLoginModalOpen } from "../../../redux/slice/app.slice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {
    register,
    code,
    setCode,
    loading: registerLoading,
  } = useRegisterApi();
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    repeat_password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const handleEmailChange = (email) => {
    setRegisterData({ ...registerData, email });
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (password) => {
    setRegisterData({ ...registerData, password });
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
    if (
      registerData.repeat_password &&
      password !== registerData.repeat_password
    ) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  const handleRepeatPasswordChange = (repeat_password) => {
    setRegisterData({ ...registerData, repeat_password });
    if (registerData.password !== repeat_password) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (code === 201) {
      toast.show({
        description: "Login success!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Register Success</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      navigation.navigate("Home");
      dispatch(setLoginModalOpen(true));
      setCode(null);
    } else if (code === 400) {
      console.log("error");
      toast.show({
        description: "Error registering, please Input again",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="solid">
              <VStack>
                <ToastTitle>Error registering</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setCode(null);
    } else if (code === 409) {
      console.log("error");
      toast.show({
        description: "Error registering, please Input again",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="solid">
              <VStack>
                <ToastTitle>Email Already Exist</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setCode(null);
    }
  }, [code]);

  const validatePassword = () => {
    if (
      registerData.password.length < 8 ||
      registerData.password !== registerData.repeat_password
    ) {
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (validatePassword() && isFormValid()) {
      setRegisterData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        repeat_password: "",
      });
      register(registerData);
    } else {
      console.log("error");
      alert("Error validating, please Input again");
    }
  };

  const isFormValid = () => {
    if (
      registerData.first_name === "" ||
      registerData.last_name === "" ||
      registerData.email === "" ||
      registerData.mobile === "" ||
      registerData.password === "" ||
      registerData.repeat_password === ""
    ) {
      return false;
    }
    return true;
  };

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
                <InputField
                  value={registerData.first_name}
                  onChangeText={(e) =>
                    setRegisterData({ ...registerData, first_name: e })
                  }
                  placeholder="Enter your first name"
                />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Last Name
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField
                  value={registerData.last_name}
                  onChangeText={(e) =>
                    setRegisterData({ ...registerData, last_name: e })
                  }
                  placeholder="Enter your Last name"
                />
              </Input>
            </FormControl>

            <FormControl isInvalid={!!emailError}>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Email
                </Text>
              </FormControlLabel>
              <Input>
                <InputField
                  value={registerData.email}
                  onChangeText={handleEmailChange}
                  type="text"
                  placeholder="Enter your email"
                />
              </Input>
              {emailError ? (
                <FormControlError>
                  <FormControlErrorText>{emailError}</FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Mobile
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField
                  type="number"
                  keyboardType="number-pad"
                  placeholder="Enter your email"
                  value={registerData.mobile}
                  onChangeText={(e) => {
                    const numericValue = e.replace(/[^0-9]/g, "");
                    setRegisterData({ ...registerData, mobile: numericValue });
                  }}
                />
              </Input>
            </FormControl>

            <FormControl isInvalid={!!passwordError}>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Password
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={registerData.password}
                  onChangeText={handlePasswordChange}
                />
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
              {passwordError ? (
                <FormControlError>
                  <FormControlErrorText>{passwordError}</FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>

            <FormControl isInvalid={!!repeatPasswordError}>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Confirm Password
                </Text>
              </FormControlLabel>
              <Input borderRadius={10}>
                <InputField
                  value={registerData.repeat_password}
                  onChangeText={handleRepeatPasswordChange}
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <InputSlot
                  pr="$3"
                  onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  <Ionicons
                    name={
                      showRepeatPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={24}
                  />
                </InputSlot>
              </Input>
              {repeatPasswordError ? (
                <FormControlError>
                  <FormControlErrorText>
                    {repeatPasswordError}
                  </FormControlErrorText>
                </FormControlError>
              ) : null}
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
            <Button
              onPress={handleRegister}
              isDisabled={!isFormValid() || registerLoading}
              backgroundColor={
                !isFormValid() || registerLoading
                  ? COLORS.darkGray
                  : COLORS.primary
              }
            >
              <Text
                style={{
                  color: COLORS.offwhite,
                  fontFamily: "bold",
                  fontSize: 16,
                }}
              >
                {registerLoading ? "Registering..." : "Register"}
              </Text>
              {registerLoading && <Spinner color={COLORS.primary} />}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

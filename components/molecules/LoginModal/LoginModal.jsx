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
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../../../API/AuthAPI";
import { COLORS } from "../../../constants";
import {
  loginModalState,
  setLoginModalOpen,
} from "../../../redux/slice/app.slice";

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const showModal = useSelector(loginModalState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (showModal) {
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setShowPassword(false);
    }
  }, [showModal]);

  const { loading, login, code, error, setCode } = useAuth();
  const toast = useToast();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (code === 200) {
      setEmail("");
      setPassword("");
      dispatch(setLoginModalOpen(false));
      toast.show({
        description: "Login success!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Login Success</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setCode(null);
    } else if (code === 401) {
      setErrorMessage("Wrong Password");
      setCode(null);
    } else if (code === 404) {
      setErrorMessage("Email Not Found");
      setCode(null);
    }
  }, [code]);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        dispatch(setLoginModalOpen(false));
        setErrorMessage("");
        setShowPassword(false);
      }}
    >
      <ModalBackdrop />
      <ModalContent gap={10}>
        <ModalHeader borderBottomWidth="$0">
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "bold", fontSize: 20 }}>Welcome!</Text>
              <Ionicons
                onPress={() => dispatch(setLoginModalOpen(false))}
                name="close-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <Text
              style={{
                fontFamily: "regular",
                fontSize: 12,
                color: COLORS.darkGray,
              }}
            >
              Log in now to explore all the features of our platform
            </Text>
          </View>
        </ModalHeader>
        <ModalBody>
          <VStack space="md">
            <FormControl isInvalid={errorMessage !== ""}>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Email
                </Text>
              </FormControlLabel>
              <Input>
                <InputField
                  value={email}
                  type="text"
                  placeholder="Enter your email"
                  onChangeText={setEmail}
                />
              </Input>
            </FormControl>

            <FormControl isInvalid={errorMessage !== ""}>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Password
                </Text>
              </FormControlLabel>
              <Input>
                <InputField
                  value={password}
                  onChangeText={setPassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <InputSlot
                  pr="$3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color={COLORS.primary}
                  />
                </InputSlot>
              </Input>
              <FormControlError>
                <FormControlErrorText>{errorMessage}</FormControlErrorText>
              </FormControlError>
            </FormControl>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  color: COLORS.darkGray,
                }}
              >
                Don't have an account?
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  textDecorationLine: "underline",
                  color: COLORS.primary,
                }}
                onPress={() => {
                  dispatch(setLoginModalOpen(false));
                  navigation.navigate("Register");
                }}
              >
                Register here!
              </Text>
            </View>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <VStack space="lg" w="$full">
            <Button
              disabled={!email || !password || loading}
              onPress={handleLogin}
              backgroundColor={
                !email || !password || loading
                  ? COLORS.secondary
                  : COLORS.primary
              }
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "bold",
                  fontSize: 16,
                }}
              >
                {loading ? "Loading..." : "Login"}
              </Text>
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

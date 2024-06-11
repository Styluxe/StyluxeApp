import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  AvatarImage,
  FormControl,
  FormControlLabel,
  Input,
  InputField,
  InputSlot,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  VStack,
  Button,
  useToast,
  Toast,
  ToastTitle,
  FormControlError,
  FormControlErrorText,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { useProfileApi, useProfilePictureApi } from "../../../API/ProfileApi";
import { COLORS } from "../../../constants";
import { userDataState } from "../../../redux/slice/app.slice";

const MyProfile = () => {
  const userData = useSelector(userDataState);

  const [profileData, setProfileData] = useState({
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    email: userData?.email || "",
    mobile: userData?.mobile || "",
    gender: userData?.gender || "",
    password: "",
    new_password: "",
    repeat_password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const navigation = useNavigation();
  const { updateProfileImage } = useProfilePictureApi();
  const { updateProfile, code, setCode } = useProfileApi();
  const [isDirty, setIsDirty] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const toast = useToast();

  const handleUpdateProfile = () => {
    updateProfile(
      profileData.first_name,
      profileData.last_name,
      profileData.email,
      profileData.mobile,
      profileData.gender,
      profileData.password,
      profileData.new_password,
    );
  };

  const isPasswordValid = () => {
    let valid = false;

    const isOldPasswordValid =
      profileData.password !== "" && passwordError === "";
    const isNewPasswordValid =
      profileData.new_password !== "" && newPasswordError === "";
    const doPasswordsMatch =
      profileData.new_password === profileData.repeat_password &&
      repeatPasswordError === "";

    if (
      profileData.password ||
      profileData.new_password ||
      profileData.repeat_password
    ) {
      valid = isOldPasswordValid && isNewPasswordValid && doPasswordsMatch;
    }

    return valid;
  };

  useEffect(() => {
    const isProfileDirty =
      profileData.first_name !== (userData?.first_name || "") ||
      profileData.last_name !== (userData?.last_name || "") ||
      profileData.email !== (userData?.email || "") ||
      profileData.mobile !== (userData?.mobile || "") ||
      profileData.gender !== (userData?.gender || "");

    setIsDirty(isProfileDirty);
  }, [profileData, userData]);

  useEffect(() => {
    if (code === 200) {
      toast.show({
        description: "Profile updated successfully",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Profile updated successfully!</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });

      navigation.goBack();
      setCode(null);
    } else if (code === 401) {
      toast.show({
        description: "Wrong password",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="solid">
              <VStack>
                <ToastTitle>Wrong password</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });

      setCode(null);
    }
  }, [code]);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newFile = {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: "testing.jpeg",
        };

        updateProfileImage(newFile);
      }
    } catch (error) {
      // Handle any errors that occur during the image picking process
      console.error("Error picking image:", error);
      // Provide feedback to the user that an error occurred
    }
  };

  const handleEmailChange = (email) => {
    setProfileData({ ...profileData, email });
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (password) => {
    setProfileData({ ...profileData, password });
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleNewPasswordChange = (new_password) => {
    setProfileData({ ...profileData, new_password });
    if (new_password.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
    } else {
      setNewPasswordError("");
    }
  };

  const handleRepeatPasswordChange = (repeat_password) => {
    setProfileData({ ...profileData, repeat_password });
    if (profileData.new_password !== repeat_password) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          gap: 20,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
          backgroundColor: COLORS.white,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ fontFamily: "medium", fontSize: 18 }}>My Profile</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ paddingVertical: 23 }}>
            <Avatar alignSelf="center" size="2xl" marginTop={5}>
              <AvatarImage
                source={
                  userData?.profile_picture
                    ? { uri: userData?.profile_picture }
                    : require("../../../assets/content/profpic.png")
                }
                alt="profpic"
              />

              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 100,
                  backgroundColor: COLORS.primary,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
                onPress={handleImagePick}
              >
                <Ionicons name="camera" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </Avatar>
          </View>
          <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
            <Text
              style={{ fontSize: 18, fontFamily: "semibold", marginBottom: 10 }}
            >
              Account Details
            </Text>

            <VStack gap={14}>
              <FormControl>
                <FormControlLabel>
                  <Text
                    style={{
                      fontFamily: "semibold",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    First Name
                  </Text>
                </FormControlLabel>
                <Input borderRadius={10}>
                  <InputField
                    value={profileData.first_name}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, first_name: text })
                    }
                    placeholder="Enter your first name"
                  />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <Text
                    style={{
                      fontFamily: "semibold",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    Last Name
                  </Text>
                </FormControlLabel>
                <Input borderRadius={10}>
                  <InputField
                    value={profileData.last_name}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, last_name: text })
                    }
                    placeholder="Enter your Last name"
                  />
                </Input>
              </FormControl>
              <FormControl isInvalid={!!emailError}>
                <FormControlLabel>
                  <Text
                    style={{
                      fontFamily: "semibold",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    Email
                  </Text>
                </FormControlLabel>
                <Input borderRadius={10}>
                  <InputField
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    value={profileData.email}
                    onChangeText={handleEmailChange}
                  />
                </Input>
                {emailError && (
                  <FormControlError>
                    <FormControlErrorText>{emailError}</FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <Text
                    style={{
                      fontFamily: "semibold",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    Mobile
                  </Text>
                </FormControlLabel>
                <Input borderRadius={10}>
                  <InputField
                    keyboardType="number-pad"
                    placeholder="Enter your email"
                    value={profileData.mobile}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      setProfileData({ ...profileData, mobile: numericValue });
                    }}
                  />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <Text
                    style={{
                      fontFamily: "semibold",
                      fontSize: 14,
                      color: COLORS.darkGray,
                    }}
                  >
                    Gender
                  </Text>
                </FormControlLabel>
                <Select
                  onValueChange={(value) =>
                    setProfileData({ ...profileData, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectInput
                      value={profileData.gender}
                      placeholder="Select your gender"
                    />
                    <Ionicons
                      name="chevron-down-outline"
                      size={24}
                      style={{ marginRight: 10 }}
                    />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectItem label="Male" value="male" />
                      <SelectItem label="Female" value="female" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormControl>
            </VStack>

            <View style={{ paddingVertical: 23 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "semibold",
                  marginBottom: 10,
                }}
              >
                Password
              </Text>
              <VStack gap={14}>
                {/* formcontrol password */}
                <FormControl isInvalid={!!passwordError}>
                  <FormControlLabel>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        fontSize: 14,
                        color: COLORS.darkGray,
                      }}
                    >
                      Old Password
                    </Text>
                  </FormControlLabel>
                  <Input borderRadius={10}>
                    <InputField
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChangeText={handlePasswordChange}
                      value={profileData.password}
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
                      <FormControlErrorText>
                        {passwordError}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
                <FormControl isInvalid={!!newPasswordError}>
                  <FormControlLabel>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        fontSize: 14,
                        color: COLORS.darkGray,
                      }}
                    >
                      New Password
                    </Text>
                  </FormControlLabel>
                  <Input borderRadius={10}>
                    <InputField
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      onChangeText={handleNewPasswordChange}
                      value={profileData.new_password}
                    />
                    <InputSlot
                      pr="$3"
                      onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                      />
                    </InputSlot>
                  </Input>
                  {newPasswordError ? (
                    <FormControlError>
                      <FormControlErrorText>
                        {newPasswordError}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>

                <FormControl isInvalid={!!repeatPasswordError}>
                  <FormControlLabel>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        fontSize: 14,
                        color: COLORS.darkGray,
                      }}
                    >
                      Confirm Password
                    </Text>
                  </FormControlLabel>
                  <Input borderRadius={10}>
                    <InputField
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      onChangeText={handleRepeatPasswordChange}
                      value={profileData.repeat_password}
                    />
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
                  {repeatPasswordError ? (
                    <FormControlError>
                      <FormControlErrorText>
                        {repeatPasswordError}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
              </VStack>
            </View>

            <Button
              disabled={!isDirty && !isPasswordValid()} // Button is disabled only if both isDirty and isPasswordValid are false
              bgColor={
                !isDirty && !isPasswordValid()
                  ? COLORS.secondary
                  : COLORS.primary
              }
              onPress={handleUpdateProfile}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "semibold",
                  fontSize: 18,
                }}
              >
                Save
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

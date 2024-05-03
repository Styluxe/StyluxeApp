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
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import useProfile from "../../../API/UserAPI";
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
  });
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const navigation = useNavigation();
  const { updateProfile } = useProfile();

  const handleUpdateProfile = () => {
    updateProfile(
      profileData.first_name,
      profileData.last_name,
      profileData.email,
      profileData.mobile,
      // eslint-disable-next-line prettier/prettier
      profileData.gender
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          gap: 20,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
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
                source={require("../../../assets/content/profpic.png")}
                alt="profpic"
              />
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
              <FormControl>
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
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, email: text })
                    }
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
                    Mobile
                  </Text>
                </FormControlLabel>
                <Input borderRadius={10}>
                  <InputField
                    keyboardType="number-pad"
                    placeholder="Enter your email"
                    value={profileData.mobile}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, mobile: text })
                    }
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
                <FormControl>
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
                      type="password"
                      placeholder="Enter your password"
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
                      New Password
                    </Text>
                  </FormControlLabel>
                  <Input borderRadius={10}>
                    <InputField
                      type="password"
                      placeholder="Enter your password"
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
              </VStack>
            </View>

            <Button bgColor={COLORS.primary} onPress={handleUpdateProfile}>
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

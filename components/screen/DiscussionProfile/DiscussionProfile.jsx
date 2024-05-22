import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { Button } from "@gluestack-ui/themed";

const DiscussionProfile = () => {
  const navigation = useNavigation();
  const navMenu = [
    {
      id: 1,
      name: "Posts",
    },
    {
      id: 2,
      name: "Likes",
    },
  ];

  const [selectedNavMenu, setSelectedNavMenu] = useState(1);

  return (
    <SafeAreaView>
      <View
        style={{
          paddingVertical: 13,
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="menu"
          size={30}
          color="black"
          onPress={() => navigation.openDrawer()}
        />

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontFamily: "bold", fontSize: 20 }}>
            Discussion Profile
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 2 }}>
          <Text numberOfLines={1} style={{ fontFamily: "bold", fontSize: 15 }}>
            Fildansyah Anggadikusumah
          </Text>

          <Text style={{ fontSize: 14, fontFamily: "medium" }}>
            fildan@mail.com
          </Text>
          <View style={{ alignSelf: "flex-start" }}>
            <Button
              onPress={() => {
                navigation.navigate("MyProfile");
              }}
              variant="outline"
              borderColor={COLORS.primary}
              size="xs"
            >
              <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
                Edit Profile
              </Text>
            </Button>
          </View>
        </View>

        <View
          style={{
            width: 65,
            height: 65,
            backgroundColor: COLORS.gray2,
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../../../assets/content/profpic.png")}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        {navMenu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ flex: 1 }}
            onPress={() => setSelectedNavMenu(item.id)}
          >
            <View
              style={{
                paddingVertical: 5,
                alignItems: "center",
                borderBottomWidth: selectedNavMenu === item.id ? 2 : 0,
                borderColor:
                  selectedNavMenu === item.id ? COLORS.primary : null,
              }}
            >
              <Text
                style={{
                  color:
                    selectedNavMenu === item.id ? COLORS.primary : COLORS.gray,
                  fontFamily: "bold",
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DiscussionProfile;

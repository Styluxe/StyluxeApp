import { Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import { COLORS } from "../../../constants";
import { SelectComponent } from "../../molecules";

const CreateDiscussion = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discussionText, setDiscussionText] = useState("");
  const [images, setImages] = useState([]);

  const discussion_category = [
    {
      id: 1,
      label: "Outfit",
      value: "outfit",
    },
    {
      id: 2,
      label: "Tutorial",
      value: "tutorial",
    },
    {
      id: 3,
      label: "Events",
      value: "events",
    },
    {
      id: 4,
      label: "Fashion News",
      value: "fashion_news",
    },
    {
      id: 5,
      label: "DIY & Customization",
      value: "diy",
    },
  ];

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && Array.isArray(result.assets)) {
        const newFile = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName || "image.jpeg",
        };

        setImages((prevImages) => [...prevImages, newFile]);
      }
    } catch (error) {
      // Handle any errors that occur during the image picking process
      console.error("Error picking image:", error);
      // Provide feedback to the user that an error occurred
    }
  };

  const handleTextChange = (text) => {
    if (text.length <= 500) {
      setDiscussionText(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 13,
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Button bgColor={COLORS.primary} rounded={20} size="sm">
          <Text style={{ color: COLORS.white, fontFamily: "bold" }}>Post</Text>
        </Button>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          flex: 1,
          backgroundColor: COLORS.white,
          gap: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Image
              source={require("../../../assets/content/profpic.png")}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
            <Text style={{ fontFamily: "bold" }}>John Doe</Text>
          </View>

          <View style={{ gap: 10, width: "40%" }}>
            <Text style={{ fontFamily: "bold" }}>Category</Text>
            <SelectComponent
              placeholder="Select Category"
              items={discussion_category}
              onValueChange={(value) => setSelectedCategory(value)}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderRadius: 5,
            gap: 10,
          }}
        >
          <TextInput
            placeholder="Write a Discussion"
            style={{ flex: 1, textAlignVertical: "top", fontFamily: "regular" }}
            multiline
            value={discussionText}
            onChangeText={handleTextChange}
          />

          <View style={{ flexDirection: "row", gap: 10 }}>
            {images.length > 0 && (
              <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 15 }}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={{ uri: item?.uri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />

                    <Ionicons
                      name="close-circle"
                      size={24}
                      color={COLORS.red}
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 5,
                      }}
                      onPress={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 28,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <Ionicons
          name="images-outline"
          size={24}
          color={COLORS.primary}
          onPress={() => {
            if (images.length < 4) handleImagePick();
            else alert("Max 4 images");
          }}
        />
        <Text style={{ fontFamily: "semibold", color: COLORS.primary }}>
          {discussionText.length}/500
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CreateDiscussion;

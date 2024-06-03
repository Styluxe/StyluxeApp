/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Keyboard } from "react-native";

export const useKeyboardVisibility = (setIsContentVisible) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsContentVisible(false),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsContentVisible(true),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [setIsContentVisible]);
};

export const formatTimeWithAMPM = (time) => {
  if (!time || typeof time !== "string" || !time.includes(":")) {
    return "Invalid time format";
  }
  // Convert time to 12-hour format with AM/PM
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const useUploadImageToCloudinary = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "user_preset");
    formData.append("api_key", "761147494786172");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dkxeflvuu/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

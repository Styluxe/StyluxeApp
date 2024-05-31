import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";

const useGetConversationById = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);

  const getConversationById = async (id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/conversation/booking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response?.data;

      setConversation(data);
      setLoading(false);
      console.log("fetch conversation by id");
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, conversation, getConversationById };
};

const useGetMessageById = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [code, setCode] = useState(null);

  const getMessageById = async (id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/conversation/booking/${id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data, code } = response?.data;

      setMessage(data);
      setLoading(false);
      setCode(code);
      console.log("fetch message by id");
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { error, loading, message, getMessageById, code, setCode };
};

const usePostMessage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [code, setCode] = useState(null);

  const postMessage = async (booking_id, message, image) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      let imageURL = null;
      if (image) {
        imageURL = await uploadImageToCloudinary(image);
      }

      const response = await axios.post(
        `${API_URL}/conversation/${booking_id}/message`,
        {
          message,
          media: imageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code, data } = response?.data;

      setMessage(data);
      setCode(code);
      console.log("message sent");
    } catch (error) {
      setError(error);
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "user_preset");
    formData.append("api_key", "761147494786172");

    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dkxeflvuu/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const uploadData = await uploadResponse.json();
    if (!uploadResponse.ok) {
      throw new Error(`Cloudinary upload failed: ${uploadData.error.message}`);
    }

    return uploadData.secure_url;
  };

  return { error, loading, message, code, setCode, postMessage };
};

export { useGetConversationById, useGetMessageById, usePostMessage };

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

  const postMessage = async (booking_id, message) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      console.log("message", message);

      const response = await axios.post(
        `${API_URL}/conversation/${booking_id}/message`,
        {
          message,
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

      setLoading(false);

      console.log("message sent");
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { error, loading, message, code, setCode, postMessage };
};

export { useGetConversationById, useGetMessageById, usePostMessage };

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "./constant";

const useAddressApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);

  const getAddress = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.get(`${API_URL}/user/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;
      console.log("fetch address");
      setLoading(false);
      setAddress(data);
      return data;
    } catch (error) {
      setError(error);
      console.log("error", error);
    }

    setLoading(false);
  };
  return { error, loading, getAddress, address };
};

const usePostAddressApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const postAddress = async (data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.post(`${API_URL}/user/address`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;
      setCode(code);
      console.log("address added");
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };
  return { error, loading, postAddress, code, setCode };
};

export { useAddressApi, usePostAddressApi };

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";

const useViewCartApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewCart, setViewCart] = useState({});

  const getCart = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/order/view-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      console.log("fetch cart");

      setViewCart(data);

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };

  return { viewCart, loading, error, getCart };
};

export { useViewCartApi };

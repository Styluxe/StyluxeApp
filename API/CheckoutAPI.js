import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { API_URL } from "./constant";
import { setCartCount } from "../redux/slice/app.slice";

const useViewCartApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewCart, setViewCart] = useState({});
  const dispatch = useDispatch();

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
      dispatch(setCartCount(data?.cart_items?.length || 0));

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };

  return { viewCart, loading, error, getCart };
};

const useAddToCartApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const addToCart = async (productId, quantity, size) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/order/add-to-cart`,
        {
          product_id: productId,
          quantity,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // eslint-disable-next-line prettier/prettier
        }
      );

      const { code } = response?.data;

      setCode(code);

      console.log("fetch cart");
    } catch (error) {
      setError(error);

      setLoading(false);
      console.log("error", error);
    }

    setLoading(false);
  };

  return { code, loading, error, addToCart };
};

const useRemoveFromCartApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getCart } = useViewCartApi();

  const removeFromCart = async (cartId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      console.log("cart", cartId);

      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.delete(
        `${API_URL}/order/remove-cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // eslint-disable-next-line prettier/prettier
        }
      );

      const { code } = response?.data;

      getCart();

      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };
  return { code, loading, error, removeFromCart };
};

export { useViewCartApi, useAddToCartApi, useRemoveFromCartApi };

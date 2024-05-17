import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { API_URL } from "./constant";
import { setCartCount, setCartData } from "../redux/slice/app.slice";

const useViewCartApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

      dispatch(setCartData(data));
      dispatch(setCartCount(data?.cart_items?.length || 0));

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };

  return { loading, error, getCart };
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
        },
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

  return { code, loading, error, addToCart, setCode };
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
        },
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

const useUpdateQuantityApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getCart } = useViewCartApi();

  const updateQuantity = async (cartItemId, quantity) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      console.log("cart", cartItemId);
      console.log("quantity", quantity);

      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/order/update-quantity`,
        {
          cartItemId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // eslint-disable-next-line prettier/prettier
        },
      );

      const { code } = response?.data;

      getCart();

      setCode(code);

      console.log("cart updated");
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };

  return { code, loading, error, updateQuantity };
};

export {
  useViewCartApi,
  useAddToCartApi,
  useRemoveFromCartApi,
  useUpdateQuantityApi,
};

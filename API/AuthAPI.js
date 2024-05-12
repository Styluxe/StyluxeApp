import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useViewCartApi } from "./CheckoutAPI";
import { useGetProfileApi } from "./ProfileApi";
import { API_URL } from "./constant";
import {
  setAuthKey,
  setCartCount,
  setCartData,
  setUserData,
  userDataState,
} from "../redux/slice/app.slice";

const useAuth = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userDataState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState(null);
  const { getProfile } = useGetProfileApi();
  const { getCart } = useViewCartApi();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { token, data, code, message } = response?.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expiryDate", String(data?.exp));
      setCode(code);
      dispatch(setAuthKey(token));
      setError(code);
      setMessage(message);
      getProfile();
      getCart();
      console.log("login");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("expiryDate");
    dispatch(setUserData(null));
    dispatch(setAuthKey(null));
    dispatch(setCartCount(0));
    dispatch(setCartData({}));
    console.log("logout");
  };

  const checkExpiryDate = async () => {
    const token = await AsyncStorage.getItem("token");
    const expiryDate = await AsyncStorage.getItem("expiryDate");

    const current = Date.now();

    const currentDate = moment(current);
    const expiryToDate = moment(expiryDate * 1000);

    if (token) {
      dispatch(setAuthKey(token));
      console.log("token found");
    }

    if (expiryDate && currentDate.isAfter(expiryToDate)) {
      logout();
    }
  };

  return {
    user: userData,
    error,
    loading,
    login,
    logout,
    checkExpiryDate,
    code,
    message,
  };
};

export default useAuth;

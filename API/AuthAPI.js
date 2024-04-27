import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAuthKey,
  setUserData,
  userDataState,
} from "../redux/slice/app.slice";

const useAuth = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userDataState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://10.0.2.2:8080/auth/login", {
        email,
        password,
      });
      const { token, expiresIn } = response?.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expiryDate", String(expiresIn));
      dispatch(setAuthKey(token));
      setError(null);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const checkExpiryDate = async () => {
    const expiryDate = await AsyncStorage.getItem("expiryDate");
    const currentTime = Math.floor(Date.now() / 1000);
    const token = await AsyncStorage.getItem("token");

    if (token) {
      dispatch(setAuthKey(token));
    }

    if (expiryDate && parseInt(expiryDate, 10) < currentTime) {
      logout();
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("expiryDate");
    dispatch(setUserData(null));
    dispatch(setAuthKey(null));
    console.log("logout");
  };

  return { user: userData, error, loading, login, logout, checkExpiryDate };
};

export default useAuth;

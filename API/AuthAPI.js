import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
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
      const { token, data } = response?.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expiryDate", String(data?.exp));
      dispatch(setAuthKey(token));
      setError(null);
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

  return { user: userData, error, loading, login, logout, checkExpiryDate };
};

export default useAuth;

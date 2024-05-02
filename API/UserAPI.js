import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUserData } from "../redux/slice/app.slice";

const useProfile = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        dispatch(setUserData(null));
      }
      const response = await axios.get("http://10.0.2.2:8080/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response?.data;
      dispatch(setUserData(data));
      setError(null);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      dispatch(setUserData(null));
      console.log("error", error);
    }
    setLoading(false);
  };

  return { error, loading, getProfile };
};

export default useProfile;

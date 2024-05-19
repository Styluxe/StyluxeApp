/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { API_URL } from "./constant";
import { setUserData } from "../redux/slice/app.slice";

const useGetProfileApi = () => {
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
        setLoading(false);
        return null;
      }

      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response?.data;
      dispatch(setUserData(data));
      setError(null);
      setLoading(false);
      console.log("fetch profile");
      return data;
    } catch (error) {
      setError(error);
      dispatch(setUserData(null));
      console.log("error", error);
      setLoading(false);
      throw error; // Re-throw the error to handle it outside
    }
  };

  return { getProfile, loading, error };
};

const useProfileApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getProfile } = useGetProfileApi(); // Directly using the getProfile function from useGetProfileApi

  const updateProfile = async (
    first_name,
    last_name,
    email,
    mobile,
    gender,
  ) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/user/profile`,
        {
          first_name,
          last_name,
          email,
          mobile,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data, code } = response;
      console.log("Profile updated successfully", data);

      if (code === 200) {
        console.log("Profile updated successfully");

        getProfile();
      }
    } catch (error) {
      setError(error);
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error, code };
};

const useProfilePictureApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getProfile } = useGetProfileApi(); // Directly using the getProfile function from useGetProfileApi

  const updateProfileImage = async (image) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        setLoading(false);
        return;
      }

      const imageUrl = await uploadImageToCloudinary(image);

      const response = await axios.post(
        `${API_URL}/user/profile/image`,
        {
          profile_picture: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.code === 200) {
        console.log("Image updated successfully");
        await getProfile(); // Call getProfile directly
      } else {
        console.error("Failed to update image");
      }
    } catch (error) {
      setError(error);
      console.error("Error updating image", error);
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
    return uploadData.secure_url;
  };

  return { error, loading, updateProfileImage };
};

const useRegisterApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const register = async (loginData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, loginData);
      const { code } = response.data;

      console.log("Register successful");
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      setCode(error.response.status);
      console.error("Error registering", error);
    }
  };

  return { register, loading, error, code, setCode };
};

const useGetAllActivityApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [allActivityData, setAllActivityData] = useState([]);

  const getAllActivity = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/user/all-activity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code, data } = response.data;

      console.log("fetch all activity");
      setAllActivityData(data);
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error("Error fetching all activity", error);
      setLoading(false);
    }
  };

  return { error, loading, getAllActivity, code, allActivityData };
};

const useGetMyBookings = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getMyBookings = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/booking/user-active-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response?.data;

      setData(data);
      console.log("fetch active bookings");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { getMyBookings, loading, error, data };
};

const useGetUserCoinsApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [code, setCode] = useState(null);

  const getUserCoins = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/user/coins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, code } = response?.data;

      setData(data);
      console.log("fetch user coins");
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
      setCode(error.response.status);
    }
  };

  return { getUserCoins, loading, error, data, code, setCode };
};

const useClaimCoinApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const claimCoin = async (coin_amount, last_claim_date, claim_day) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/user/coin/claim`,
        {
          coin_amount,
          last_claim_date,
          claim_day,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response.data;

      console.log("fetch user coins");
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
      setCode(error.response.status);
    }
  };
  return { claimCoin, loading, error, code, setCode };
};

export {
  useProfilePictureApi,
  useProfileApi,
  useGetProfileApi,
  useRegisterApi,
  useGetAllActivityApi,
  useGetMyBookings,
  useGetUserCoinsApi,
  useClaimCoinApi,
};

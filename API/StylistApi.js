import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";
import { useDispatch, useSelector } from "react-redux";
import {
  setStylistSchedule,
  stylistScheduleState,
} from "../redux/slice/stylist.slice";
import { useGetBookingById } from "./OrderAPI";

const useGetStylistByAuthApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stylistData, setStylistData] = useState(null);

  const getStylistByAuth = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/stylist/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      setStylistData(data);

      console.log("fetch stylist by id");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { getStylistByAuth, loading, error, stylistData };
};

const useUpdateStylistByIdApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const updateStylistById = async (data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      let imageUrls = [];
      if (data.images && data.images.length > 0) {
        const uploadPromises = data.images.map((image) =>
          uploadImageToCloudinary(image).catch((error) => {
            console.error("Image upload failed:", error.message);
            throw error;
          }),
        );
        imageUrls = await Promise.all(uploadPromises);
      }

      const newData = { ...data, images: imageUrls };

      const response = await axios.put(`${API_URL}/stylist/profile`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;

      setCode(code);
      console.log("update stylist by id");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "user_preset");
      formData.append("api_key", "761147494786172");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkxeflvuu/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  return { updateStylistById, loading, error, code, setCode };
};

const useGetScheduleApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const scheduleData = useSelector(stylistScheduleState);
  const dispatch = useDispatch();

  const getSchedule = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/stylist/schedule`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      console.log("fetch schedule");

      setLoading(false);

      dispatch(setStylistSchedule(data));
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { getSchedule, loading, error, scheduleData };
};

const useAddTimeApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getSchedule } = useGetScheduleApi();

  const addTime = async (data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/stylist/time`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;

      setCode(code);
      await getSchedule();
      console.log("time added");
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { addTime, loading, error, code, setCode };
};

const useUpdateTimeApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getSchedule } = useGetScheduleApi();

  const updateTime = async (stylist_schedule_time_id, time) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/stylist/time/${stylist_schedule_time_id}`,
        {
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;

      console.log("time updated");

      getSchedule();

      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  const updateStatus = async (stylist_schedule_time_id, status) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/stylist/time/${stylist_schedule_time_id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;

      console.log("status updated");

      getSchedule();

      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { updateTime, updateStatus, loading, error, code, setCode };
};

const useGetAllStylistApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [code, setCode] = useState(null);

  const getAllStylist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/stylist/all`);

      const { data, code } = response?.data;

      setData(data);
      console.log("fetch all stylist");
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { getAllStylist, loading, error, data, code, setCode };
};

const useGetStylistByIdApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [code, setCode] = useState(null);

  const getStylistById = async (stylist_id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/stylist/profile/${stylist_id}`,
      );

      const { data, code } = response?.data;

      setData(data);
      setCode(code);
      setLoading(false);

      console.log("fetch stylist by id");
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { getStylistById, loading, error, data, code, setCode };
};

const useGetScheduleByIdApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getScheduleById = async (stylist_id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/stylist/schedule/${stylist_id}`,
      );

      const { data } = response?.data;

      setData(data);
      console.log("fetch schedule by id");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { getScheduleById, loading, error, data };
};

// booking/active-bookings
const useGetActiveBookings = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getActiveBookings = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/booking/active-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  return { getActiveBookings, loading, error, data };
};

const useUpdateOnlineStatus = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const updateOnlineStatus = async (online_status) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      console.log("update online status", online_status);

      const response = await axios.put(
        `${API_URL}/stylist/online-status`,
        online_status,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;

      setCode(code);
      console.log("updated online status");
    } catch (error) {
      setError(error);
      console.log("error", error.response);
      setCode(error.response.status);
      setLoading(false);
    }
  };
  return { updateOnlineStatus, loading, error, code, setCode };
};

const useDeleteScheduleApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getSchedule } = useGetScheduleApi();

  const deleteSchedule = async (schedule_id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.delete(
        `${API_URL}/stylist/schedule/${schedule_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;

      setCode(code);
      console.log("deleted schedule");
      getSchedule();
    } catch (error) {
      setError(error);
      console.log("error", error.response);
      setCode(error.response.status);
      setLoading(false);
    }
  };

  return { deleteSchedule, loading, error, code, setCode };
};

const useSearchStylistApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stylist, setStylist] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searchStylist = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/stylist/search?search=${query}`,
      );

      const { data, keyword } = response?.data;

      setStylist(data);
      setKeyword(keyword);
      console.log("fetch search stylist");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, stylist, keyword, searchStylist };
};

const useAddStylistReviewApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const addStylistReview = async (data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/stylist/review`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;

      setCode(code);
      console.log("added stylist review");
    } catch (error) {
      setError(error);
      console.log("error", error.response);
      setCode(error.response.status);
      setLoading(false);
    }
  };

  return { addStylistReview, loading, error, code, setCode };
};

const useGetCustomerReviewsAPI = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  const getCustomerReviews = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/stylist/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      setReviewData(data);

      console.log("fetch customer reviews");
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, reviewData, getCustomerReviews };
};

export {
  useGetStylistByAuthApi,
  useUpdateStylistByIdApi,
  useGetScheduleApi,
  useAddTimeApi,
  useUpdateTimeApi,
  useGetAllStylistApi,
  useGetStylistByIdApi,
  useGetScheduleByIdApi,
  useGetActiveBookings,
  useUpdateOnlineStatus,
  useDeleteScheduleApi,
  useSearchStylistApi,
  useAddStylistReviewApi,
  useGetCustomerReviewsAPI,
};

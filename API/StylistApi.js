import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";
import { useDispatch, useSelector } from "react-redux";
import {
  setStylistSchedule,
  stylistScheduleState,
} from "../redux/slice/stylist.slice";

const useGetStylistByIdApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stylistData, setStylistData] = useState(null);

  const getStylistById = async () => {
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

  return { getStylistById, loading, error, stylistData };
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

      const response = await axios.put(`${API_URL}/stylist/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;

      setCode(code);
      console.log("update stylist by id");
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
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

      console.log("dataTime", data);

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

export {
  useGetStylistByIdApi,
  useUpdateStylistByIdApi,
  useGetScheduleApi,
  useAddTimeApi,
};

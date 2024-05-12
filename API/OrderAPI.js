import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";

const useGetOrderApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({});

  const getAllOrder = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/order/view-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      setOrderData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, getAllOrder, orderData };
};

const useGetOrderById = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({});

  const getOrderById = async (id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/order/view-order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      console.log("fetch order by id");
      setOrderData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, getOrderById, orderData };
};

const useGetPaymentSummary = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState({});

  const getPaymentSummary = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/order/payment-summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      console.log("fetch payment summary");
      setSummaryData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, getPaymentSummary, summaryData };
};

const useCreateOrder = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const createOrder = async (payment_provider, address_id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/order/create-order`,
        { payment_provider, address_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response?.data;

      console.log("create order");
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, createOrder, responseData };
};

const useUpdateStatus = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [code, setCode] = useState(null);

  const updateStatus = async (order_id, payment_status, order_status) => {
    setLoading(true);

    console.log("update status", order_id, payment_status, order_status);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/order/order-status/${order_id}`,
        { payment_status, order_status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data, code } = response?.data;

      console.log("update status");
      setResponseData(data);
      setLoading(false);
      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, updateStatus, responseData, code };
};

export {
  useGetOrderApi,
  useGetOrderById,
  useGetPaymentSummary,
  useCreateOrder,
  useUpdateStatus,
};

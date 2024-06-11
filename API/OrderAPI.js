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
  const [orderData, setOrderData] = useState(null);

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
  const [code, setCode] = useState(null);

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

      const { data, code } = response?.data;

      console.log("fetch payment summary");
      setSummaryData(data);
      setLoading(false);
      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, getPaymentSummary, summaryData, code, setCode };
};

const useCreateOrder = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [code, setCode] = useState(null);

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

      const { data, code } = response?.data;

      console.log("create order");
      setResponseData(data);
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, createOrder, responseData, code, setCode };
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

  return { error, loading, updateStatus, responseData, code, setCode };
};

const useCreateBookingApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState({});
  const [responseData, setResponseData] = useState(null);

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/booking/new`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code, data } = response?.data;

      console.log("create booking");
      setResponseData(data);
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, createBooking, code, responseData, setCode };
};

const useGetBookingById = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const getBookingById = async (booking_id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/booking/details/${booking_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response?.data;

      console.log("get booking by id");
      setBookingData(data);

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, getBookingById, bookingData };
};

const useGetBookingsApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingsData, setBookingsData] = useState(null);

  const getBookings = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/booking/view-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      console.log("get bookings");

      setBookingsData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { error, loading, getBookings, bookingsData };
};

const useUpdateBookingStatus = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const updateBookingStatus = async (
    bookingId,
    payment_status,
    booking_status,
  ) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/booking/update-status/${bookingId}`,
        {
          payment_status,
          booking_status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data, code } = response?.data;

      console.log("update booking status");

      setCode(code);
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { error, loading, updateBookingStatus, responseData, code, setCode };
};

const usePublicGetBookingsApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingsData, setBookingsData] = useState(null);

  const getBookings = async (stylist_id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/booking/stylist/${stylist_id}`,
      );

      const { data } = response?.data;

      console.log("get bookings");
      setBookingsData(data);

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };
  return { error, loading, getBookings, bookingsData };
};

const useEndBookingApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const endBooking = async (bookingId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/booking/end-booking/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;

      console.log("end booking");
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
      setCode(error?.response?.status);
    }
  };
  return { error, loading, endBooking, code, setCode };
};

const useRefundBookingAPI = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const refundBooking = async (bookingId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/booking/refund-booking/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;

      console.log("refund booking");
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
      setCode(error?.response?.status);
    }
  };
  return { error, loading, refundBooking, code, setCode };
};

const useCancelOrderApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const cancelOrder = async (orderId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/order/cancel-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;

      console.log("cancel order");
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
      setCode(error?.response?.status);
    }
  };
  return { error, loading, cancelOrder, code, setCode };
};

export {
  useGetOrderApi,
  useGetOrderById,
  useGetPaymentSummary,
  useCreateOrder,
  useCancelOrderApi,
  useUpdateStatus,
  useCreateBookingApi,
  useGetBookingById,
  useGetBookingsApi,
  useUpdateBookingStatus,
  usePublicGetBookingsApi,
  useEndBookingApi,
  useRefundBookingAPI,
};

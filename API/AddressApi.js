import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "./constant";

const useAddressApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);

  const getAddress = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.get(`${API_URL}/user/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;
      console.log("fetch address");
      setLoading(false);
      setAddress(data);
      return data;
    } catch (error) {
      setError(error);
      console.log("error", error);
    }

    setLoading(false);
  };
  return { error, loading, getAddress, address };
};

const usePostAddressApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const postAddress = async (data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.post(`${API_URL}/user/address`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;
      setCode(code);
      console.log("address added");
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };
  return { error, loading, postAddress, code, setCode };
};

const useSetPrimaryAddressApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const setPrimaryAddress = async (id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.put(
        `${API_URL}/user/address-primary/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;
      setCode(code);
      console.log("primary address set");
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };

  return { error, loading, setPrimaryAddress, code, setCode };
};

const useDeleteAddressApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const deleteAddress = async (id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.delete(`${API_URL}/user/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;

      setCode(code);
      console.log("address deleted");
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };
  return { error, loading, deleteAddress, code, setCode };
};

const useEditAddressApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const editAddress = async (id, data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.put(`${API_URL}/user/address/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;
      setCode(code);
      console.log("address edited");
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };
  return { error, loading, editAddress, code, setCode };
};

const useProvinceApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState([]);

  const getProvince = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json`,
      );

      setProvince(response?.data);
      console.log("fetch province");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
    setLoading(false);
  };
  return { error, loading, province, getProvince };
};

const useCityApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);

  const getCity = async (provinceId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
      );

      setCity(response?.data);
      console.log("fetch city");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
    setLoading(false);
  };
  return { error, loading, city, getCity };
};

const useDistrictApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState([]);

  const getDistrict = async (cityId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${cityId}.json`,
      );

      setDistrict(response?.data);
      console.log("fetch district");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
    setLoading(false);
  };
  return { error, loading, district, getDistrict };
};

export {
  useAddressApi,
  usePostAddressApi,
  useSetPrimaryAddressApi,
  useDeleteAddressApi,
  useEditAddressApi,
  useProvinceApi,
  useCityApi,
  useDistrictApi,
};

import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";

const useGetSingleProductApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  const getProduct = async ({ productId }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        // eslint-disable-next-line prettier/prettier
        `${API_URL}/product/detail/${productId}`,
      );
      console.log("fetch product");

      const { data } = response?.data;

      setProduct(data);

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, getProduct, product };
};

const useSearchProductApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [code, setCode] = useState(null);

  const searchProduct = async (query) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${API_URL}/product/search?search=${query}`,
      );

      const { data, keyword, code } = response?.data;

      console.log("fetch search product:");
      setProducts(data);
      setKeyword(keyword);
      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);

      setCode(error?.response?.status);
    }
  };

  return { error, loading, products, keyword, searchProduct, code, setCode };
};

// product filtering

const useProductFilterApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState(null);

  const productFilter = async (filter) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/product/filter`, filter);
      console.log("fetch product filter");

      const { data, code } = response?.data;
      setProducts(data);
      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
      setCode(error?.response?.status);
    }
  };
  return { error, loading, products, productFilter, code, setCode };
};

const useGetLatestProductApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState(null);

  const getLatestProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/product/latest`);
      console.log("fetch latest product");
      const { data, code } = response?.data;
      setProducts(data);
      setCode(code);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
      setCode(error?.response?.status);
    }
  };
  return { error, loading, products, getLatestProduct, code, setCode };
};

export {
  useGetSingleProductApi,
  useSearchProductApi,
  useProductFilterApi,
  useGetLatestProductApi,
};

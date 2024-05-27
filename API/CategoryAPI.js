import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";

const useCategoryApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/product/categories`);
      console.log("fetch category");

      const { data } = response?.data;

      setCategory(data);

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, getCategory, category };
};

const useProductCategoryApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productCategory, setProductCategory] = useState([]);
  const [code, setCode] = useState(null);

  const getProductCategory = async ({ categoryId }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        // eslint-disable-next-line prettier/prettier
        `${API_URL}/product/category/${categoryId}`,
      );
      console.log("fetch product category");

      const { data, code } = response?.data;
      setProductCategory(data);

      setLoading(false);

      setCode(code);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);

      setCode(error?.response?.status);
    }
  };

  return { error, loading, getProductCategory, productCategory, code, setCode };
};

export { useCategoryApi, useProductCategoryApi };

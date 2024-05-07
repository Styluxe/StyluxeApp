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
        `${API_URL}/product/detail/${productId}`
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

export { useGetSingleProductApi };

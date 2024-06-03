import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

import { API_URL } from "./constant";
import {
  bookmarksDataState,
  setBookmarksData,
} from "../redux/slice/discussion.slice";
import { useDispatch, useSelector } from "react-redux";

const useGetDiscussionCategoryApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discussionCategory, setDiscussionCategory] = useState([]);
  const getDiscussionCategory = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }
      const response = await axios.get(`${API_URL}/post/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response?.data;

      console.log("fetching discussion category");
      setDiscussionCategory(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error.response.status);
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    discussionCategory,
    getDiscussionCategory,
  };
};

const useCreateDiscussionApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const createDiscussion = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
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

      const response = await axios.post(`${API_URL}/post/new`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.code) {
        setCode(response.data.code);
        console.log("Discussion created successfully");
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      setError(error);
      console.error("Error creating discussion:", error);
    } finally {
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

  return { error, loading, createDiscussion, code, setCode };
};

const useEditDiscussionApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const editDiscussion = async (postId, data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
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

      const response = await axios.put(`${API_URL}/post/${postId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;
      setCode(code);
      console.log("Post deleted successfully");
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

  return { error, loading, code, setCode, editDiscussion };
};

//get all post
const useGetAllDiscussionApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const getAllDiscussion = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/post`);
      const { data } = response?.data;

      console.log("fetching all discussion");
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, responseData, getAllDiscussion };
};

const useGetPostByIdApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const getPostById = async (postId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/post/id/${postId}`);
      const { data } = response?.data;

      console.log("fetching post by id");
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, responseData, getPostById };
};

const useReactDiscussionApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getAllDiscussion } = useGetAllDiscussionApi();

  const reactDiscussion = async (postId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.post(
        `${API_URL}/post/${postId}/reaction`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.code) {
        setCode(response.data.code);
        console.log("Discussion reacted successfully");
        getAllDiscussion();
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      setError(error);
      console.error("Error creating discussion:", error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, code, setCode, reactDiscussion };
};

const useCommentDiscussionApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const commentDiscussion = async (postId, comment) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.post(
        `${API_URL}/post/${postId}/comment`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.code) {
        setCode(response.data.code);
        console.log("Discussion commented successfully");
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      setError(error);
      console.error("Error creating discussion:", error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, code, setCode, commentDiscussion };
};

//get post by user id
const useGetPostByAuthorIdApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const getPostByAuthorId = async (authorId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/post/author/${authorId}`);
      const { data } = response?.data;

      console.log("fetching post by author id");
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, responseData, getPostByAuthorId };
};

//get liked post by user id
const useGetLikedPostByAuthorIdApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);

  const getLikedPostByAuthorId = async (authorId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/post/liked/${authorId}`);
      const { data } = response?.data;

      console.log("fetching liked post by author id");
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, responseData, getLikedPostByAuthorId };
};

const useAddToBookmarkApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { getAllDiscussion } = useGetAllDiscussionApi();
  const { getBookmarks } = useGetBookmarksApi();

  const addToBookmark = async (postId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.post(
        `${API_URL}/post/${postId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { code } = response?.data;
      setCode(code);
      console.log("Post added to bookmark successfully");
      await getAllDiscussion();
      await getBookmarks();
    } catch (error) {
      setError(error);
      console.error("Error creating discussion:", error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, code, setCode, addToBookmark };
};

const useGetBookmarksApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const bookmarksData = useSelector(bookmarksDataState);
  const dispatch = useDispatch();

  const getBookmarks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.get(`${API_URL}/post/bookmarks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response?.data;

      console.log("fetching bookmarks");
      dispatch(setBookmarksData(data));
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, bookmarksData, getBookmarks };
};

const useDeleteDiscussionApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const deleteDiscussion = async (postId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("token not found");
        setLoading(false);
      }

      const response = await axios.delete(`${API_URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { code } = response?.data;
      setCode(code);
      console.log("Post deleted successfully");
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoading(false);
    }
  };

  return { error, loading, code, setCode, deleteDiscussion };
};

export {
  useGetDiscussionCategoryApi,
  useCreateDiscussionApi,
  useGetAllDiscussionApi,
  useGetPostByIdApi,
  useReactDiscussionApi,
  useCommentDiscussionApi,
  useGetPostByAuthorIdApi,
  useGetLikedPostByAuthorIdApi,
  useAddToBookmarkApi,
  useGetBookmarksApi,
  useDeleteDiscussionApi,
  useEditDiscussionApi,
};

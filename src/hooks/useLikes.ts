import { api } from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";

export const useLikes = (postId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const checkLiked = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${postId}/is_user_liked`);
      const { data } = res;
      setIsLiked(data["is_liked"]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const like = async () => {
    setLoading(true);
    try {
      await api.post(`/posts/${postId}/likes`);
      setIsLiked(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const dislike = async () => {
    setLoading(true);
    try {
      await api.delete(`/posts/${postId}/likes`);
      setIsLiked(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLiked();
  }, [checkLiked]);

  return { loading, isLiked, checkLiked, like, dislike };
};

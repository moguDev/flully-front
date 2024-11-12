import { Post } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";

export const usePost = (postId: number | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${postId}`);
      const { data } = res;
      setPost({ ...camelcaseKeys(data, { deep: true }) });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const initPost = () => setPost(null);

  useEffect(() => {
    fetch();
  }, []);

  return { loading, post, initPost, fetch };
};

import { Post } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useCallback, useEffect, useState } from "react";
import { usePosts } from "./usePosts";

export const usePost = (postId: number | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const { fetchPosts } = usePosts();

  const initPost = () => setPost(null);

  const fetch = useCallback(async () => {
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
  }, [postId]);

  const destroy = async () => {
    setLoading(true);
    await api.delete(`/posts/${postId}`);
    fetchPosts();
    try {
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetch();
    }
  }, [postId]);

  return { loading, post, initPost, fetch, destroy };
};

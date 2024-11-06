import { Comment } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";

export const usePostComments = (postId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/post_comments", {
        params: { post_id: postId },
      });
      const { data } = res;
      setComments(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sendComment = async (body: string) => {
    setLoading(true);
    try {
      await api.post("/post_comments", { post_id: postId, body });
      fetchComments();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return { comments, loading, sendComment };
};

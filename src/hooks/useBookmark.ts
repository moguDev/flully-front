import { api } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

export const useBookmark = (boardId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const checkBookmarked = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/boards/${boardId}/is_user_bookmarked`);
      const { data } = res;
      setBookmarked(data["is_bookmarked"]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const bookmark = async () => {
    setLoading(true);
    try {
      await api.post(`/boards/${boardId}/bookmarks`);
      setBookmarked(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const unbookmark = async () => {
    setLoading(true);
    try {
      await api.delete(`/boards/${boardId}/bookmarks`);
      setBookmarked(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBookmarked();
  }, []);

  return { loading, bookmarked, bookmark, unbookmark };
};

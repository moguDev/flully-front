import { api } from "@/lib/axiosInstance";
import { useState } from "react";

export const useFollows = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const follow = async (userName: string) => {
    setLoading(true);
    try {
      await api.post("/follows", { name: userName });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const unFollow = async (userId: number) => {
    setLoading(true);
    try {
      await api.delete(`/follows/${userId}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, follow, unFollow };
};

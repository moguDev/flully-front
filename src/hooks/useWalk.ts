import { Walk } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";

export const useWalk = (walkId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [walk, setWalk] = useState<Walk | null>(null);
  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/walks/${walkId}`);
      const { data } = res;
      setWalk(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, walk };
};

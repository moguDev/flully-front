import { Walk } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";

export const useWalks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [walks, setWalks] = useState<Walk[]>([]);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/walks");
      const { data } = res;
      setWalks(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { walks, loading };
};

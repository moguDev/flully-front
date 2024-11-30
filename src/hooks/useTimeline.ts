import { TimelineItem } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";

export const useTimeline = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<TimelineItem[]>([]);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/timeline");
      const { data } = res;
      setItems(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, items, fetch };
};

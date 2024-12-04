import { Notification } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";

const unreadState = atom<number>({ key: "unreadState", default: 0 });

export const useNotifications = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [unread, setUnread] = useRecoilState<number>(unreadState);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const checkHasUnread = async () => {
    try {
      const res = await api.get("/notifications/unread");
      const { data } = res;
      console.log(data["unread"]);
      setUnread(data["unread"]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notifications");
      const { data } = res;
      setNotifications(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, unread, notifications, fetch, checkHasUnread };
};

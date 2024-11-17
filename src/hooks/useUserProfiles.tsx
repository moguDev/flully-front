import { api } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { authState, AuthState, useAuth } from "./useAuth";
import { User } from "@/app/types";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

type UserData = {
  name: string;
  nickname: string;
  email: string;
  introduction: string;
  twitter: string;
  location: string;
  avatar: FileList | null;
  isMailPublic: boolean;
  isLocationPublic: boolean;
};

export const useUserProfiles = (name: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const setAuth = useSetRecoilState<AuthState>(authState);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${name}`);
      const { data } = res;
      setUser({ ...camelcaseKeys(data, { deep: true }) });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/myprofile");
      const { data } = res;
      setUser({ ...camelcaseKeys(data, { deep: true }) });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const update = async (newUserData: UserData) => {
    setLoading(true);
    try {
      const res = await api.put(
        "/auth",
        snakecaseKeys({
          ...newUserData,
          avatar: newUserData.avatar ? newUserData.avatar[0] : null,
        }),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const { headers, data } = res;
      Cookies.set("access-token", headers["access-token"]);
      Cookies.set("client", headers["client"]);
      Cookies.set("uid", headers["uid"]);
      setAuth({
        isAuthenticated: true,
        ...data.data,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, fetch, update, fetchCurrentUser };
};

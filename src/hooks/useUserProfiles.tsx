import { api } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { authState, AuthState } from "./useAuth";

type UserData = {
  name: string;
  nickname: string;
  email: string;
  introduction: string;
  twitter: string;
  location: string;
};

export const useUserProfiles = (name: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const setAuth = useSetRecoilState<AuthState>(authState);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${name}`);
      const { data } = res;
      console.log(data);
      setUserData({ ...data });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const update = async (newUserData: UserData) => {
    setLoading(true);
    try {
      const res = await api.put("/auth", newUserData);
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

  useEffect(() => {
    fetch();
  }, []);

  return { loading, userData, update };
};

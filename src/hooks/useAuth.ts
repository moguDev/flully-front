import { api } from "@/lib/axiosInstance";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import Cookies from "js-cookie";

export type AuthState = {
  isAuthenticated: boolean;
  name: string;
  nickname: string;
  email: string;
  introduction: string;
  twitter: string;
  location: string;
};

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    name: "",
    nickname: "",
    email: "",
    introduction: "",
    twitter: "",
    location: "",
  },
});

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState<AuthState>(authState);
  const [loading, setLoading] = useState<boolean>(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/validate_token");
      const { data } = res;
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

  const signup = async ({
    name,
    nickname,
    email,
    password,
    passwordConfirmation,
  }: {
    name: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    setLoading(true);
    try {
      const res = await api.post("/auth", {
        name,
        nickname,
        email,
        password,
        passwordConfirmation,
      });
      const { headers, data } = res;
      Cookies.set("access-token", headers["access-token"]);
      Cookies.set("client", headers["client"]);
      Cookies.set("uid", headers["uid"]);
      setAuth({
        isAuthenticated: true,
        ...data.data,
      });
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/sign_in", { email, password });
      const { headers, data } = res;
      console.log(data.data.name);

      Cookies.set("access-token", headers["access-token"]);
      Cookies.set("client", headers["client"]);
      Cookies.set("uid", headers["uid"]);
      setAuth({
        isAuthenticated: true,
        ...data.data,
      });
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.delete("/auth/sign_out");
      Cookies.remove("access-token");
      Cookies.remove("client");
      Cookies.remove("uid");
      setAuth({
        isAuthenticated: false,
        name: "",
        nickname: "",
        email: "",
        introduction: "",
        twitter: "",
        location: "",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    name: auth.name,
    nickname: auth.nickname,
    loading,
    checkAuth,
    signup,
    login,
    logout,
  };
};

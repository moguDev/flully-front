"use client";
import { api } from "@/lib/axiosInstance";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import Cookies from "js-cookie";

type AuthState = {
  isAuthenticated: boolean;
  name: string;
  nickname: string;
  email: string;
};

const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    name: "",
    nickname: "",
    email: "",
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
      console.log(data.data);
      setAuth({
        isAuthenticated: true,
        name: data.data.name,
        nickname: data.data.nickname,
        email: data.data.email,
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
        name: data.data.name,
        nickname: data.data.nickname,
        email: data.data.email,
      });
    } catch (e) {
      console.error(e);
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
        name: data.data.name,
        nickname: data.data.nickname,
        email: data.data.email,
      });
    } catch (e) {
      console.error(e);
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

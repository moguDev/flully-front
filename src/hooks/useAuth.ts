"use client";
import { api } from "@/lib/axiosInstance";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import Cookies from "js-cookie";

type AuthState = {
  isAuthenticated: boolean;
  name: string;
};

const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    name: "",
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
      setAuth({ isAuthenticated: true, name: data.data });
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

      Cookies.set("access-token", headers["access-token"]);
      Cookies.set("client", headers["client"]);
      Cookies.set("uid", headers["uid"]);
      setAuth({ isAuthenticated: true, name: data.data });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await api.delete("/auth/sign_out");
      Cookies.remove("access-token");
      Cookies.remove("client");
      Cookies.remove("uid");
      setAuth({
        isAuthenticated: false,
        name: "",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    loading,
    checkAuth,
    login,
    logout,
  };
};

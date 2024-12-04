import { api } from "@/lib/axiosInstance";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import Cookies from "js-cookie";
import camelcaseKeys from "camelcase-keys";

export type AuthState = {
  isAuthenticated: boolean;
  name: string;
  nickname: string;
  email: string;
  introduction: string;
  avatarUrl: string | null;
  twitter: string;
  location: string;
  followingCount: number;
  followersCount: number;
};

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    name: "",
    nickname: "",
    email: "",
    introduction: "",
    avatarUrl: null,
    twitter: "",
    location: "",
    followersCount: 0,
    followingCount: 0,
  },
});

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState<AuthState>(authState);
  const [loading, setLoading] = useState<boolean>(false);

  const initAuthState = () => {
    Cookies.remove("access-token");
    Cookies.remove("client");
    Cookies.remove("uid");
    setAuth({
      isAuthenticated: false,
      name: "",
      nickname: "",
      email: "",
      introduction: "",
      avatarUrl: null,
      twitter: "",
      location: "",
      followersCount: 0,
      followingCount: 0,
    });
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/validate_token");
      const { data } = res;
      setAuth({
        isAuthenticated: true,
        ...camelcaseKeys(data, { deep: true }),
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
      const { headers } = res;
      Cookies.set("access-token", headers["access-token"]);
      Cookies.set("client", headers["client"]);
      Cookies.set("uid", headers["uid"]);
      checkAuth();
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
      const { headers } = res;
      Cookies.set("access-token", headers["access-token"]);
      Cookies.set("client", headers["client"]);
      Cookies.set("uid", headers["uid"]);
      checkAuth();
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
      initAuthState();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      await api.delete("/auth");
      initAuthState();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    authState: auth,
    loading,
    checkAuth,
    signup,
    login,
    logout,
    deleteAccount,
  };
};

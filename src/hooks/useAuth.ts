"use client";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";

type AuthState = {
  isAuthenticated: false;
};

const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
  },
});

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState<AuthState>(authState);
  const [loading, setLoading] = useState<boolean>(false);
  return { isAuthenticated: auth.isAuthenticated, loading };
};

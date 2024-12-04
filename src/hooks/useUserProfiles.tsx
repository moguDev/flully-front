import { api } from "@/lib/axiosInstance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { authState, AuthState } from "./useAuth";
import { User } from "@/app/types";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import { useFollows } from "./useFollows";

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
  const { follow, unFollow } = useFollows();

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const checkFollowing = async () => {
    try {
      const res = await api.get(`/follows/check_status?name=${name}`);
      const { isFollowing } = camelcaseKeys(res.data);
      setIsFollowing(isFollowing);
    } catch (e) {
      console.error(e);
    }
  };

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${name}`);
      const { data } = res;
      setUser({ ...camelcaseKeys(data, { deep: true }) });
      await checkFollowing();
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
        {
          ...snakecaseKeys({
            ...newUserData,
          }),
          avatar: newUserData.avatar ? newUserData.avatar[0] : null,
        },
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

  const handleFollow = async () => {
    try {
      await follow(name);
      checkFollowing();
      fetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUnFollow = async () => {
    if (user) {
      try {
        await unFollow(user?.id);
        checkFollowing();
        fetch();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    loading,
    user,
    isFollowing,
    fetch,
    update,
    fetchCurrentUser,
    handleFollow,
    handleUnFollow,
  };
};

import { api } from "@/lib/axiosInstance";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";

const inProgressState = atom<boolean>({
  key: "inProgressState",
  default: false,
});

export const useWalking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inProgress, setInProgress] = useRecoilState<boolean>(inProgressState);

  const check = async () => {
    setLoading(true);
    try {
      const res = await api.get("/walks/in_progress");
      const { data } = res;
      setInProgress(data["in_progress"]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const start = async () => {
    setLoading(true);
    try {
      const res = await api.post("/walks/start");
      const { data } = res;
      console.log(data);
      setInProgress(true);
    } catch (e) {
      console.error(e);
    } finally {
      console.log(false);
    }
  };

  const finish = async () => {
    setLoading(true);
    try {
      const res = await api.post("/walks/finish");
      const { data } = res;
      console.log(data);
      setInProgress(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sendCheckpoint = async (lat: number, lng: number) => {
    try {
      const res = await api.post("/checkpoints", { lat, lng });
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  return { loading, inProgress, check, start, finish, sendCheckpoint };
};

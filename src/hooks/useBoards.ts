import { Board } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";
import snakecaseKeys from "snakecase-keys";

type BoardData = {
  category: number;
  species: number;
  breed: string;
  name: string;
  icon: FileList | null;
  age: number;
  date: string;
  images: FileList | null;
  isLocationPublic: boolean;
  lat: number;
  lng: number;
  body: string;
  feature: string;
};

export const useBoards = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[]>([]);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const res = await api.get("/boards");
      const { data } = res;
      setBoards(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const postNewBoard = async (data: BoardData) => {
    setLoading(true);
    try {
      await api.post(
        "/boards",
        {
          ...snakecaseKeys(data),
          icon: data.icon ? data.icon[0] : null,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return { loading, boards, postNewBoard };
};

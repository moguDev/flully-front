import { Board } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";
import snakecaseKeys from "snakecase-keys";

type BoardData = {
  category: string;
  species: number;
  breed: string;
  name: string;
  icon: FileList | null;
  age: number;
  date: string;
  images: File[];
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

  const fetchSearchResults = async (keyword: string) => {
    setLoading(true);
    try {
      const res = await api.get("/boards/search", { params: { keyword } });
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
      const formData = new FormData();
      const snakeCaseData = snakecaseKeys(data);

      Object.keys(snakeCaseData).forEach((key) => {
        if (key !== "images") {
          formData.append(
            key,
            snakeCaseData[key as keyof typeof snakeCaseData] as string | Blob
          );
        }
      });

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append("images[]", image); // 複数の画像を配列として追加
        });
      }

      if (data.icon) {
        formData.append("icon", data.icon[0]);
      }

      await api.post("/boards", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyBoard = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await api.get("/boards/nearby_boards", {
        params: { lat, lng },
      });
      const { data } = res;
      setBoards(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return {
    loading,
    boards,
    postNewBoard,
    fetchNearbyBoard,
    fetchSearchResults,
  };
};

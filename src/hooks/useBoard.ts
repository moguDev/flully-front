import { Board } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";
import snakecaseKeys from "snakecase-keys";

type UpdateData = {
  category: number;
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
  removeImageId: number[];
};

export const useBoard = (boardId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [board, setBoard] = useState<Board | null>(null);
  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/boards/${boardId}`);
      const { data } = res;
      setBoard(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data: UpdateData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const snakeCaseData = snakecaseKeys(data);

      Object.keys(snakeCaseData).forEach((key) => {
        if (key !== "images" && key !== "icon") {
          formData.append(
            key,
            snakeCaseData[key as keyof typeof snakeCaseData] as string | Blob
          );
        }
      });

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append("images[]", image);
        });
      }

      if (data.icon && data.icon.length > 0) {
        formData.append("icon", data.icon[0]);
      }

      await api.put(`/boards/${boardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
  return { loading, board, update };
};

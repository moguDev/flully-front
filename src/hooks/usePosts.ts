import { api } from "@/lib/axiosInstance";
import { useState } from "react";

type PostData = {
  image: FileList | null;
  lat: number;
  lng: number;
  body: string;
  isAnonymous: boolean;
};

// キャメルケースをスネークケースに変換する関数
const camelToSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

// オブジェクトのキーをスネークケースに変換する関数
const convertKeysToSnakeCase = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const snakeKey = camelToSnakeCase(key);
      acc[snakeKey] = obj[key];
      return acc;
    },
    {} as Record<string, any>
  );
};

export const usePosts = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (data: PostData) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/posts",
        {
          post: {
            ...convertKeysToSnakeCase(data),
            image: data.image ? data.image[0] : null,
          },
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, post };
};

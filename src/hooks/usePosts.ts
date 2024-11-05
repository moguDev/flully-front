import { Post } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import { useState } from "react";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

type PostData = {
  image: FileList | null;
  lat: number;
  lng: number;
  body: string;
  isAnonymous: boolean;
};

export const usePosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const post = async (data: PostData) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/posts",
        {
          post: {
            ...snakecaseKeys(data),
            image: data.image ? data.image[0] : null,
          },
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

  const fetchNearByPost = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await api.get("/posts/nearby_posts", {
        params: { lat, lng },
      });
      const { data } = res;
      // 外部ライブラリでキャメルケースに変換
      const camelCasePosts = camelcaseKeys(data.posts, {
        deep: true,
      }) as Post[];
      console.log(camelCasePosts);
      setPosts(camelCasePosts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, post, fetchNearByPost };
};

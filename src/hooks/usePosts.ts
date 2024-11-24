import { Post } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import { atom, useRecoilState } from "recoil";

type PostData = {
  image: FileList | null;
  lat: number;
  lng: number;
  body: string;
  isAnonymous: boolean;
};

const postsState = atom<Post[]>({ key: "postsState", default: [] });

export const usePosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useRecoilState<Post[]>(postsState);

  const postPost = async (data: PostData) => {
    setLoading(true);
    try {
      await api.post(
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
      fetchPosts();
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/posts");
      const { data } = res;
      setPosts(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, postPost, fetchPosts };
};

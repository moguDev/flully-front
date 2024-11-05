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
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostById = async (postId: number): Promise<Post | null> => {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${postId}`);
      const { data } = res;
      setPost({ ...camelcaseKeys(data) });
      return post;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const fetchNearByPost = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await api.get("/posts/nearby_posts", {
        params: { lat, lng },
      });
      const { data } = res;
      const camelCasePosts = camelcaseKeys(data, {
        deep: true,
      }) as Post[];
      setPosts(camelCasePosts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { post, posts, loading, postPost, fetchPostById, fetchNearByPost };
};

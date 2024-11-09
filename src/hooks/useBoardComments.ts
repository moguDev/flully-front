import { BoardComment } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";
import snakecaseKeys from "snakecase-keys";

export const useBoardComments = (boardId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<BoardComment[]>([]);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/board_comments", {
        params: snakecaseKeys({ boardId }),
      });
      const { data } = res;
      setComments(camelcaseKeys(data, { deep: true }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sendComment = async (
    content: string | FileList | { lat: number; lng: number }
  ) => {
    setLoading(true);
    try {
      if (typeof content === "string" || content instanceof FileList) {
        await api.post("/board_comments", snakecaseKeys({ boardId, content }));
      } else if (content && "lat" in content && "lng" in content) {
        await api.post(
          "/board_comments",
          snakecaseKeys({ boardId, ...content })
        );
      } else {
        console.log("Unknown content type");
      }
      fetch();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, comments, sendComment };
};

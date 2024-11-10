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
    content: string | File | { lat: number; lng: number }
  ) => {
    setLoading(true);
    try {
      if (typeof content === "string") {
        await api.post("/board_comments", snakecaseKeys({ boardId, content }));
      } else if (content instanceof File) {
        const formData = new FormData();
        formData.append("board_id", String(boardId)); // board_id を追加
        formData.append("content", content);

        await api.post("/board_comments", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (content && "lat" in content && "lng" in content) {
        // 位置情報の場合も board_id を追加
        await api.post(
          "/board_comments",
          snakecaseKeys({ boardId, ...content }) // board_id を含める
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

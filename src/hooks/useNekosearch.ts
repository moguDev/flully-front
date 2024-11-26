import { NekoSearchBoard } from "@/app/types";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";

const scrapeNekoSearch = async () => {
  try {
    const searchData = await axios.get(
      `${process.env.NEXT_PUBLIC_NEKOSEARCH_API_URL}/?type=search`
    );
    const protectData = await axios.get(
      `${process.env.NEXT_PUBLIC_NEKOSEARCH_API_URL}/?type=protect`
    );
    const extractedData = [
      camelcaseKeys(
        JSON.parse(searchData.data.match(/\{"units":\s*\[\{.*\}\]\}/)).units
      ),
      camelcaseKeys(
        JSON.parse(protectData.data.match(/\{"units":\s*\[\{.*\}\]\}/)).units
      ),
    ].flat();
    return extractedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export const useNekosearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<NekoSearchBoard[] | null>([]);

  const getBoards = async () => {
    setLoading(true);
    try {
      const data = await scrapeNekoSearch();
      setBoards(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  return { loading, boards };
};

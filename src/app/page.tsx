"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const handleStarted = () => {
    router.push("/map");
  };

  // 疎通確認
  useEffect(() => {
    const getStatus = async () => {
      const res = await axiosInstance.get("/status");
      console.log(res);
    };
    getStatus();
  }, []);

  return (
    <main className="bg-main min-h-screen w-screen pt-24">
      <div>
        <h1 className="text-base text-center text-9xl font-bold">flully</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-10 space-y-2">
        <button className="bg-base text-main w-full rounded py-3 active:scale-95 transition-all">
          <span className="text-sm font-bold">ログイン</span>
        </button>
        <button
          className="border border-base w-full text-base rounded py-3 active:scale-95 transition-all"
          onClick={handleStarted}
        >
          <span className="text-sm font-bold">ログインせずはじめる</span>
        </button>
      </div>
    </main>
  );
}

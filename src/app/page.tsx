"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleStarted = () => {
    router.push("/map");
  };

  return (
    <main className="bg-main">
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

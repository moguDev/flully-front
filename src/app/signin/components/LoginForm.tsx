"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  return (
    <div className="space-y-5">
      <form method="post" className="space-y-5 mt-5">
        <div className="flex items-center border-b border-gray-300 py-2">
          <span className="material-icons text-main mr-1">email</span>
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full bg-base outline-none"
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <span className="material-icons text-main mr-1">key</span>
          <input
            type="password"
            placeholder="パスワード"
            className="w-full bg-base outline-none"
          />
        </div>
        <Link href="#" className="text-xs py-1 opacity-60 font-bold underline">
          パスワードを忘れた場合
        </Link>
        <div className="space-y-2">
          <button
            type="submit"
            className="w-full bg-main text-base font-bold rounded py-3 transition-all hover:brightness-105 active:scale-95"
          >
            ログイン
          </button>
          <button
            type="button"
            className="w-full text-main border-2 border-main font-bold rounded py-3 transition-all active:scale-95"
            onClick={() => router.push("/signup")}
          >
            新規アカウント作成
          </button>
        </div>
      </form>
      <button
        className="w-full font-bold text-sm"
        onClick={() => router.back()}
      >
        キャンセル
      </button>
    </div>
  );
};

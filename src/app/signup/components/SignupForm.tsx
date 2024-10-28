"use client";

import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const router = useRouter();
  return (
    <div>
      <form method="post" className="space-y-4">
        <div className="mt-3">
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            flully ID
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">
              alternate_email
            </span>
            <input
              type="text"
              className="w-full bg-base outline-none"
              placeholder="半角英数字4文字以上"
            />
          </div>
        </div>
        <div>
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            アカウント名
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">person</span>
            <input
              type="text"
              className="w-full bg-base outline-none"
              placeholder="アカウント名"
            />
          </div>
        </div>
        <div>
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            メールアドレス
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">email</span>
            <input
              type="email"
              className="w-full bg-base outline-none"
              placeholder="example@flully.jp"
            />
          </div>
        </div>
        <div>
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            パスワード
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">key</span>
            <input
              type="password"
              className="w-full bg-base outline-none"
              placeholder="半角英数字8文字以上"
            />
          </div>
        </div>
        <div>
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            パスワード（確認用）
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">key</span>
            <input
              type="password"
              className="w-full bg-base outline-none"
              placeholder="半角英数字8文字以上"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-main text-base font-bold py-3 rounded text-sm flex items-center justify-center"
        >
          <span className="material-icons mr-1">person_add</span>
          アカウントを作成
        </button>
      </form>
      <button
        className="w-full text-sm py-3 mt-2"
        onClick={() => router.back()}
      >
        キャンセル
      </button>
    </div>
  );
};

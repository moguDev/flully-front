"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const SignupForm = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const defaultValues: FormData = {
    name: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onsubmit = async (data: FormData) => {
    await signup(data).then(() => router.back());
  };

  return (
    <div>
      <form
        method="post"
        onSubmit={handleSubmit(onsubmit)}
        className="space-y-4"
      >
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
              {...register("name", {
                required: "flully IDを入力してください",
                minLength: {
                  value: 4,
                  message: "flully IDは4文字以上にしてください。",
                },
                maxLength: {
                  value: 24,
                  message: "flully IDは24文字以内にしてください。",
                },
              })}
            />
          </div>
          <div className="text-red-500 font-bold text-xs p-1">
            {errors.name?.message}
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
              {...register("nickname", {
                required: "アカウント名を入力してください。",
                maxLength: {
                  value: 32,
                  message: "アカウント名は32文字以内にしてください。",
                },
              })}
            />
          </div>
          <div className="text-red-500 font-bold text-xs p-1">
            {errors.nickname?.message}
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
              {...register("email", {
                required: "メールアドレスを入力してください。",
                pattern: {
                  value: /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                  message: "メールアドレスの形式が不正です。",
                },
              })}
            />
          </div>
          <div className="text-red-500 font-bold text-xs p-1">
            {errors.email?.message}
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
              {...register("password", {
                required: "パスワードを入力してください。",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上にしてください。",
                },
              })}
            />
          </div>
          <div className="text-red-500 font-bold text-xs p-1">
            {errors.password?.message}
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
              {...register("passwordConfirmation", {
                required: "パスワード（確認用）を入力してください。",
              })}
            />
          </div>
          <div className="text-red-500 font-bold text-xs p-1">
            {errors.passwordConfirmation?.message}
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

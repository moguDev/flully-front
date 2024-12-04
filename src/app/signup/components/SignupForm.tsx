"use client";

import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const { loading, signup } = useAuth();
  const { showAlert } = useToast();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const isButtonDisabled = !termsAccepted || !privacyAccepted;

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
    if (isButtonDisabled) {
      showAlert("ご利用規約およびプライバシーポリシーに同意してください");
    } else {
      await signup(data).then(() => router.back());
    }
  };

  return (
    <div className="bg-white px-5 lg:px-10 py-10 rounded-lg shadow-sm">
      <h1 className="text-black font-black flex items-center text-2xl">
        新しいアカウントを作成
      </h1>
      <form
        method="post"
        onSubmit={handleSubmit(onsubmit)}
        className="relative"
      >
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 z-10">
            <Loading />
          </div>
        )}
        <div className="my-6">
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            flully ID
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">
              alternate_email
            </span>
            <input
              type="text"
              className="w-full bg-white outline-none"
              placeholder="半角英数字4文字以上"
              {...register("name", {
                required: "flully IDを入力してください",
                minLength: {
                  value: 4,
                  message: "flully IDは4文字以上にしてください。",
                },
                maxLength: {
                  value: 16,
                  message: "flully IDは16文字以内にしてください。",
                },
              })}
            />
          </div>
          <div className="text-red-500 font-bold text-xs p-1">
            {errors.name?.message}
          </div>
        </div>
        <div className="my-6">
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            アカウント名
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">person</span>
            <input
              type="text"
              className="w-full bg-white outline-none"
              placeholder="アカウント名"
              {...register("nickname", {
                required: "アカウント名を入力してください。",
                minLength: {
                  value: 2,
                  message: "アカウント名は2文字以上にしてください",
                },
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
        <div className="my-6">
          <label htmlFor="flully-id" className="font-bold text-xs text-main">
            メールアドレス
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">email</span>
            <input
              type="email"
              className="w-full bg-white outline-none"
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
        <div className="my-6">
          <label htmlFor="password" className="font-bold text-xs text-main">
            パスワード
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">key</span>
            <input
              type="password"
              className="w-full bg-white outline-none"
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
        <div className="my-6">
          <label
            htmlFor="password-confirmation"
            className="font-bold text-xs text-main"
          >
            パスワード（確認用）
          </label>
          <div className="border-b border-gray-300 flex items-center py-1">
            <span className="material-icons text-main mr-1">key</span>
            <input
              type="password"
              className="w-full bg-white outline-none"
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
        <div className="pb-4">
          <div className="flex items-center pb-1">
            <input
              type="checkbox"
              className="mr-1"
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="text-xs">
              <a
                href="https://flully.jp/terms"
                target="_blank"
                className="text-blue-500 underline"
              >
                ご利用規約
              </a>
              を確認の上、同意しました。
            </label>
          </div>
          <div className="flex items-center pb-1">
            <input
              type="checkbox"
              className="mr-1"
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
            />
            <label className="text-xs">
              <a
                href="https://flully.jp/privacy"
                target="_blank"
                className="text-blue-500 underline"
              >
                プライバシーポリシー
              </a>
              を確認の上、同意しました。
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full text-base font-bold py-3 rounded flex items-center justify-center ${
            isButtonDisabled ? "bg-gray-300" : "bg-main"
          }`}
        >
          <span className="material-icons mr-1">person_add</span>
          アカウントを作成
        </button>
      </form>
      <button className="w-full py-3 mt-2" onClick={() => router.back()}>
        キャンセル
      </button>
    </div>
  );
};

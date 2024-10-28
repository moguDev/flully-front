"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const defaultValues: FormData = { email: "", password: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onsubmit = async (data: FormData) => {
    await login(data.email, data.password).then(() => router.back());
  };

  return (
    <div className="space-y-5">
      <form
        onSubmit={handleSubmit(onsubmit)}
        method="post"
        className="space-y-5 mt-5"
      >
        <div className="flex items-center border-b border-gray-300 py-2">
          <span className="material-icons text-main mr-1">email</span>
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full bg-base outline-none"
            {...register("email", {
              required: "メールアドレスを入力してください",
              pattern: {
                value: /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                message: "メールアドレスの形式が不正です。",
              },
            })}
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <span className="material-icons text-main mr-1">key</span>
          <input
            type="password"
            placeholder="パスワード"
            className="w-full bg-base outline-none"
            {...register("password", {
              required: "パスワードを入力してください。",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上にしてください。",
              },
            })}
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

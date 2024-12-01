"use client";
import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const { loading, login } = useAuth();
  const defaultValues: FormData = { email: "", password: "" };
  const { showSuccess, showAlert } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onsubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      router.push("/map");
      showSuccess("ログインしました");
    } catch {
      showAlert("ログインに失敗しました");
    }
  };

  return (
    <div className="space-y-5 bg-white lg:rounded-lg lg:px-10 px-5 py-10 shadow-sm">
      <h1 className="text-black font-black flex items-center text-2xl">
        ログイン
      </h1>
      <form
        onSubmit={handleSubmit(onsubmit)}
        method="post"
        className="mt-5 relative"
      >
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 z-10">
            <Loading />
          </div>
        )}
        <div className="my-6">
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="material-icons text-main mr-1">email</span>
            <input
              type="email"
              placeholder="メールアドレス"
              className="w-full bg-white outline-none"
              {...register("email", {
                required: "メールアドレスを入力してください",
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
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="material-icons text-main mr-1">key</span>
            <input
              type="password"
              placeholder="パスワード"
              className="w-full bg-white outline-none"
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
          <Link
            href="/reset_password"
            className="text-xs py-1 opacity-60 font-bold underline"
          >
            パスワードを忘れた場合
          </Link>
        </div>
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
      <button className="w-full" onClick={() => router.push("/map")}>
        キャンセル
      </button>
    </div>
  );
};

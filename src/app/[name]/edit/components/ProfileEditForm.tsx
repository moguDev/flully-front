"use client";
import { useParams, useRouter } from "next/navigation";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useForm } from "react-hook-form";
import defaultUserImage from "/public/images/default_avatar.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { showDeleteAccountModal } from "./DeleteAccountModal";

type FormData = {
  avatar: FileList | null;
  name: string;
  nickname: string;
  email: string;
  introduction: string;
  twitter: string;
  location: string;
  isLocationPublic: boolean;
  isMailPublic: boolean;
};

export const ProfileEditForm = () => {
  const router = useRouter();
  const { name } = useParams();
  const { user, update, fetchCurrentUser } = useUserProfiles(name as string);
  const defaultValues: FormData = {
    avatar: null,
    name: user?.name || "",
    nickname: user?.nickname || "",
    email: user?.email || "",
    introduction: user?.introduction || "",
    twitter: user?.twitter || "",
    location: user?.location || "",
    isLocationPublic: user?.isLocationPublic || false,
    isMailPublic: user?.isMailPublic || false,
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFile = watch("avatar");
  const [imageSource, setImageSource] = useState("");

  const onsubmit = async (data: FormData) => {
    await update(data);
    router.push(`/${name}`);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("nickname", user.nickname);
      setValue("email", user.email);
      setValue("introduction", user.introduction);
      setValue("twitter", user.twitter);
      setValue("location", user.location);
      setValue("isLocationPublic", user.isLocationPublic!);
      setValue("isMailPublic", user.isMailPublic!);
    }
  }, [user]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      console.log(imageFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSource(fileReader.result as string);
      };
      fileReader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  return (
    <div>
      <section className="bg-white lg:rounded p-4">
        <h2 className="font-bold text-xl mb-3">プロフィールを編集</h2>
        <form
          method="post"
          className="space-y-4"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div>
            <label className="text-xs text-main font-bold">
              ユーザアイコン
            </label>
            <button
              type="button"
              className="h-24 w-24 rounded-full overflow-hidden block relative"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <Image
                src={imageSource || user?.avatarUrl || defaultUserImage}
                alt="アイコン"
                className="object-cover"
                fill
              />
            </button>
            <input
              type="file"
              accept="image/*"
              {...register("avatar")}
              ref={(e: HTMLInputElement) => {
                register("avatar").ref(e);
                fileInputRef.current = e;
              }}
              hidden
            />
          </div>
          <div>
            <label className="text-xs text-main font-bold">
              flully ID<span className="text-red-600">【必須】</span>
            </label>
            <div className="flex items-center border-b border-gray-300 p-1">
              <span className="material-icons mr-2 text-main">
                alternate_email
              </span>
              <input
                type="text"
                className="w-full outline-none bg-base"
                placeholder="半角英数字4文字以上"
                {...register("name", {
                  required: "flully IDを入力してください",
                  minLength: {
                    value: 4,
                    message: "flully IDは4文字以上にしてください",
                  },
                  maxLength: {
                    value: 16,
                    message: "flully IDは16文字以内にしてください",
                  },
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.name?.message}
            </div>
          </div>
          <div>
            <label className="text-xs text-main font-bold">
              アカウント名<span className="text-red-600">【必須】</span>
            </label>
            <div className="flex items-center border-b border-gray-300 p-1">
              <span className="material-icons mr-2 text-main">person</span>
              <input
                type="text"
                className="w-full outline-none bg-base"
                placeholder="アカウント名"
                {...register("nickname", {
                  required: "アカウント名を入力してください",
                  maxLength: {
                    value: 32,
                    message: "アカウント名は32文字いないにしてください",
                  },
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.nickname?.message}
            </div>
          </div>
          <div>
            <label className="text-xs text-main font-bold">自己紹介</label>
            <div className="flex items-center border-b border-gray-300 p-1">
              <textarea
                className="w-full outline-none bg-base"
                placeholder="自己紹介を登録しましょう！"
                {...register("introduction", {
                  maxLength: {
                    value: 128,
                    message: "自己紹介は128文字以内にしてください",
                  },
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.introduction?.message}
            </div>
          </div>
          <div>
            <label className="text-xs text-main font-bold">
              メールアドレス<span className="text-red-600">【必須】</span>
            </label>
            <div className="flex items-center p-0.5">
              <input
                type="checkbox"
                className="mr-1"
                {...register("isMailPublic")}
              />
              <label className="text-xs font-bold">
                メールアドレスを公開する
              </label>
            </div>
            <div className="flex items-center border-b border-gray-300 p-1">
              <span className="material-icons mr-2 text-main">email</span>
              <input
                type="email"
                className="w-full outline-none bg-base"
                placeholder="example@flully.jp"
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
          <div>
            <label className="text-xs text-main font-bold">Xアカウント</label>
            <div className="flex items-center border-b border-gray-300 p-1">
              <span className="material-icons mr-1 text-main">person</span>
              <input
                type="text"
                className="w-full outline-none bg-base"
                placeholder="https://x.com/***"
                {...register("twitter", {
                  maxLength: {
                    value: 128,
                    message: "128文字以内で入力してください",
                  },
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.twitter?.message}
            </div>
          </div>
          <div>
            <label className="text-xs text-main font-bold">位置情報</label>
            <div className="flex items-center p-0.5">
              <input
                type="checkbox"
                className="mr-1"
                {...register("isLocationPublic")}
              />
              <label className="text-xs font-bold">位置情報を公開する</label>
            </div>
            <div className="flex items-center border-b border-gray-300 p-1">
              <span className="material-icons mr-1 text-main">location_on</span>
              <input
                type="text"
                className="w-full outline-none bg-base"
                placeholder="東京都新宿区"
                {...register("location")}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.location?.message}
            </div>
          </div>
          <div className="space-y-1">
            <button
              type="submit"
              className="bg-main text-base rounded w-full py-3 font-bold text-sm"
            >
              プロフィールを更新
            </button>
            <button
              type="button"
              className="text-main rounded w-full py-3 font-bold text-sm"
              onClick={() => {
                router.push(`/${name}`);
              }}
            >
              キャンセル
            </button>
          </div>
        </form>
      </section>
      <section className="bg-white mt-4 lg:rounded">
        <button
          type="button"
          className="w-full text-sm font-bold rounded flex items-center justify-center text-red-500 transition-all active:scale-95"
          onClick={() => {
            showDeleteAccountModal();
          }}
        >
          <p className="flex items-center py-5">アカウントを削除</p>
        </button>
      </section>
    </div>
  );
};

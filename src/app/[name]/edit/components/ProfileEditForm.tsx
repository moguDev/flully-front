"use client";
import { useParams, useRouter } from "next/navigation";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useForm } from "react-hook-form";
import defaultUserImage from "/public/images/default_avatar.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FormData = {
  avatar: FileList | null;
  name: string;
  nickname: string;
  email: string;
  introduction: string;
  twitter: string;
  location: string;
};

export const ProfileEditForm = () => {
  const router = useRouter();
  const { name } = useParams();
  const { userData, update } = useUserProfiles(name as string);
  const defaultValues: FormData = {
    avatar: null,
    name: userData?.name || "",
    nickname: userData?.nickname || "",
    email: userData?.email || "",
    introduction: userData?.introduction || "",
    twitter: userData?.twitter || "",
    location: userData?.location || "",
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
    if (userData) {
      setValue("name", userData.name);
      setValue("nickname", userData.nickname);
      setValue("email", userData.email);
      setValue("introduction", userData.introduction);
      setValue("twitter", userData.twitter);
      setValue("location", userData.location);
    }
  }, [userData]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSource(fileReader.result as string);
      };
      fileReader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  return (
    <div>
      <h2 className="font-bold text-xl mb-3">プロフィールを編集</h2>
      <form
        method="post"
        className="space-y-4"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div>
          <label className="text-xs text-main font-bold">ユーザアイコン</label>
          <button
            type="button"
            className="h-24 w-24 rounded-full overflow-hidden block relative"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <Image
              src={imageSource || defaultUserImage}
              alt="アイコン"
              className="object-cover"
              fill
            />
          </button>
          <input
            type="file"
            accept="image/*"
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
              })}
            />
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
        </div>
        <div>
          <label className="text-xs text-main font-bold">
            メールアドレス<span className="text-red-600">【必須】</span>
          </label>
          <div className="flex items-center p-0.5">
            <input type="checkbox" className="mr-1" />
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
        </div>
        <div>
          <label className="text-xs text-main font-bold">Xアカウント</label>
          <div className="flex items-center border-b border-gray-300 p-1">
            <span className="material-icons mr-1 text-main">person</span>
            <input
              type="text"
              className="w-full outline-none bg-base"
              placeholder="https://x.com/***"
              {...register("twitter")}
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-main font-bold">位置情報</label>
          <div className="flex items-center p-0.5">
            <input type="checkbox" className="mr-1" />
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
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

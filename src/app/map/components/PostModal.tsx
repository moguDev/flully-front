"use client";
import { usePosts } from "@/hooks/usePosts";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  image: FileList | null;
  body: string;
  isAnonymous: boolean;
};

export const showPostModal = () => {
  const dialog = document.getElementById(
    "postModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closePostModal = () => {
  const dialog = document.getElementById(
    "postModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

export const PostModal = () => {
  const defaultValues: FormData = {
    image: null,
    body: "",
    isAnonymous: false,
  };
  const { loading, postPost } = usePosts();

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm({ defaultValues });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFile = watch("image");
  const [imageSource, setImageSource] = useState("");
  const { showSuccess, showAlert } = useToast();

  const onsubmit = (data: FormData) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            postPost({ ...data, lat, lng });
            closePostModal();
            showSuccess("みつけた動物を投稿しました");
          } catch (e) {
            console.error(e);
            showAlert("投稿に失敗しました");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("位置情報の取得に失敗しました。");
        }
      );
    } else {
      alert("位置情報が利用できません。");
    }
  };

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
    <dialog id="postModal" className="modal space-y-1">
      <div className="modal-box bg-base rounded p-3 relative overflow-hidden">
        <h3 className="font-bold text-lg p-2">みつけた動物</h3>
        <form
          method="postPost"
          onSubmit={handleSubmit(onsubmit)}
          className="relative"
        >
          {loading && (
            <div className="absolute top-0 left-0 h-full w-full bg-white bg-opacity-50 z-10" />
          )}
          <div
            className="bg-gray-200 flex items-center justify-center w-full h-80 rounded relative"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            {imageSource ? (
              <Image
                src={imageSource}
                alt="アイコン"
                className="object-cover"
                fill
              />
            ) : (
              <p className="text-gray-400 font-bold">写真を追加</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            ref={(e: HTMLInputElement) => {
              register("image").ref(e);
              fileInputRef.current = e;
            }}
            hidden
          />
          <div className="space-y-1 divide-y divide-gray-200">
            <div className="py-2">
              <label
                className="text-gray-500 font-bold"
                style={{ fontSize: "10px" }}
              >
                みつけた場所
              </label>
              <div className="flex items-center">
                <span className="material-icons">location_on</span>
                <p className="outline-none font-bold text-sm select-none bg-base w-full">
                  {"大阪市中央区"}
                </p>
              </div>
            </div>
            <div className="py-2">
              <label
                className="text-gray-500 font-bold"
                style={{ fontSize: "10px" }}
              >
                本文
              </label>
              <div className="flex items-center">
                <textarea
                  className="outline-none font-bold bg-gray-100 rounded text-sm select-none w-full p-1"
                  {...register("body", {
                    maxLength: {
                      value: 64,
                      message: "本文は64文字以内にしてください",
                    },
                  })}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <input
                type="checkbox"
                className="mr-1"
                {...register("isAnonymous")}
              />
              <label
                className="text-gray-500 font-bold"
                style={{ fontSize: "10px" }}
              >
                アカウント名を非公開で投稿する
              </label>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="rounded font-bold w-full p-2 flex items-center justify-center"
              onClick={() => {
                closePostModal();
              }}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-main rounded text-base font-bold w-full p-2 flex items-center justify-center transition-all active:scale-95"
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

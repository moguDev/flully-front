"use client";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { usePosts } from "@/hooks/usePosts";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleMap } from "@react-google-maps/api";

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
  const [step, setStep] = useState<1 | 2 | 3>(1);
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
    formState: { errors },
  } = useForm({ defaultValues });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFile = watch("image");
  const [imageSource, setImageSource] = useState("");
  const { showSuccess, showAlert } = useToast();

  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useGoogleMaps();
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 35.6895,
    lng: 139.6917,
  });

  const onsubmit = (data: FormData) => {
    if (!imageFile) {
      setStep(1);
      showAlert("写真を選択してください");
      return;
    }
    if (mapRef.current) {
      try {
        // マップの中央の座標を取得
        const center = mapRef.current.getCenter();
        const lat = center?.lat() ?? 35.6895; // デフォルト値を指定
        const lng = center?.lng() ?? 139.6917; // デフォルト値を指定

        // 取得した座標をpostPostに渡す
        postPost({ ...data, lat, lng });
        closePostModal();
        showSuccess("みつけた動物を投稿しました");
      } catch (e) {
        console.error(e);
        showAlert("投稿に失敗しました");
      }
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("現在地の取得に失敗しました:", error);
        setCenter({ lat: 35.6895, lng: 139.6917 });
      }
    );
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <dialog id="postModal" className="modal space-y-1">
      <div className="modal-box max-w-md mx-auto bg-base rounded-lg p-3 relative overflow-hidden">
        <h3 className="font-bold text-xl p-2">みつけた動物</h3>
        <form
          method="postPost"
          onSubmit={handleSubmit(onsubmit)}
          className="relative px-2"
        >
          {loading && (
            <div className="absolute top-0 left-0 h-full w-full bg-white bg-opacity-50 z-10" />
          )}
          {step === 1 && (
            <section>
              <label className="text-gray-400 font-bold text-xs my-1">
                みつけた動物の写真
              </label>
              <div
                className="bg-gray-100 flex items-center justify-center w-full h-80 rounded relative cursor-pointer transition-all active:scale-95"
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
                  <div className="text-gray-300 font-bold text-center">
                    <p className="material-icons" style={{ fontSize: "96px" }}>
                      photo
                    </p>
                    <p>写真を追加</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "画像を選択してください" })}
                ref={(e: HTMLInputElement) => {
                  register("image").ref(e);
                  fileInputRef.current = e;
                }}
                hidden
              />
            </section>
          )}
          {step === 2 && (
            <section>
              <label className="text-gray-500 font-bold text-xs">本文</label>
              <div className="flex items-center">
                <textarea
                  className="outline-none font-bold bg-gray-100 rounded text-sm select-none w-full h-44 p-1"
                  {...register("body", {
                    maxLength: {
                      value: 64,
                      message: "本文は64文字以内にしてください",
                    },
                  })}
                />
              </div>
              <div className="text-red-500 font-bold text-xs p-1">
                {errors.body?.message}
              </div>
            </section>
          )}
          {step === 3 && (
            <section>
              <label className="text-gray-500 font-bold text-xs">
                みつけた場所
              </label>
              <div className="relative w-full h-72 border border-gray-200 rounded">
                <GoogleMap
                  center={center}
                  zoom={16}
                  onLoad={(map) => {
                    mapRef.current = map;
                  }}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  options={{
                    disableDefaultUI: true,
                  }}
                />
                <div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-main font-black"
                  style={{ fontSize: "24px" }}
                >
                  +
                </div>
              </div>
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  className="mr-1"
                  {...register("isAnonymous")}
                />
                <label
                  className="text-gray-500 font-bold text-sm"
                  style={{ fontSize: "10px" }}
                >
                  アカウント名を非公開で投稿する
                </label>
              </div>
            </section>
          )}
          <div className="flex items-center justify-center py-2">
            <div
              className={`rounded-full mx-1 my-2 ${step === 1 ? "h-3 w-3 bg-main" : "h-2 w-2 bg-gray-300"} cursor-pointer`}
              onClick={() => setStep(1)}
            />
            <div
              className={`rounded-full mx-1 my-2 ${step === 2 ? "h-3 w-3 bg-main" : "h-2 w-2 bg-gray-300"} cursor-pointer`}
              onClick={() => setStep(2)}
            />
            <div
              className={`rounded-full mx-1 my-2 ${step === 3 ? "h-3 w-3 bg-main" : "h-2 w-2 bg-gray-300"} cursor-pointer`}
              onClick={() => setStep(3)}
            />
          </div>
          <div className="flex items-center">
            {step === 1 ? (
              <button
                key="cancel_button"
                type="button"
                className="rounded font-bold w-full p-2 flex items-center justify-center"
                onClick={() => {
                  closePostModal();
                }}
              >
                キャンセル
              </button>
            ) : (
              <button
                key={"back_button"}
                type="button"
                className="rounded font-bold w-full p-2 flex items-center justify-center"
                onClick={() => {
                  if (step === 2) {
                    setStep(1);
                  } else if (step === 3) {
                    setStep(2);
                  }
                }}
              >
                もどる
              </button>
            )}
            {step === 3 ? (
              <button
                key={"submit_button"}
                type="submit"
                className="bg-main rounded text-base font-bold w-full p-2 flex items-center justify-center transition-all active:scale-95"
              >
                投稿する
              </button>
            ) : (
              <button
                key={"next_button"}
                type="button"
                className="bg-main rounded text-base font-bold w-full p-2 flex items-center justify-center transition-all active:scale-95"
                onClick={() => {
                  if (step === 1) {
                    setStep(2);
                  } else if (step === 2) {
                    setStep(3);
                  }
                }}
              >
                次へ
              </button>
            )}
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

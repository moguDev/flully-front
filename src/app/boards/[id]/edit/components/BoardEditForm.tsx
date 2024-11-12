"use client";
import Image, { StaticImageData } from "next/image";
import dogIcon from "/public/images/ic_dog.png";
import catIcon from "/public/images/ic_cat.png";
import birdIcon from "/public/images/ic_bird.png";
import rabbitIcon from "/public/images/ic_rabbit.png";
import { useEffect, useRef, useState } from "react";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useBoard } from "@/hooks/useBoard";

type FormData = {
  category: number;
  breed: string;
  name: string;
  icon: FileList | null;
  age: string;
  date: string;
  isLocationPublic: boolean;
  body: string;
  feature: string;
  images: FileList | null;
};

const SPECIES_LIST = [
  { icon: dogIcon, label: "いぬ" },
  { icon: catIcon, label: "ねこ" },
  { icon: birdIcon, label: "とり" },
  { icon: rabbitIcon, label: "うさぎ" },
  { icon: dogIcon, label: "その他" },
];

const SpeciesButton = ({
  icon,
  label,
  selected,
}: {
  icon: StaticImageData;
  label: string;
  selected: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded p-2 w-full transition-all ${selected ? "bg-main bg-opacity-30" : "opacity-30"}`}
    >
      <div className="h-12 w-12 relative">
        <Image src={icon} alt="cat_icon" className="object-cover" fill />
      </div>
      <p className="font-bold text-xs text-center">{label}</p>
    </div>
  );
};

export const BoardEditForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const { board, update } = useBoard(parseInt(id as string));
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError } = useGoogleMaps();
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 35.6895,
    lng: 139.6917,
  });
  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState<number>(0);
  const defaultValues: FormData = {
    category: 0,
    breed: "",
    name: "",
    icon: null,
    age: "",
    date: "",
    isLocationPublic: false,
    body: "",
    feature: "",
    images: null,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ defaultValues });
  const iconInputRef = useRef<HTMLInputElement | null>(null);
  const iconFile = watch("icon");
  const [iconSource, setIconSource] = useState<string>("");

  const imagesInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageSources, setImageSources] = useState<string[]>([]);
  const images = watch("images");

  const onsubmit = async (data: FormData) => {
    if (!center) return;
    const formData = {
      category: data.category,
      species: selectedSpeciesIndex,
      breed: data.breed,
      name: data.name,
      icon: data.icon,
      age: parseInt(data.age),
      date: data.date,
      images: imageFiles,
      isLocationPublic: !data.isLocationPublic,
      lat: center.lat,
      lng: center.lng,
      feature: data.feature,
      body: data.body,
    };
    await update(formData);
    router.push("/boards");
  };

  useEffect(() => {
    if (iconFile && iconFile[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => setIconSource(fileReader.result as string);
      fileReader.readAsDataURL(iconFile[0]);
    }
  }, [iconFile]);

  useEffect(() => {
    if (board) {
      switch (board.species) {
        case "犬":
          setSelectedSpeciesIndex(0);
          break;
        case "猫":
          setSelectedSpeciesIndex(1);
          break;
        case "鳥":
          setSelectedSpeciesIndex(2);
          break;
        case "うさぎ":
          setSelectedSpeciesIndex(3);
          break;
        default:
          break;
      }
      setValue("breed", board.breed);
      setValue("name", board.name);
      setValue("age", board.age.toString());
      setValue("feature", board.feature);
      setValue("date", board.date);
      setCenter({ lat: board.lat as number, lng: board.lng as number });
      setValue("body", board.body);
    }
  }, [board]);

  useEffect(() => {
    if (images && images[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () =>
        setImageSources((prev) => [...prev, fileReader.result as string]);
      setImageFiles((prev) => [...prev, images[0]]);
      fileReader.readAsDataURL(images[0]);
    }
  }, [images]);

  useEffect(() => {
    if (isLoaded && mapRef.current && center) {
      new google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
        disableDefaultUI: true,
        gestureHandling: "greedy",
        draggable: true,
        scrollwheel: true,
      });
    }
  }, [isLoaded, center]);

  if (loadError) {
    return <div>Google Mapsの読み込み中にエラーが発生しました。</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        className="text-main flex items-center"
        onClick={() => router.push(`/boards/${board?.id}`)}
      >
        <span className="material-icons">keyboard_arrow_left</span>
        掲示板にもどる
      </button>
      <h1 className="text-2xl font-bold my-4">掲示板を編集</h1>
      <form method="post" onSubmit={handleSubmit(onsubmit)}>
        <section className="divide-y">
          <div className="flex items-center space-x-2 py-1">
            <div>
              <input
                type="radio"
                value={0}
                {...register("category")}
                className="mr-1"
                defaultChecked
              />
              <label className="font-bold">まいご</label>
            </div>
            <div>
              <input
                type="radio"
                value={1} // "1" に設定
                {...register("category")}
                className="mr-1"
              />
              <label className="font-bold">保護</label>
            </div>
            <div>
              <input
                type="radio"
                value={2} // "2" に設定
                {...register("category")}
                className="mr-1"
              />
              <label className="font-bold">目撃</label>
            </div>
          </div>
          <div className="py-1">
            <label className="text-sm font-bold">分類</label>
            <div className="flex items-center">
              {SPECIES_LIST.map((species, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-1/5"
                  onClick={() => setSelectedSpeciesIndex(index)}
                >
                  <SpeciesButton
                    icon={species.icon}
                    label={species.label}
                    selected={index === selectedSpeciesIndex}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">種類</label>
            <div>
              <input
                type="text"
                placeholder="いなくなったペットの種類"
                className="w-full p-2 bg-gray-100 rounded outline-none"
                {...register("breed", {
                  required: "ペットの種類を入力してください",
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.breed?.message}
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">掲載用のアイコン</label>
            <div
              className="h-16 w-16 rounded-full bg-gray-200 bg-opacity-50 relative overflow-hidden"
              onClick={() => {
                iconInputRef.current?.click();
              }}
            >
              {iconSource || board?.iconUrl ? (
                <Image
                  src={iconSource || (board?.iconUrl as string)}
                  alt="icon"
                  className="object-cover"
                  fill
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <span
                    className="material-icons text-gray-300"
                    style={{ fontSize: "32px" }}
                  >
                    add_photo_alternate
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              {...register("icon")}
              ref={(e: HTMLInputElement) => {
                register("icon").ref(e);
                iconInputRef.current = e;
              }}
              hidden
            />
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">名前</label>
            <div>
              <input
                type="text"
                placeholder="いなくなったペットの名前"
                className="w-full p-2 bg-gray-100 rounded outline-none"
                {...register("name", {
                  required: "ペットの名前を入力してください",
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.name?.message}
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">年齢</label>
            <div>
              <input
                type="number"
                placeholder="年齢"
                className="p-2 bg-gray-100 rounded mr-1 w-14 outline-none"
                {...register("age", {
                  required: "ペットの年齢を入力してください。",
                })}
              />
              <label className="font-bold">歳</label>
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.age?.message}
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">ペットの特徴</label>
            <div>
              <input
                type="text"
                placeholder="色や特徴などを記述してください"
                className="w-full p-2 bg-gray-100 rounded outline-none"
                {...register("feature", {
                  required: "ペットの特徴を入力してください",
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.name?.message}
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">いなくなった日時</label>
            <div>
              <input
                type="datetime-local"
                placeholder="年齢"
                className="w-full p-2 bg-gray-100 rounded mr-1 outline-none"
                {...register("date", {
                  required: "日時を入力してください。",
                })}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.date?.message}
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">いなくなった場所</label>
            <div className="flex items-center p-1">
              <input
                type="checkbox"
                className="mr-1"
                {...register("isLocationPublic")}
              />
              <label className="text-xs">正確な位置情報を共有しない</label>
            </div>
            {isLoaded && center ? (
              <div className="relative border border-gray-200 bg-gray-100 rounded w-full h-64">
                <div ref={mapRef} className="absolute inset-0"></div>
                {/* 中央の「+」マーク */}
                <div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500"
                  style={{ fontSize: "24px" }}
                >
                  +
                </div>
              </div>
            ) : (
              <p>地図を読み込んでいます...</p>
            )}
            {center && (
              <p className="text-xs mt-2">
                中心の位置: 緯度 {center.lat.toFixed(6)}, 経度{" "}
                {center.lng.toFixed(6)}
              </p>
            )}
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">いなくなった時の状況</label>
            <div>
              <textarea
                placeholder="いなくなった時の状況を記述してください。"
                className="w-full p-2 bg-gray-100 rounded outline-none"
                {...register("body")}
              />
            </div>
            <div className="text-red-500 font-bold text-xs p-1">
              {errors.breed?.message}
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">
              いなくなったペットの写真
            </label>
            <div className="grid grid-cols-4 h-max">
              <div
                className="bg-gray-100 w-full h-28 rounded p-1 flex flex-col items-center justify-center text-gray-400"
                onClick={() => {
                  imagesInputRef.current?.click();
                }}
              >
                <span className="material-icons" style={{ fontSize: "36px" }}>
                  camera_alt
                </span>
                <p className="text-xs font-bold p-0.5">写真を追加</p>
              </div>
              {imageSources.map((src, index) => (
                <div
                  key={index}
                  className="relative"
                  onClick={() => {
                    setImageSources((prev) => prev.splice(index, index));
                  }}
                >
                  <Image
                    src={src}
                    alt={`Preview ${index}`}
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
              {board?.images.map((src, index) => (
                <div
                  key={index}
                  className="relative"
                  onClick={() => {
                    setImageSources((prev) => prev.splice(index, index));
                  }}
                >
                  <button className="material-icons rounded-full h-2 w-2 p-1 absolute top-0 right-1 z-10">
                    <p className="bg-black text-white">close</p>
                  </button>
                  <Image
                    src={src}
                    alt={`Preview ${index}`}
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              {...register("images")}
              ref={(e: HTMLInputElement) => {
                register("images").ref(e);
                imagesInputRef.current = e;
              }}
              hidden
            />
          </div>
        </section>
        <div className="flex items-center">
          <button
            type="button"
            className="p-3 w-1/2 font-bold"
            onClick={() => {
              router.back();
            }}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-main p-3 text-white font-bold w-1/2 rounded"
          >
            掲示板を作成
          </button>
        </div>
      </form>
    </div>
  );
};

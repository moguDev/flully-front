"use client";
import Image from "next/image";
import dogIcon from "/public/images/ic_dog.png";
import catIcon from "/public/images/ic_cat.png";
import birdIcon from "/public/images/ic_bird.png";
import rabbitIcon from "/public/images/ic_rabbit.png";
import { useEffect, useRef, useState } from "react";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useBoard } from "@/hooks/useBoard";
import { showBoardDeleteModal } from "./BoardDeleteModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { GoogleMap } from "@react-google-maps/api";
import { SpeciesButton } from "@/app/boards/new/components/NewBoardForm";

type FormData = {
  category: string;
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

const formattedDate = (date: string) => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hour = String(dateObj.getHours()).padStart(2, "0");
  const minute = String(dateObj.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

const StatusButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`px-2 py-1 rounded cursor-pointer transition-all ${selected ? "bg-main  bg-opacity-20" : "opacity-50"}`}
      onClick={onClick}
    >
      <p className="text-sm font-bold">{label}</p>
    </div>
  );
};

export const BoardEditForm = () => {
  const { authState } = useAuth();
  const { name } = authState;
  const { showSuccess, showAlert } = useToast();

  const [categoryText, setCategoryText] = useState<string>("いなくなった");
  const router = useRouter();
  const { id } = useParams();
  const { loading, board, update } = useBoard(parseInt(id as string));

  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useGoogleMaps();
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 35.6895,
    lng: 139.6917,
  });

  const [selectdStatusIndex, setSelectedStatusIndex] = useState<number>(0);

  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState<number>(0);
  const defaultValues: FormData = {
    category: "0",
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
  const [removeImageId, setRemoveImageId] = useState<number[]>([]);
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
  const category = watch("category");

  const onsubmit = async (data: FormData) => {
    if (!center) return;
    if (mapRef.current) {
      try {
        const center = mapRef.current.getCenter();
        const lat = center?.lat() ?? 35.6895;
        const lng = center?.lng() ?? 139.6917;
        const formData = {
          status: selectdStatusIndex,
          category: data.category,
          species: selectedSpeciesIndex,
          breed: data.breed,
          name: data.name,
          icon: data.icon,
          age: parseInt(data.age),
          date: data.date,
          images: imageFiles,
          isLocationPublic: !data.isLocationPublic,
          lat: lat,
          lng: lng,
          feature: data.feature,
          body: data.body,
          removeImageId: removeImageId,
        };
        await update(formData);
        router.push(`/boards/${board?.id}`);
        showSuccess("掲示板を更新しました");
      } catch (e) {
        console.error(e);
        showAlert("掲示板の更新に失敗しました");
      }
    }
  };

  useEffect(() => {
    switch (category) {
      case "0":
        setCategoryText("いなくなった");
        break;
      case "1":
        setCategoryText("保護した");
        break;
      case "2":
        setCategoryText("目撃した");
        break;
      default:
        setCategoryText("いなくなった");
        break;
    }
  }, [category]);

  useEffect(() => {
    if (iconFile && iconFile[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => setIconSource(fileReader.result as string);
      fileReader.readAsDataURL(iconFile[0]);
    }
  }, [iconFile]);

  useEffect(() => {
    if (board) {
      switch (board.status) {
        case "未解決":
          setSelectedStatusIndex(0);
          break;
        case "解決済み":
          setSelectedStatusIndex(1);
          break;
        case "掲載終了":
          setSelectedStatusIndex(2);
          break;
        default:
          break;
      }
      switch (board.category) {
        case "迷子":
          setValue("category", "0");
          break;
        case "保護":
          setValue("category", "1");
          break;
        case "目撃":
          setValue("category", "2");
          break;
        default:
          break;
      }
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
      setValue("date", formattedDate(board.date));
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

  // 掲示板の作成者じゃない場合は画面から戻る
  if (board && board?.user.name !== name) {
    router.push("/boards");
    showAlert("編集する権限がありません。");
  }

  return (
    <div>
      <section className="my-2">
        <button
          className="flex items-center"
          onClick={() => router.push(`/boards/${board?.id}`)}
        >
          <span className="material-icons">keyboard_arrow_left</span>
          掲示板にもどる
        </button>
      </section>
      <section className="relative bg-white rounded-lg p-4 shadow-sm">
        {loading && (
          <div className="flex items-center justify-center absolute top-0 left-0 h-full w-full bg-white opacity-70 z-10">
            <span className="loading loading-spinner loading-sm mr-1" />
            <p className="text-xs">掲示板を作成しています</p>
          </div>
        )}
        <h1 className="lg:text-2xl text-xl font-bold my-4">掲示板を編集</h1>
        <form method="post" onSubmit={handleSubmit(onsubmit)}>
          <div className="flex items-center space-x-2 pb-4">
            <StatusButton
              label="未解決"
              selected={selectdStatusIndex === 0}
              onClick={() => setSelectedStatusIndex(0)}
            />
            <StatusButton
              label="解決済み"
              selected={selectdStatusIndex === 1}
              onClick={() => setSelectedStatusIndex(1)}
            />
            <StatusButton
              label="掲載終了"
              selected={selectdStatusIndex === 2}
              onClick={() => setSelectedStatusIndex(2)}
            />
          </div>
          <section className="divide-y">
            <div className="py-1">
              <div className="flex items-center space-x-2">
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
              <label className="text-sm font-bold">
                {categoryText}ペットの写真
              </label>
              <div className="flex items-center overflow-x-auto space-x-1 flex-nowrap">
                <div
                  className="bg-gray-100 min-w-28 h-32 rounded p-1 flex flex-col items-center justify-center text-gray-400 cursor-pointer"
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
                    className="relative h-32 min-w-28 overflow-hidden rounded"
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
                {board?.images.map(
                  (image, index) =>
                    !removeImageId.includes(image.id) && (
                      <div
                        key={index}
                        className="relative h-32 min-w-28 overflow-hidden rounded"
                        onClick={() => {
                          setImageSources((prev) => prev.splice(index, index));
                        }}
                      >
                        <button
                          className="material-icons rounded-full h-2 w-2 p-1 absolute top-0 right-4 z-10"
                          onClick={() => {
                            setRemoveImageId((prev) => [...prev, image.id]);
                          }}
                        >
                          <p
                            className="bg-black text-white"
                            style={{ fontSize: "16px" }}
                          >
                            cancel
                          </p>
                        </button>
                        <Image
                          src={image.url}
                          alt={`Preview ${index}`}
                          className="object-cover"
                          fill
                        />
                      </div>
                    )
                )}
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
                className="h-16 w-16 rounded-full bg-gray-200 bg-opacity-50 relative overflow-hidden cursor-pointer"
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
            {category === "0" && (
              <>
                <div className="py-2">
                  <label className="text-sm font-bold">名前</label>
                  <div>
                    <input
                      type="text"
                      placeholder={`${categoryText}ペットの名前`}
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
              </>
            )}
            <div className="py-2">
              <label className="text-sm font-bold">
                {categoryText}ペットの特徴
              </label>
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
              <label className="text-sm font-bold">{categoryText}日時</label>
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
              <label className="text-sm font-bold">{categoryText}場所</label>
              <div className="flex items-center p-1">
                <input
                  type="checkbox"
                  className="mr-1"
                  {...register("isLocationPublic")}
                />
                <label className="text-xs">正確な位置情報を共有しない</label>
              </div>
              <div className="relative w-full h-72 border border-gray-200 rounded">
                <GoogleMap
                  center={center}
                  zoom={16}
                  onLoad={(map) => {
                    mapRef.current = map;
                  }}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  options={{
                    gestureHandling: "greedy",
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
            </div>
            <div className="py-2">
              <label className="text-sm font-bold">
                {categoryText}時の状況
              </label>
              <div>
                <textarea
                  placeholder={`${categoryText}時の状況を記述してください。`}
                  className="w-full p-2 bg-gray-100 rounded outline-none"
                  {...register("body")}
                />
              </div>
              <div className="text-red-500 font-bold text-xs p-1">
                {errors.breed?.message}
              </div>
            </div>
          </section>
          <div className="flex items-center mt-4">
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
              掲示板を更新
            </button>
          </div>
        </form>
      </section>
      <section className="bg-white rounded-lg mt-4 shadow-sm">
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="text-red-500 text-sm font-bold p-4 flex items-center transition-all active:scale-95"
            onClick={showBoardDeleteModal}
          >
            <span className="material-icons" style={{ fontSize: "20px" }}>
              delete
            </span>
            掲示板を削除する
          </button>
        </div>
      </section>
    </div>
  );
};

"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import defaultUserImage from "/public/images/default_avatar.png";
import Loading from "@/app/loading";
import { useBookmark } from "@/hooks/useBookmark";
import { HalfModal } from "./HarfModal";
import { SelectLocationModal } from "./SelectLocationModal";
import { useBoard } from "@/hooks/useBoard";
import { useAuth } from "@/hooks/useAuth";
import { CommentViewer } from "./CommentViewer";

export const BoardDetail = () => {
  const { id } = useParams();
  const { name: userName } = useAuth();
  const { loading, board } = useBoard(parseInt(id as string));
  const router = useRouter();
  const {
    loading: bookmarkLoading,
    bookmarked,
    bookmark,
    unbookmark,
  } = useBookmark(parseInt(id as string));

  const getGoogleMapImageUrl = (lat: number, lng: number, zoom = 16) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // 環境変数にAPIキーを設定
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${apiKey}`;
  };

  return loading ? (
    <Loading />
  ) : board ? (
    <div className="lg:flex">
      <div className="max-w-3xl mx-auto p-2">
        <section>
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center justify-between w-full">
              <button
                className="flex items-center text-gray-500"
                onClick={() => router.push("/boards")}
              >
                <span className="material-icons">keyboard_arrow_left</span>
                <p>掲示板一覧</p>
              </button>
              {board.user.name === userName && (
                <button
                  className="border border-main text-main py-0.5 px-3 rounded-full text-sm font-bold"
                  onClick={() => router.push(`/boards/${board.id}/edit`)}
                >
                  編集する
                </button>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="h-28 min-w-28 overflow-hidden rounded-full relative">
              <Image
                src={board.iconUrl}
                alt={board.name}
                className="object-cover"
                fill
              />
            </div>
            <div className="pl-2 py-1 w-full">
              <div className="flex items-center justify-between pb-1">
                <p className="text-2xl font-bold">{board?.name}</p>
                <div className="flex items-center space-x-1">
                  <p
                    className={`px-2 py-0.5 rounded-md text-white text-xs font-bold ${board.category === "迷子" ? "bg-red-500" : board.category === "保護" ? "bg-blue-500" : "bg-green-500"}`}
                  >
                    {board.category}
                  </p>
                  <p className="bg-gray-400 px-3 py-0.5 rounded-md text-white text-xs font-bold">
                    {board.status}
                  </p>
                </div>
              </div>
              <ul>
                <li className="text-base font-bold text-gray-400">
                  分類：<span className="text-black">{board.breed}</span>
                </li>
                <li className="text-base font-bold text-gray-400">
                  年齢：<span className="text-black">{board.age}歳</span>
                </li>
                <li className="text-base font-bold text-gray-400">
                  特徴：<span className="text-black">{board.feature}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-1">
              <button className="bg-black text-white px-2 py-1 rounded-md border border-black text-xs font-bold transition-all active:scale-95">
                Xでシェアする
              </button>
              <div className="relative">
                {bookmarkLoading && (
                  <div className="bg-white opacity-50 h-full w-full absolute top-0 left-0 z-10" />
                )}
                <button
                  className={`${bookmarked ? "bg-main text-white" : "text-main"} px-2 py-1 rounded-md border border-main text-xs font-bold flex items-center transition-all active:scale-95`}
                  onClick={() => {
                    if (bookmarked) {
                      unbookmark();
                    } else {
                      bookmark();
                    }
                  }}
                >
                  <span className="material-icons" style={{ fontSize: "14px" }}>
                    bookmark
                  </span>
                  ブックマーク{bookmarked ? "中" : "する"}
                </button>
              </div>
            </div>
            <button
              className="flex items-center"
              onClick={() => router.push(`/${board.user.name}`)}
            >
              <div className="h-5 w-5 rounded-full overflow-hidden object-cover relative mr-0.5">
                <Image
                  src={board.user.avatarUrl || defaultUserImage}
                  alt={board.user.nickname}
                  className="object-cover"
                  fill
                />
              </div>
              <p className="font-bold text-sm">{board.user.nickname}</p>
            </button>
          </div>
        </section>
        <section className="py-2">
          <div className="flex items-center">
            {board.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`h-28 w-28 relative overflow-hidden ${index === 0 && "rounded-l"} ${index === 2 && board.images.length < 4 && "rounded-r"}`}
              >
                {image ? (
                  <Image
                    src={image.url}
                    alt={`image_${index}`}
                    className="object-cover"
                    fill
                  />
                ) : null}
              </div>
            ))}
            {board.images.length > 3 && (
              <div className="h-28 w-28 relative overflow-hidden rounded-r">
                <div className="flex items-center justify-center absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 z-10">
                  <p className="text-white text-xs font-bold">すべて見る</p>
                </div>
                <Image
                  src={board.images[3].url}
                  alt="more_image"
                  className="object-cover"
                  fill
                />
              </div>
            )}
          </div>
        </section>
        <section className="space-y-3">
          <div>
            <label className="text-gray-400 text-sm font-bold">
              いなくなった日時
            </label>
            <p className="text-black font-bold">{board.formatedDate} 頃</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm font-bold">
              いなくなった場所
            </label>
            <p className="text-black font-bold">{board.location}</p>
            {board.lat && board.lng && (
              <div className="mt-2">
                <Image
                  src={getGoogleMapImageUrl(board.lat, board.lng)}
                  alt="Google Map"
                  width={600}
                  height={300}
                  className="rounded-md border border-main"
                />
              </div>
            )}
          </div>
          <div>
            <label className="text-gray-400 text-sm font-bold">
              いなくなった時の状況
            </label>
            <p className="text-black font-bold">{board.body}</p>
          </div>
        </section>
      </div>
      <div className="max-w-2xl mx-auto lg:block hidden border border-gray-300 rounded-lg">
        <div></div>
        <div className="max-h-96 overflow-y-auto">
          <CommentViewer boardId={parseInt(id as string)} />
        </div>
      </div>
      <div className="lg:hidden">
        <HalfModal open={false}>
          <CommentViewer boardId={parseInt(id as string)} />
        </HalfModal>
      </div>
      <SelectLocationModal boardId={parseInt(id as string)} />
    </div>
  ) : (
    <div>読み込み中...</div>
  );
};

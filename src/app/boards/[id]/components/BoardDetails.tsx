"use client";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import defaultUserImage from "/public/images/default_avatar.png";
import Loading from "@/app/loading";
import { useBookmark } from "@/hooks/useBookmark";
import { HalfModal } from "./HarfModal";
import { SelectLocationModal } from "./SelectLocationModal";
import { useBoard } from "@/hooks/useBoard";
import { useAuth } from "@/hooks/useAuth";
import { CommentViewer } from "./CommentViewer";
import { useToast } from "@/hooks/useToast";
import XIcon from "@mui/icons-material/X";
import { removeParamsFromUrl } from "@/lib";

export const BoardDetail = () => {
  const { id } = useParams();
  const { authState } = useAuth();
  const { isAuthenticated, name: userName } = authState;
  const { loading, board } = useBoard(parseInt(id as string));
  const router = useRouter();
  const { requireSignin } = useToast();
  const {
    loading: bookmarkLoading,
    bookmarked,
    bookmark,
    unbookmark,
  } = useBookmark(parseInt(id as string));
  const pathName = usePathname();
  const currentUrl = `https://flully.jp${pathName}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `【${board?.category}情報】${board?.location}
  ${board?.category == "迷子" ? `${board?.breed}の「${board?.name}」を探しています。` : `${board?.breed}を${board?.category}しました。`}
  
  ・${board?.breed}
  ・${board?.feature}

  リンク先のページの掲示板に情報の提供を心よりお待ちしております。
  `
  )}&url=${encodeURIComponent(currentUrl)}`;

  const getGoogleMapImageUrl = (lat: number, lng: number, zoom = 16) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${apiKey}`;
  };

  return loading ? (
    <Loading />
  ) : board ? (
    <>
      <div className="h-14 flex items-center justify-between">
        <button
          className="flex items-center text-gray-500 mb-4"
          onClick={() => router.push("/boards")}
        >
          <span className="material-icons">keyboard_arrow_left</span>
          <p>掲示板一覧</p>
        </button>
        {board.user.name === userName && (
          <button
            className="bg-gray-100 text-sm text-gray-500 px-3 py-1 rounded-full my-2 transition-all active:scale-95"
            onClick={() => router.push(`/boards/${board.id}/edit`)}
          >
            <p className="flex items-center">
              <span
                className="material-icons mr-0.5"
                style={{ fontSize: "20px" }}
              >
                edit
              </span>
              掲示板を編集
            </p>
          </button>
        )}
      </div>
      <div className="lg:flex">
        <section className="w-full max-w-lg mx-auto rounded-lg relative overflow-hidden bg-white lg:mb-0 mb-20 shadow-sm">
          <div
            className={`flex items-center justify-between w-full backdrop-blur p-2 z-10 ${board.category === "迷子" ? "bg-red-500" : board.category === "保護" ? "bg-blue-500" : "bg-green-500"}`}
          >
            <p className="text-white font-bold flex items-center">
              <span className="material-icons mr-1">campaign</span>
              {board.category === "迷子"
                ? "探しています"
                : board.category === "保護"
                  ? "保護しました"
                  : "目撃しました"}
            </p>
            <p className="bg-white rounded text-xs font-bold p-1 opacity-90">
              {board.status}
            </p>
          </div>
          <div className="cursor-pointer overflow-hidden">
            <div className="w-full min-h-96 overflow-hidden relative">
              <div className="flex">
                <div
                  className={`min-h-96 overflow-hidden relative ${board.images.length <= 1 ? "w-full" : "w-2/3"}`}
                >
                  <Image
                    src={
                      removeParamsFromUrl(board.images[0]?.url) || board.iconUrl
                    }
                    alt={board.name}
                    className="object-cover"
                    fill
                  />
                </div>
                {board.images.length > 2 && (
                  <div className="w-1/3">
                    {board.images.slice(1, 2).map((image, index) => (
                      <div
                        key={index}
                        className={`h-1/2 w-full relative overflow-hidden`}
                      >
                        {image ? (
                          <Image
                            src={removeParamsFromUrl(image.url)!}
                            alt={`image_${index}`}
                            className="object-cover"
                            fill
                          />
                        ) : null}
                      </div>
                    ))}
                    {board.images.length > 3 && (
                      <div className="h-1/2 w-full relative overflow-hidden">
                        <div className="flex items-center justify-center absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 z-10">
                          <p className="text-white text-xs font-bold">
                            すべて見る
                          </p>
                        </div>
                        <Image
                          src={removeParamsFromUrl(board.images[3].url)!}
                          alt="more_image"
                          className="object-cover"
                          fill
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <section className="px-1 pb-4">
              <div className="px-4 py-2">
                <ul>
                  <li>
                    <span className="text-gray-600">名前：</span>
                    <span className="font-bold">{board.name}</span>
                  </li>
                  <li>
                    <span className="text-gray-600">分類：</span>
                    <span className="font-bold">{board.breed}</span>
                  </li>
                  <li>
                    <span className="text-gray-600">年齢：</span>
                    <span className="font-bold">{board.age}歳</span>
                  </li>
                  <li>
                    <span className="text-gray-600">特徴：</span>
                    <span className="font-bold">{board.feature}</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 mx-2 py-2">
                <div className="flex items-center space-x-1">
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-2 py-1 rounded-md border border-black text-xs font-bold transition-all active:scale-95 flex items-center justify-center"
                  >
                    <XIcon style={{ fontSize: "14px" }} />
                    <p>でシェアする</p>
                  </a>
                  <div className="relative">
                    {bookmarkLoading && (
                      <div className="bg-white opacity-50 h-full w-full absolute top-0 left-0 z-10" />
                    )}
                    <button
                      className={`${bookmarked ? "bg-main text-white" : "text-main"} px-2 py-1 rounded-md border border-main text-xs font-bold flex items-center transition-all active:scale-95`}
                      onClick={() => {
                        if (!isAuthenticated) {
                          requireSignin();
                        } else if (bookmarked) {
                          unbookmark();
                        } else {
                          bookmark();
                        }
                      }}
                    >
                      <span
                        className="material-icons"
                        style={{ fontSize: "14px" }}
                      >
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
                      src={
                        removeParamsFromUrl(board.user.avatarUrl) ||
                        defaultUserImage
                      }
                      alt={board.user.nickname}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <p className="font-bold text-sm">{board.user.nickname}</p>
                </button>
              </div>
              <div className="mx-4 py-2">
                <section className="space-y-3">
                  <div>
                    <label className="text-gray-600 text-sm">
                      いなくなった日時：
                    </label>
                    <p className="text-black font-bold">
                      {board.formatedDate} 頃
                    </p>
                  </div>
                  <div className="max-w-5xl">
                    <label className="text-gray-600 text-sm">
                      いなくなった場所：
                    </label>
                    <p className="text-black font-bold">{board.location}</p>
                    {board.lat && board.lng && (
                      <div className="mt-2 overflow-hidden rounded-md border border-main relative w-full h-72">
                        <Image
                          src={getGoogleMapImageUrl(board.lat, board.lng)}
                          alt="Google Map"
                          className="object-cover"
                          fill
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
            </section>
          </div>
        </section>
        {/* PCの場合のコメント欄 */}
        <div className="w-full h-fit lg:block hidden ml-2 px-2 pb-2 bg-white rounded-lg shadow-sm">
          <div>
            <p className="font-bold p-2 flex items-center text-lg">
              <span
                className="material-icons mr-0.5"
                style={{ fontSize: "18px" }}
              >
                sms
              </span>
              コメント
            </p>
          </div>
          <div className="h-[80vh] rounded-lg overflow-hidden">
            <CommentViewer boardId={parseInt(id as string)} />
          </div>
        </div>
        {/* スマホの場合のハーフモーダル */}
        <div className="lg:hidden">
          <HalfModal open={false}>
            <CommentViewer boardId={parseInt(id as string)} />
          </HalfModal>
        </div>
        <SelectLocationModal boardId={parseInt(id as string)} />
      </div>
    </>
  ) : (
    <div>読み込み中...</div>
  );
};

"use client";
import { useStaticMap } from "@/hooks/useStaticMap";
import { useWalk } from "@/hooks/useWalk";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import imgCat from "/public/images/img_cat.png";

export const WalkDetails = () => {
  const { id } = useParams();
  const { walk } = useWalk(parseInt(id as string));
  const { mapUrl } = useStaticMap(walk);
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg p-4 border border-main border-opacity-30">
      <button
        className="font-bold text-main flex items-center py-3 transition-all hover:brightness-125"
        onClick={() => router.push("/walks")}
      >
        <span className="material-icons">keyboard_arrow_left</span> 一覧に戻る
      </button>
      <div className="h-[450px] w-full rounded-md overflow-hidden relative">
        {mapUrl && (
          <Image
            src={mapUrl}
            alt="Walk Route Map"
            className="object-cover rounded-md"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute bottom-0 flex items-center overflow-hidden w-full h-24 bg-main bg-opacity-90">
          <span
            className="material-icons text-white translate-y-1"
            style={{ fontSize: "96px" }}
          >
            directions_walk
          </span>
          <div className="w-full mr-4">
            <div className="flex items-center justify-between h-full">
              <p className="text-6xl text-white font-bold">
                {walk?.totalDistance}
                <span className="text-3xl ml-0.5">km</span>
              </p>
              <div className="flex flex-col items-center justify-center">
                <p
                  className="bg-white rounded-full text-main font-bold px-4 py-[1px]"
                  style={{ fontSize: "9px" }}
                >
                  獲得したEXP
                </p>
                <p className="font-bold text-white text-2xl">
                  {0}
                  <span className="text-xs ml-0.5">EXP</span>
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-white w-full text-right p-1">
              {"2024年10月1日 00:00〜00:00"}
            </p>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 py-2">
        <div className="flex items-center">
          <div className="h-5 w-5 relative mr-0.5">
            <Image
              src={imgCat}
              alt="found_animal"
              className="object-cover"
              fill
            />
          </div>
          <p className="font-bold py-1">みつけた動物</p>
        </div>
        <div className="flex items-center space-x-1">
          {walk?.posts.length ? (
            walk?.posts.map((post, index) => (
              <button
                key={index}
                className="w-24 h-24 relative overflow-hidden rounded"
                onClick={() => router.push(`/map?post_id=${post.id}`)}
              >
                <Image
                  src={post.imageUrl}
                  alt={`post-${post.id}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </button>
            ))
          ) : (
            <div className="p-3 w-full flex items-center justify-center">
              <p className="font-bold text-sm text-gray-400">
                みつけた動物はいません
              </p>
            </div>
          )}
        </div>
      </div>
      <section>
        <p className="font-bold py-2 flex items-center">
          <span className="material-icons">edit_note</span>メモ
        </p>
        <div className="w-full min-h-32 p-3 flex items-center justify-center bg-gray-50 rounded">
          <p className="font-bold text-sm text-gray-400">メモはありません</p>
        </div>
      </section>
      <div className="w-full p-3 text-red-400 flex items-center justify-center">
        <button className="px-6 py-2 bg-red-50 rounded-lg transition-all active:scale-95">
          <p className="flex items-center text-sm font-bold">
            <span className="material-icons" style={{ fontSize: "20px" }}>
              delete
            </span>
            散歩記録を削除
          </p>
        </button>
      </div>
    </div>
  );
};

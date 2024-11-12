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
    <div>
      <button className="font-bold text-main flex items-center py-3">
        <span className="material-icons">keyboard_arrow_left</span> 一覧に戻る
      </button>
      <div className="h-[450px] w-full rounded-md overflow-hidden relative">
        {mapUrl && (
          <img
            src={mapUrl}
            alt="Walk Route Map"
            className="w-full h-full object-cover rounded-md"
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
          {walk?.posts.map((post, index) => (
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
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold py-2 flex items-center">
          <span className="material-icons">edit_note</span>メモ
        </p>
        <div className="w-full p-2 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
};

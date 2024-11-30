import { useState } from "react";
import { useTimeline } from "@/hooks/useTimeline";
import Image from "next/image";
import defaultImage from "/public/images/default_avatar.png";
import { Board, Post } from "@/app/types";
import { useRouter } from "next/navigation";
import { removeParamsFromUrl } from "@/lib";

export const Timeline = () => {
  const { items, fetch } = useTimeline();

  const [pulling, setPulling] = useState(false);
  const [offset, setOffset] = useState(0);
  const router = useRouter();

  const handleTouchStart = (e: React.TouchEvent) => {
    setOffset(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const distance = currentY - offset;

    if (distance > 0 && window.scrollY === 0) {
      setPulling(true);
    } else {
      setPulling(false);
    }
  };

  const handleTouchEnd = async () => {
    if (pulling) {
      setPulling(false);
      await fetch(); // 更新処理を実行
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`flex items-center justify-center py-2 transition-all ${pulling ? "h-16 w-full" : "h-0 w-0 hidden"}`}
      >
        <p className="flex items-center text-gray-400 font-bold text-sm">
          <span className="material-icons">refresh</span>タイムラインを更新
        </p>
      </div>
      {/* タイムライン */}
      <section className="divide-y divide-gray-300 p-2">
        {items.map((item, index) =>
          item.type === "post" ? (
            <div
              className="px-2 py-4 cursor-pointer"
              key={`post_${index}`}
              onClick={() => router.push(`?post_id=${item.content.id}`)}
            >
              <div className="flex">
                <div className="h-12 min-w-12 rounded-full overflow-hidden relative">
                  <Image
                    src={
                      removeParamsFromUrl(
                        item.content.user?.avatarUrl || null
                      ) || defaultImage
                    }
                    alt={`avatar_${item.content.user?.id}`}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="px-1 w-full">
                  <div className="w-full flex items-center justify-between">
                    <p className="font-bold select-none">
                      {item.content.user?.nickname || "匿名"}
                    </p>
                    <p className="text-xs font-bold text-gray-400">
                      {(item.content as Post).createdAt}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 select-none">
                    みつけた動物を投稿しました。
                  </p>
                </div>
              </div>
              <div className="relative h-80 w-full rounded overflow-hidden my-2">
                <Image
                  src={removeParamsFromUrl((item.content as Post).imageUrl)!}
                  alt={`post_${item.content.id}`}
                  className="object-cover select-none"
                  fill
                />
              </div>
            </div>
          ) : (
            <div
              className="px-2 py-4 cursor-pointer"
              key={`board_${index}`}
              onClick={() => router.push(`boards/${item.content.id}`)}
            >
              <div className="flex">
                <div className="h-12 min-w-12 rounded-full overflow-hidden relative">
                  <Image
                    src={
                      removeParamsFromUrl(
                        item.content.user?.avatarUrl || null
                      ) || defaultImage
                    }
                    alt={`avatar_${item.content.user?.id}`}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="px-1 w-full">
                  <div className="w-full flex items-center justify-between">
                    <p className="font-bold select-none">
                      {item.content.user?.nickname || "匿名"}
                    </p>
                    <p className="text-xs font-bold text-gray-400">
                      {(item.content as Board).formatedDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 select-none">
                    掲示板を作成しました。
                  </p>
                </div>
              </div>
              <div className="relative h-80 w-full rounded overflow-hidden my-2">
                <div
                  className={`bg-opacity-80 text-white font-bold px-2 py-1 absolute top-0 left-0 w-full z-10 ${
                    (item.content as Board).category === "迷子"
                      ? "bg-red-400 "
                      : (item.content as Board).category === "保護"
                        ? "bg-blue-400"
                        : "bg-green-400"
                  }`}
                >
                  <p className="flex items-center">
                    <span className="material-icons mr-1">campaign</span>
                    {(item.content as Board).category === "迷子"
                      ? "探しています"
                      : (item.content as Board).category === "保護"
                        ? "保護しました"
                        : "目撃しました"}
                  </p>
                </div>
                <Image
                  src={
                    (item.content as Board).images[0]
                      ? removeParamsFromUrl(
                          (item.content as Board).images[0].url
                        )!
                      : removeParamsFromUrl((item.content as Board).iconUrl)!
                  }
                  alt={`board_${item.content.id}`}
                  className="object-cover select-none"
                  fill
                />
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
};

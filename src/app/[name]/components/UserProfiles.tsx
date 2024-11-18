"use client";
import Image from "next/image";
import defaultUserImage from "/public/images/default_avatar.png";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";
import XIcon from "@mui/icons-material/X";
import { useEffect } from "react";

export const UserProfiles = () => {
  const { name: nameParams } = useParams();
  const { name: currentUserName } = useAuth();
  const { loading, user, fetch } = useUserProfiles(nameParams as string);
  const router = useRouter();

  useEffect(() => {
    fetch();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white rounded-lg border border-main border-opacity-30 p-5">
      {user ? (
        <div>
          <section className="border-b border-gray-300">
            <div className="flex items-center">
              <div className="rounded-full h-24 w-24 min-w-24 relative overflow-hidden">
                <Image
                  src={user.avatarUrl || defaultUserImage}
                  alt="avatar"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="font-bold w-full ml-1">
                <div className="pb-1">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl">{user.nickname}</p>
                    {nameParams === currentUserName && (
                      <Link
                        href={`/${nameParams}/edit`}
                        className="text-sm bg-gray-200 rounded-full px-5 py-1 transition-all active:scale-95"
                      >
                        <p className="font-bold opacity-60">編集</p>
                      </Link>
                    )}
                  </div>
                  <p className="text-sm opacity-50">@{user.name}</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm">
                    LV<span>{1}</span>
                  </p>
                  <p className="text-xs">
                    次のレベルまで<span>{0}</span>EXP
                  </p>
                </div>
                <div className="relative">
                  <div className="w-full h-2 bg-gray-200 rounded-full" />
                  <div className="w-0 h-2 bg-main rounded-full absolute top-0 left-0" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center">
                <span
                  className="material-icons text-main"
                  style={{ fontSize: "32px" }}
                >
                  location_on
                </span>
                <p className="font-bold">{user.location}</p>
              </div>
              <div className="flex items-center space-x-1">
                {user.twitter && (
                  <a
                    href={user.twitter}
                    target="_blank"
                    className="text-base bg-black p-1 rounded-lg flex items-center"
                  >
                    <XIcon style={{ fontSize: "24px" }} />
                  </a>
                )}
                {user.email && (
                  <div
                    className="material-icons text-base bg-main p-1 rounded-lg"
                    style={{ fontSize: "24px" }}
                  >
                    email
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs font-bold py-1">{user.introduction}</div>
            <div className="flex items-center font-bold space-x-2 py-1">
              <p className="text-xs">
                <span className="text-lg mr-0.5">{0}</span>フォロワー
              </p>
              <p className="text-xs">
                <span className="text-lg mr-0.5">{0}</span>フォロー中
              </p>
            </div>
          </section>
          <section className="border-b border-gray-300">
            <div className="py-4">
              <p className="font-bold mb-1">アクティビティ</p>
              <div className="flex items-center space-x-1 mb-1">
                <div className="bg-main bg-opacity-10 border border-main border-opacity-50 rounded-md flex flex-col items-center justify-center p-2 w-1/3 overflow-hidden relative">
                  <p className="text-sm font-bold">Total</p>
                  <p className="font-bold py-1">
                    <span className="text-3xl pr-0.5">
                      {user.walks?.reduce(
                        (acc, walk) => acc + walk.totalDistance,
                        0
                      )}
                    </span>
                    <span className="text-sm">km</span>
                  </p>
                  <div
                    className="flex items-center justify-center"
                    style={{ fontSize: "9px" }}
                  >
                    <p>2024.10.1</p>
                    <p>〜</p>
                    <p>Present</p>
                  </div>
                  <div
                    className="material-icons absolute top-1 -translate-x-7 text-main opacity-20"
                    style={{ fontSize: "112px" }}
                  >
                    directions_walk
                  </div>
                </div>
                <div className="bg-main bg-opacity-10 border border-main border-opacity-50 rounded-md flex flex-col items-center justify-center p-2 w-1/3 overflow-hidden relative">
                  <p className="text-sm font-bold">Total</p>
                  <p className="font-bold py-1">
                    <span className="text-3xl pr-0.5">
                      {user.posts?.length}
                    </span>
                    <span className="text-sm">shot</span>
                  </p>
                  <div
                    className="flex items-center justify-center"
                    style={{ fontSize: "9px" }}
                  >
                    <p>2024.10.1</p>
                    <p>〜</p>
                    <p>Present</p>
                  </div>
                  <div
                    className="material-icons absolute top-1 -translate-x-8 text-main opacity-20"
                    style={{ fontSize: "96px" }}
                  >
                    camera_alt
                  </div>
                </div>
                <div className="bg-main bg-opacity-10 border border-main border-opacity-50 rounded-md flex flex-col items-center justify-center p-2 w-1/3 overflow-hidden relative">
                  <p className="text-sm font-bold">Current Streak</p>
                  <p className="font-black text-3xl py-1 pr-0.5">
                    {user.currentStreak}
                  </p>
                  <div
                    className="flex items-center justify-center"
                    style={{ fontSize: "9px" }}
                  >
                    <p>2024.10.1</p>
                    <p>〜</p>
                    <p>Present</p>
                  </div>
                  <div
                    className="material-icons absolute top-1 -translate-x-8 text-main opacity-20"
                    style={{ fontSize: "96px" }}
                  >
                    whatshot
                  </div>
                </div>
              </div>
              <button
                className="bg-main bg-opacity-10 border border-main border-opacity-50 rounded-md flex items-center justify-between p-2 w-full"
                onClick={() => router.push("/walks")}
              >
                <div className="flex items-end font-bold text-sm ml-1">
                  <p>Total</p>
                  <p className="text-3xl px-1 translate-y-[3px]">
                    {user.walks?.length}
                  </p>
                  <p>times walking.</p>
                </div>
                <div className="text-xs text-main font-bold flex items-center">
                  散歩記録をみる
                  <span className="material-icons" style={{ fontSize: "16px" }}>
                    keyboard_arrow_right
                  </span>
                </div>
              </button>
            </div>
          </section>
          <section className="border-b border-gray-300">
            <div className="py-4">
              <div className="flex items-center justify-between">
                <p className="font-bold mb-1">作成した掲示板</p>
                <p className="text-sm font-bold">{user.boards?.length}件</p>
              </div>
              <div className="flex items-center space-x-0.5">
                {user.boards?.map((board, index) => (
                  <button
                    key={index}
                    className="h-24 w-24 rounded-lg overflow-hidden relative"
                    onClick={() => router.push(`/boards/${board.id}`)}
                  >
                    <Image
                      src={board.iconUrl}
                      alt={board.name}
                      className="object-cover"
                      fill
                    />
                    <div className="absolute bottom-0 w-full rounded-br-lg bg-red-500 bg-opacity-80 p-0.5">
                      <p
                        className="font-bold text-white text-center"
                        style={{ fontSize: "10px" }}
                      >
                        {board.category}情報
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section>
            <div className="py-4">
              <div className="flex items-center justify-between">
                <p className="font-bold mb-1">みつけた動物</p>
                <p className="text-sm font-bold">{user.posts?.length}件</p>
              </div>
              <div className="grid grid-cols-4 gap-0.5">
                {user.posts?.map((post, index) => (
                  <button
                    key={index}
                    className="md:h-44 h-24 w-full overflow-hidden relative rounded"
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
          </section>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

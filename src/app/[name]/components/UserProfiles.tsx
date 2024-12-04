"use client";
import Image from "next/image";
import defaultUserImage from "/public/images/default_avatar.png";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";
import XIcon from "@mui/icons-material/X";
import { useEffect, useState } from "react";
import { BoardItem } from "@/app/boards/components/BoardItem";
import { PostGridItem } from "@/app/map/components/PostGridItem";
import { followsModalTabState, showFollowsModal } from "./FollowsModal";
import { useSetRecoilState } from "recoil";
import { removeParamsFromUrl } from "@/lib";
import { format, parseISO } from "date-fns";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";

const TabComponent = ({
  label,
  count,
  isSelect,
  onClick,
}: {
  label: string;
  count: number;
  isSelect: boolean;
  onClick: () => void;
}) => {
  return (
    <button className="w-full p-4 relative" onClick={onClick}>
      <div
        className={`bg-main h-1 w-full absolute bottom-0 left-0 transition-all ${isSelect ? "opacity-100" : "opacity-0"}`}
      />
      <p
        className={`w-full text-sm text-center transition-all ${isSelect ? "font-bold opacity-100" : "opacity-50"}`}
      >
        {label}
        <span className="ml-2 text-main">{count}</span>
      </p>
    </button>
  );
};

const getDailyPostCounts = (posts: { createdAt: string }[]) => {
  return posts.reduce(
    (acc, post) => {
      const date = format(parseISO(post.createdAt), "yyyy-MM-dd");

      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ date, value: 1 });
      }

      return acc;
    },
    [] as { date: string; value: number }[]
  );
};

export const UserProfiles = () => {
  const { name: nameParams } = useParams();
  const { authState } = useAuth();
  const { name: currentUserName } = authState;
  const { loading, user, isFollowing, fetch, handleFollow, handleUnFollow } =
    useUserProfiles(nameParams as string);
  const router = useRouter();
  const [selectTabIndex, setSelectTabIndes] = useState<number>(0);
  const setFollowsModalTab = useSetRecoilState<number>(followsModalTabState);

  const setHeatmap = (heatmapData: { date: string; value: number }[]) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    startDate.setDate(1);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    const allDates = [];
    const tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() - 1);
    while (tempDate <= new Date(endDate)) {
      allDates.push(tempDate.toISOString().split("T")[0]); // YYYY-MM-DD形式で日付を保存
      tempDate.setDate(tempDate.getDate() + 1);
    }

    const completeData = allDates.map((date) => {
      const existingData = heatmapData.find((item) => item.date === date);
      return existingData || { date, value: 0 }; // 存在しない場合はvalue: 0のデータを追加
    });

    const cal = new CalHeatmap();
    cal.paint({
      itemSelector: "#cal-heatmap",
      domain: {
        type: "month",
        gutter: 6,
        label: { text: "MMM", textAlign: "start", position: "top" },
      },
      subDomain: { type: "ghDay", radius: 3, width: 18, height: 18, gutter: 4 },
      date: { start: startDate },
      range: 7,
      data: { source: completeData, x: "date", y: "value" },
      type: "json",
      scale: {
        color: {
          type: "linear",
          range: ["#f5f5f5", "#8aa8aa", "#6f8686"],
          domain: [0, 3, 6],
        },
      },
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (user && user.posts) {
      setHeatmap(getDailyPostCounts(user.posts));
    }
  }, [user, user?.posts]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      {user ? (
        <div>
          <section className="bg-white rounded p-4 shadow-sm">
            <div className="flex items-center">
              <div className="rounded-full h-24 w-24 min-w-24 relative overflow-hidden">
                <Image
                  src={removeParamsFromUrl(user.avatarUrl) || defaultUserImage}
                  alt="avatar"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="font-bold w-full ml-1">
                <div className="pb-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xl">{user.nickname}</p>
                    {nameParams === currentUserName ? (
                      <Link
                        href={`/${nameParams}/edit`}
                        className="text-sm bg-gray-200 rounded-full px-5 py-1 transition-all active:scale-95"
                      >
                        <p className="font-bold opacity-60">編集</p>
                      </Link>
                    ) : isFollowing ? (
                      <button
                        className="text-xs border border-main text-main rounded-full px-3 py-1 transition-all active:scale-95"
                        onClick={() => {
                          handleUnFollow();
                        }}
                      >
                        フォロー中
                      </button>
                    ) : (
                      <button
                        className="text-xs bg-main text-white rounded-full px-3 py-1 transition-all active:scale-95"
                        onClick={() => {
                          handleFollow();
                        }}
                      >
                        フォローする
                      </button>
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
                  style={{ fontSize: "24px" }}
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
              <p
                className="text-xs select-none cursor-pointer transition-all hover:text-main"
                onClick={() => {
                  setFollowsModalTab(0);
                  showFollowsModal();
                }}
              >
                <span className="text-lg mr-0.5">{user.followersCount}</span>
                フォロワー
              </p>
              <p
                className="text-xs select-none cursor-pointer transition-all hover:text-main"
                onClick={() => {
                  setFollowsModalTab(1);
                  showFollowsModal();
                }}
              >
                <span className="text-lg mr-0.5">{user.followingCount}</span>
                フォロー中
              </p>
            </div>
            <div className="mt-4">
              <div id="cal-heatmap" className="overflow-auto mx-auto" />
            </div>
          </section>
          <section className="bg-white rounded px-4 py-2 mt-2 shadow-sm">
            <div className="flex items-center border-b border-main">
              <TabComponent
                label="みつけた動物"
                count={user.posts?.length || 0}
                isSelect={selectTabIndex === 0}
                onClick={() => setSelectTabIndes(0)}
              />
              <TabComponent
                label="掲示板"
                count={user.boards?.length || 0}
                isSelect={selectTabIndex === 1}
                onClick={() => setSelectTabIndes(1)}
              />
            </div>
            {selectTabIndex === 0 ? (
              <section className="py-4">
                {user.posts?.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 py-10">
                    みつけた動物の投稿がありません
                  </p>
                ) : (
                  <div className="grid lg:grid-cols-4 grid-cols-2 gap-1">
                    {user.posts?.map((post, index) => (
                      <PostGridItem
                        key={index}
                        post={post}
                        onClick={() => {
                          router.push(`/map?post_id=${post.id}`);
                        }}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <section className="py-4">
                {user.boards?.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 py-10">
                    公開中の掲示板はありません。
                  </p>
                ) : (
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                    {user.boards?.map((board, index) => (
                      <BoardItem key={index} board={board} />
                    ))}
                  </div>
                )}
              </section>
            )}
          </section>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

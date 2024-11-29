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

export const UserProfiles = () => {
  const { name: nameParams } = useParams();
  const { authState } = useAuth();
  const { name: currentUserName } = authState;
  const { loading, user, isFollowing, fetch, handleFollow, handleUnFollow } =
    useUserProfiles(nameParams as string);
  const router = useRouter();
  const [selectTabIndex, setSelectTabIndes] = useState<number>(0);
  const setFollowsModalTab = useSetRecoilState<number>(followsModalTabState);

  useEffect(() => {
    fetch();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div>
      {user ? (
        <div>
          <section className="bg-white rounded p-4">
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
          </section>
          <section className="bg-white rounded px-4 py-2 mt-2">
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
              </section>
            ) : (
              <section className="py-4">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                  {user.boards?.map((board, index) => (
                    <BoardItem key={index} board={board} />
                  ))}
                </div>
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

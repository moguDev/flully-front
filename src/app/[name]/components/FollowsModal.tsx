"use client";
import { User } from "@/app/types";
import defaultUserImage from "/public/images/default_avatar.png";
import { api } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useFollows } from "@/hooks/useFollows";
import { atom, useRecoilState } from "recoil";

export const followsModalTabState = atom<number>({
  key: "followsModalTabState",
  default: 0,
});

export const showFollowsModal = () => {
  const dialog = document.getElementById(
    "followsModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closeFollowsModal = () => {
  const dialog = document.getElementById(
    "followsModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

const AccountRow = ({
  user,
  followed,
  onClick,
}: {
  user: User;
  followed: boolean;
  onClick: () => void;
}) => {
  const { follow, unFollow } = useFollows();
  const { authState } = useAuth();
  const { name } = authState;
  return (
    <div className="flex">
      <div className="h-10 min-w-10 rounded-full overflow-hidden relative mr-1">
        <Image
          src={user.avatarUrl || defaultUserImage}
          alt={`avatar_${user.id}`}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <p className="font-bold">{user.nickname}</p>
            <p className="text-xs text-gray-500">@{user.name}</p>
          </div>
          {name !== user.name && (
            <button onClick={onClick}>
              {followed ? (
                <div
                  className="h-fit text-xs border border-main text-main rounded-full px-3 py-1 transition-all active:scale-95"
                  onClick={() => {
                    unFollow(user.id).then(() => onClick());
                  }}
                >
                  <p className="text-xs font-bold">フォロー中</p>
                </div>
              ) : (
                <div
                  className="h-fit bg-main text-white rounded-full px-3 py-1 transition-all active:scale-95"
                  onClick={() => {
                    follow(user.name).then(() => onClick());
                  }}
                >
                  <p className="text-xs font-bold">フォローする</p>
                </div>
              )}
            </button>
          )}
        </div>
        <p className="font-bold">{user.introduction}</p>
      </div>
    </div>
  );
};

export const FollowsModal = () => {
  const [selectTab, setSelectTab] =
    useRecoilState<number>(followsModalTabState);
  const [loading, setLoading] = useState<boolean>(false);

  const { authState } = useAuth();
  const { name: myname } = authState;
  const { name } = useParams();

  const [followers, setFollowers] = useState<User[]>([]);
  const [followings, setFollowings] = useState<User[]>([]);
  const [myFollowings, setMyFollowings] = useState<User[]>([]);

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${name}/followers`);
      const { data } = res;
      setFollowers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowings = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${name}/followings`);
      const { data } = res;
      setFollowings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyFollowings = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${myname}/followings`);
      const { data } = res;
      setMyFollowings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const isFollowed = (userId: number) => {
    return myFollowings.some((follow) => follow.id === userId);
  };

  useEffect(() => {
    fetchFollowers();
    fetchFollowings();
    fetchMyFollowings();
  }, [name, myname]);

  return (
    <dialog id="followsModal" className="modal space-y-1">
      <div className="modal-box max-w-md mx-auto bg-white rounded-md p-3 relative overflow-hidden">
        <div className="flex items-center border-b border-main">
          <button
            className={`relative w-full p-3 outline-none font-bold transition-all ${selectTab === 0 ? "opacity-100" : "opacity-50"}`}
            onClick={() => setSelectTab(0)}
          >
            {selectTab === 0 && (
              <div className="bg-main h-1 w-full absolute bottom-0 left-0 z-10" />
            )}
            <p>フォロワー</p>
          </button>
          <button
            className={`relative w-full p-3 outline-none font-bold transition-all ${selectTab === 1 ? "opacity-100" : "opacity-50"}`}
            onClick={() => setSelectTab(1)}
          >
            {selectTab === 1 && (
              <div className="bg-main h-1 w-full absolute bottom-0 left-0 z-10" />
            )}
            <p>フォロー中</p>
          </button>
        </div>
        <div className="p-3 bg-white space-y-4 h-96 overflow-y-auto relative">
          {loading && (
            <div className="absolute top-0 left-0 h-full w-full z-10 bg-white bg-opacity-50"></div>
          )}
          {selectTab === 0 ? (
            followers.length > 0 ? (
              followers.map((user, index) => (
                <AccountRow
                  key={index}
                  user={user}
                  followed={isFollowed(user.id)}
                  onClick={() => {
                    fetchMyFollowings();
                  }}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm font-bold text-gray-400">
                  フォロワーがいません
                </p>
              </div>
            )
          ) : followings.length > 0 ? (
            followings.map((user, index) => (
              <AccountRow
                key={index}
                user={user}
                followed={isFollowed(user.id)}
                onClick={() => {
                  fetchMyFollowings();
                }}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm font-bold text-gray-400">
                フォロー中のユーザーはいません
              </p>
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

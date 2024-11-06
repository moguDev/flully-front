"use client";
import Image from "next/image";
import defaultUserImage from "/public/images/default_avatar.png";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";

export const UserProfiles = () => {
  const { name: nameParams } = useParams();
  const { name: currentUserName } = useAuth();
  const { loading, user } = useUserProfiles(nameParams as string);
  return loading ? (
    <Loading />
  ) : (
    <div>
      {user ? (
        <div className="border-b border-gray-300">
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
                  LV<span>{12}</span>
                </p>
                <p className="text-xs">
                  次のレベルまで<span>{1234}</span>EXP
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-2 bg-gray-200 rounded-full" />
                <div className="w-1/3 h-2 bg-main rounded-full absolute top-0 left-0" />
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
              <p className="text-sm font-bold">{user.location}</p>
            </div>
            <div className="flex items-center bg-main p-1 rounded-lg">
              <div
                className="material-icons text-base"
                style={{ fontSize: "24px" }}
              >
                email
              </div>
            </div>
          </div>
          <div className="text-xs font-bold py-1">{user.introduction}</div>
          <div className="flex items-center font-bold space-x-2 py-1">
            <p className="text-xs">
              <span className="text-lg mr-0.5">12</span>フォロワー
            </p>
            <p className="text-xs">
              <span className="text-lg mr-0.5">34</span>フォロー中
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

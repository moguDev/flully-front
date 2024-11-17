"use client";
import { usePost } from "@/hooks/usePost";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PostDetails } from "../map/components/PostDetails";
import { Board, Post } from "../types";
import defaultImage from "/public/images/default_avatar.png";
import { BoardItem } from "@/app/boards/components/BoardItem";
import catIcon from "/public/images/ic_cat.png";

export const NearbyInformation = ({
  posts,
  boards,
}: {
  posts: Post[];
  boards: Board[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("post_id");
  const {
    post: selectedPost,
    fetch,
    initPost,
  } = usePost(postId ? parseInt(postId) : null);

  useEffect(() => {
    if (postId) {
      fetch();
    } else {
      initPost();
    }
  }, [postId]);

  return (
    <div className="w-96 pt-16 p-2 h-screen relative border-r border-gray-300 max-h-[100vh] overflow-y-auto">
      <div className="flex items-center justify-between px-2 py-4 border-b border-gray-200">
        <p className="flex items-center font-bold text-lg">
          <span className="material-icons">location_on</span>このあたりの情報
        </p>
        <p className="font-bold text-gray-500">(10km以内)</p>
      </div>
      {selectedPost ? (
        <div>
          <PostDetails postId={selectedPost.id} />
        </div>
      ) : (
        <section className="flex flex-col">
          <div className="px-2 mt-2 mb-4">
            <div className="flex items-center justify-between py-1">
              <p className="font-bold flex items-center py-1">
                <span className="material-icons">search</span>
                みつかった動物
              </p>
              <p className="text-sm font-bold">{posts.length}件</p>
            </div>
            {posts.length > 0 ? (
              <div className="grid grid-cols-4 gap-0.5">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="w-full h-24 overflow-hidden rounded relative cursor-pointer transition-all hover:-translate-y-1"
                    onClick={() => {
                      router.replace(`?post_id=${post.id}`);
                    }}
                  >
                    <Image
                      src={post.imageUrl || defaultImage}
                      alt={`post-${post.id}`}
                      className="object-cover"
                      fill
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="p-2 font-bold text-black text-sm text-opacity-50">
                  まだみつかった動物はいません
                </p>
              </div>
            )}
          </div>
          <div className="py-4">
            <div className="px-2 flex items-center justify-between">
              <p className="font-bold flex items-center py-1">
                <div className="h-5 w-5 relative overflow-hidden mr-1">
                  <Image
                    src={catIcon}
                    alt="cat_icon"
                    className="object-cover"
                    fill
                  />
                </div>
                まいご・保護情報
              </p>
              <p className="text-sm font-bold">{boards.length}件</p>
            </div>
            {boards.length > 0 ? (
              boards.map((board, index) => (
                <BoardItem key={index} board={board} />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <p className="p-2 font-bold text-black text-sm text-opacity-50">
                  まいご・保護情報はありません
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

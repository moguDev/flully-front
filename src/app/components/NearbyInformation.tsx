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
    <div className="w-96 h-screen relative border-r border-gray-300">
      {selectedPost ? (
        <div>
          <PostDetails postId={selectedPost.id} />
        </div>
      ) : (
        <section className="pt-16 p-2 flex flex-col max-h-[100vh] overflow-y-auto">
          <div className="px-2 mt-2 mb-4">
            <div className="flex items-center justify-between">
              <p className="font-bold flex items-center py-1">
                <span className="material-icons">search</span>
                見つかった動物
              </p>
              <p className="text-sm font-bold">{posts.length}件</p>
            </div>
            <div className="grid grid-cols-4 p-1">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="w-full h-24 overflow-hidden relative"
                  onClick={() => {
                    router.replace(`?post_id=${post.id}`);
                  }}
                >
                  <p>test</p>
                  <Image
                    src={post.imageUrl || defaultImage}
                    alt="image"
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="px-2 py-4">
            <div className="flex items-center justify-between">
              <p className="font-bold flex items-center">
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
            <div>
              {boards.map((board, index) => (
                <BoardItem key={index} board={board} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

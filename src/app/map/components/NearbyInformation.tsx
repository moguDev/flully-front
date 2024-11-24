"use client";
import { usePost } from "@/hooks/usePost";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PostDetails } from "./PostDetails";
import { Board, Post } from "../../types";
import defaultImage from "/public/images/default_avatar.png";
import { BoardItem } from "@/app/boards/components/BoardItem";
import { SelectTabButton } from "./SelectTabButton";
import { useRecoilState } from "recoil";
import { selectDisplayTabState } from "./Map";

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
  const [selectTab, setSelectTab] = useRecoilState<number>(
    selectDisplayTabState
  );
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
    <div className="w-96 pt-16 h-screen relative border-r border-gray-300 max-h-[100vh] overflow-y-auto">
      <div className="flex items-center justify-between px-2 py-4 border-b border-gray-200">
        <p className="flex items-center font-bold text-lg select-none">
          <span className="material-icons">location_on</span>このあたりの情報
        </p>
      </div>
      {selectedPost ? (
        <div>
          <PostDetails postId={selectedPost.id} />
        </div>
      ) : (
        <section className="flex flex-col px-1">
          <div className="flex items-center justify-center w-full rounded-full bg-gray-100 mt-2 p-1">
            <SelectTabButton
              label="みつかった動物"
              selected={selectTab === 0}
              onClick={() => setSelectTab(0)}
            />
            <SelectTabButton
              label="迷子・保護情報"
              selected={selectTab === 1}
              onClick={() => setSelectTab(1)}
            />
          </div>
          {selectTab === 0 ? (
            <div className="px-2 mt-2 mb-4">
              {posts.length > 0 ? (
                <div className="grid grid-cols-3 ">
                  {posts.map((post, index) => (
                    <div
                      key={index}
                      className="w-full h-32 overflow-hidden relative cursor-pointer transition-all hover:-translate-y-1"
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
                  <p className="p-5 font-bold text-black text-sm text-opacity-50">
                    このあたりでみつかった動物はいません...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-4">
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
          )}
        </section>
      )}
    </div>
  );
};

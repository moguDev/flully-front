"use client";
import { usePost } from "@/hooks/usePost";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostDetails } from "./PostDetails";
import { Board, Post } from "../../types";
import { BoardItem } from "@/app/boards/components/BoardItem";
import { SelectCategoryButton } from "./SelectCategoryButton";
import { useRecoilState } from "recoil";
import { selectDisplayTabState } from "./Map";
import { PostGridItem } from "./PostGridItem";
import { SelectTabButton } from "./SelectTabButton";
import { Timeline } from "./Timeline";

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
  const [selectTab, setSelectTab] = useState<number>(0);
  const [selectCategory, setSelectCategory] = useRecoilState<number>(
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
    <div className="w-96 pt-16 h-screen border-r border-gray-300 bg-white">
      <div className="h-14 w-full flex items-center border-b border-main mx-1">
        <SelectTabButton
          iconName="access_time_filled"
          label="タイムライン"
          selected={selectTab === 0}
          onClick={() => {
            setSelectTab(0);
          }}
        />
        <SelectTabButton
          iconName="location_on"
          label="このあたりの情報"
          selected={selectTab === 1}
          onClick={() => {
            setSelectTab(1);
          }}
        />
      </div>
      <div className="max-h-nearbyinformation overflow-y-auto">
        {selectedPost ? (
          <div>
            <PostDetails postId={selectedPost.id} />
          </div>
        ) : selectTab === 0 ? (
          <div className="w-full h-full">
            <Timeline />
          </div>
        ) : (
          <section className="flex flex-col px-1">
            <div className="flex items-center justify-center w-full h-fit rounded-full bg-gray-100 mt-2 p-1">
              <SelectCategoryButton
                label="みつかった動物"
                selected={selectCategory === 0}
                onClick={() => setSelectCategory(0)}
              />
              <SelectCategoryButton
                label="迷子・保護情報"
                selected={selectCategory === 1}
                onClick={() => setSelectCategory(1)}
              />
            </div>
            {selectCategory === 0 ? (
              <div className="px-2 mt-2 mb-4">
                {posts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1">
                    {posts.map((post, index) => (
                      <PostGridItem
                        key={index}
                        post={post}
                        onClick={() => {
                          router.replace(`?post_id=${post.id}`);
                        }}
                      />
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
                    <div key={index} className="mx-2 mb-4">
                      <BoardItem board={board} />
                    </div>
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
    </div>
  );
};

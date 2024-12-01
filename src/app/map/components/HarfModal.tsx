"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Board, Post } from "@/app/types";
import { useState, useRef, useEffect } from "react";
import { PostDetails } from "./PostDetails";
import { BoardItem } from "@/app/boards/components/BoardItem";
import { usePost } from "@/hooks/usePost";
import { SelectCategoryButton } from "./SelectCategoryButton";
import { useRecoilState } from "recoil";
import { selectDisplayTabState } from "./Map";
import { PostGridItem } from "./PostGridItem";
import { SelectTabButton } from "./SelectTabButton";
import { Timeline } from "./Timeline";

export const HalfModal = ({
  posts,
  boards,
  open,
}: {
  posts: Post[];
  boards: Board[];
  open: boolean;
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
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const startY = useRef<number | null>(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (postId) {
      setIsOpen(true);
      fetch();
    } else {
      setIsOpen(false);
      initPost();
    }
  }, [postId]);

  const handleTouchStart = (event: React.TouchEvent) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (startY.current === null) return;

    const currentY = event.touches[0].clientY;
    const distance = currentY - (startY.current || 0);

    if (isOpen && distance > 50) {
      setIsOpen(false);
      router.replace("?");
      startY.current = null;
    } else if (!isOpen && distance < -50) {
      setIsOpen(true);
      startY.current = null;
    }
  };

  return (
    <div
      className={`pb-16 fixed bottom-0 left-0 bg-white w-full rounded-t-xl overflow-hidden transition-all duration-300 z-30 ${isOpen ? "h-[70vh]" : "h-28"}`}
      style={{ boxShadow: "0 -1px 10px rgba(0, 0, 0, 0.10)" }}
    >
      <section
        className="border-b border-gray-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onClick={() => setIsOpen(true)}
      >
        <div className="h-14 flex items-center border-b border-main bg-gray-200 z-10">
          <SelectTabButton
            iconName="access_time_filled"
            label="タイムライン"
            selected={selectTab === 0}
            onClick={() => {
              if (selectTab === 0) {
                setIsOpen(false);
                router.replace("?");
                startY.current = null;
              } else {
                setSelectTab(0);
              }
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
      </section>
      {isOpen && selectedPost ? (
        <PostDetails postId={selectedPost.id} />
      ) : selectTab === 0 ? (
        <div className="h-full overflow-y-auto relative pb-16">
          <Timeline />
        </div>
      ) : (
        <section className="flex flex-col h-full overflow-y-auto relative pb-16 p-1">
          <div className="flex items-center justify-center w-full rounded-full bg-gray-100 mt-2 p-1">
            <SelectCategoryButton
              icon="pets"
              label="みつかった動物"
              selected={selectCategory === 0}
              onClick={() => setSelectCategory(0)}
            />
            <SelectCategoryButton
              icon="campaign"
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
                        setIsOpen(true);
                        router.push(`?post_id=${post.id}`);
                      }}
                    />
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
          ) : (
            <div className="px-2 py-4">
              <div>
                {boards.map((board, index) => (
                  <div key={index} className="mx-2 my-4">
                    <BoardItem board={board} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

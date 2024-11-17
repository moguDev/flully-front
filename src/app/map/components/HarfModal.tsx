"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Board, Post } from "@/app/types";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { PostDetails } from "./PostDetails";
import defaultImage from "/public/images/default_avatar.png";
import { BoardItem } from "@/app/boards/components/BoardItem";
import catIcon from "/public/images/ic_cat.png";
import { usePost } from "@/hooks/usePost";

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
      className={`pb-16 fixed bottom-0 left-0 bg-base w-full rounded-t-lg transition-all duration-300 z-30 ${isOpen ? "h-[70vh]" : "h-32"}`}
      style={{ boxShadow: "0 -1px 10px rgba(0, 0, 0, 0.10)" }}
    >
      <section
        className="border-b border-gray-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onClick={() => setIsOpen(true)}
      >
        <div className="h-4 w-full flex items-center justify-center">
          <div className="bg-gray-300 w-16 h-1 rounded-full" />
        </div>
        <div className="h-12 flex items-center justify-between px-3">
          <p className="font-bold flex items-center">
            <span className="material-icons" style={{ fontSize: "24px" }}>
              location_on
            </span>
            このあたりの情報
          </p>
          <p className="text-sm font-bold">（10km以内）</p>
        </div>
      </section>
      {isOpen && selectedPost ? (
        <PostDetails postId={selectedPost.id} />
      ) : (
        <section className="flex flex-col h-full overflow-y-auto relative pb-16 p-1">
          <div className="px-2 mt-2 mb-4">
            <div className="flex items-center justify-between">
              <p className="font-bold flex items-center py-1">
                <span className="material-icons">search</span>
                みつかった動物
              </p>
              <p className="text-sm font-bold">{posts.length}件</p>
            </div>
            {posts.length > 0 ? (
              <div className="grid grid-cols-4 p-1">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="w-full h-24 overflow-hidden relative"
                    onClick={() => {
                      setIsOpen(true);
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

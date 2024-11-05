import Image from "next/image";
import defaultUserImage from "/public/images/default_avatar.png";
import { useLikes } from "@/hooks/useLikes";
import { useEffect } from "react";
import { usePosts } from "@/hooks/usePosts";

type PostDetailsProps = {
  postId: number;
};

export const PostDetails = ({ postId }: PostDetailsProps) => {
  const { isLiked, like, dislike } = useLikes(postId);
  const { post, fetchPostById } = usePosts();

  const handleLiked = async () => {
    if (isLiked) {
      await dislike();
    } else {
      await like();
    }
    fetchPostById(postId);
  };

  useEffect(() => {
    fetchPostById(postId);
  }, []);

  return post ? (
    <div className="p-3 space-y-3 h-full overflow-y-auto">
      <section className="space-y-1">
        <div className="flex items-center py-1">
          <div className="h-5 w-5 overflow-hidden rounded-full relative mr-0.5">
            <Image
              src={
                post.user && post.user.avatarUrl
                  ? post.user.avatarUrl
                  : defaultUserImage
              }
              alt="avatar"
              className="object-cover"
              fill
            />
          </div>
          <p className="font-bold">
            {post.user ? post.user.nickname : "非公開"}
          </p>
        </div>
        <div className="w-full h-80 overflow-hidden relative rounded">
          <Image
            src={post.imageUrl}
            alt={"image"}
            className="object-cover"
            fill
          />
          <div className="flex items-center absolute bottom-0 left-0 m-1 space-x-2">
            <button className="bg-black rounded text-white p-2 py-1 text-sm font-bold transition-all active:scale-95">
              Xでシェア
            </button>
            <button
              className="bg-main rounded text-white p-2 text-xs flex items-center transition-all active:scale-95"
              onClick={() => {
                handleLiked();
              }}
            >
              <span
                className="material-icons mr-0.5"
                style={{ fontSize: "16px" }}
              >
                {isLiked ? "thumb_up" : "thumb_up_off_alt"}
              </span>
              <span className="text-xs font-bold mr-1">いいね</span>
              <span>{post.likeCount}</span>
            </button>
          </div>
        </div>
        <p>{post.body}</p>
      </section>
      <section className="space-y-1">
        <p className="flex items-center text-xs font-bold">
          <span className="material-icons mr-0.5" style={{ fontSize: "16px" }}>
            chat
          </span>
          コメント
        </p>
        <div className="bg-gray-100 rounded w-full min-h-80"></div>
      </section>
    </div>
  ) : (
    <></>
  );
};

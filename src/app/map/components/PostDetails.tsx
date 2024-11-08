import Image from "next/image";
import defaultUserImage from "/public/images/default_avatar.png";
import { useLikes } from "@/hooks/useLikes";
import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { usePostComments } from "@/hooks/usePostComments";
import { useAuth } from "@/hooks/useAuth";
import { useBookmark } from "@/hooks/useBookmark";

type PostDetailsProps = {
  postId: number;
};

export const PostDetails = ({ postId }: PostDetailsProps) => {
  const { name } = useAuth();
  const { isLiked, like, dislike } = useLikes(postId);
  const { post, fetchPostById } = usePosts();
  const { comments, sendComment } = usePostComments(postId);

  const [commentText, setCommentText] = useState("");

  const handleLiked = async () => {
    if (isLiked) {
      await dislike();
    } else {
      await like();
    }
    fetchPostById(postId);
  };

  const handleSendComment = async () => {
    if (commentText.trim()) {
      await sendComment(commentText);
      setCommentText(""); // コメント送信後に入力フィールドをクリア
      fetchPostById(postId); // コメント数更新のため再取得
    }
  };

  useEffect(() => {
    fetchPostById(postId);
  }, []);

  return post ? (
    <>
      <div className="p-3 pb-36 space-y-3 h-full overflow-y-auto">
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
          <p className="flex items-center text-xs font-bold pb-3">
            <span
              className="material-icons mr-0.5"
              style={{ fontSize: "16px" }}
            >
              chat
            </span>
            コメント
          </p>
          <div className="w-full">
            {comments.length === 0 ? (
              <p className="font-bold text-center text-gray-400 text-sm">
                コメントがありません。
              </p>
            ) : (
              comments.map((comment, index) => (
                <div key={index}>
                  <div className="flex items-center mb-1">
                    <div className="h-5 w-5 rounded-full overflow-hidden relative mr-1">
                      <Image
                        src={comment.user.avatarUrl || defaultUserImage}
                        alt="user_icon"
                        className="object-cover"
                        fill
                      />
                    </div>
                    <p className="text-xs">{comment.user.nickname}</p>
                  </div>
                  <div
                    className={`${comment.user.name === name ? "bg-main" : "bg-gray-200"} rounded-[24px] px-5 py-3 relative`}
                  >
                    <div
                      className={`${comment.user.name === name ? "bg-main" : "bg-gray-200"} absolute top-0 left-0 rounded-md h-1/2 w-1/2 -z-10`}
                    />
                    <p
                      className={`${comment.user.name === name && "text-base"} font-bold w-full break-words`}
                    >
                      {comment.body}
                    </p>
                  </div>
                  <p className="text-right p-1" style={{ fontSize: "10px" }}>
                    {comment.createdAt}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <div className="fixed bottom-16 left-0 h-max w-full bg-base p-2 border-t border-gray-200">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 px-4 rounded-full w-full">
            <input
              type="text"
              className="w-full bg-gray-100 outline-none"
              placeholder="コメントを入力..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <button
            className="material-icons ml-1 text-main transition-all active:scale-95"
            style={{ fontSize: "32px" }}
            onClick={handleSendComment}
          >
            send
          </button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

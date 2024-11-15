import Image from "next/image";
import defaultUserImage from "/public/images/default_avatar.png";
import { useLikes } from "@/hooks/useLikes";
import { useState } from "react";
import { usePostComments } from "@/hooks/usePostComments";
import { useAuth } from "@/hooks/useAuth";
import { usePost } from "@/hooks/usePost";
import XIcon from "@mui/icons-material/X";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useRouter } from "next/navigation";
import { showPostDeleteModal } from "./PostDeleteModal";

type PostDetailsProps = {
  postId: number;
};

export const PostDetails = ({ postId }: PostDetailsProps) => {
  const { name } = useAuth();
  const { isLiked, like, dislike } = useLikes(postId);
  const { post, fetch } = usePost(postId);
  const { comments, sendComment } = usePostComments(postId);
  const router = useRouter();

  const [commentText, setCommentText] = useState("");

  const handleLiked = async () => {
    if (isLiked) {
      await dislike();
    } else {
      await like();
    }
    fetch();
  };

  const handleSendComment = async () => {
    if (commentText.trim()) {
      await sendComment(commentText);
      setCommentText("");
      fetch();
    }
  };

  return post ? (
    <>
      <div className="p-3 lg:pb-0 pb-20 space-y-3 h-full overflow-y-auto">
        <section className="space-y-1">
          <button
            className="flex items-center text-sm text-gray-600 py-2"
            onClick={() => router.push("/map")}
          >
            <span className="material-icons">keyboard_arrow_left</span>
            <p>一覧にもどる</p>
          </button>
          <div className="w-full h-96 overflow-hidden relative rounded">
            <Image
              src={post.imageUrl}
              alt={"image"}
              className="object-cover"
              fill
            />
            <div className="absolute top-0 right-0 p-2 flex flex-col space-y-1 font-bold">
              <button className="h-14 w-14 text-white bg-black rounded-full p-1 transition-all active:scale-110">
                <XIcon />
                <p style={{ fontSize: "10px" }}>シェア</p>
              </button>
              <button
                className="h-14 w-14 text-white bg-main rounded-full p-1 transition-all active:scale-110"
                onClick={() => {
                  handleLiked();
                }}
              >
                {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                <p style={{ fontSize: "10px" }}>{post.likeCount}</p>
              </button>
            </div>
            <div className="w-full absolute bottom-0 left-0 p-2 bg-black bg-opacity-30 text-white font-bold">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full overflow-hidden relative mr-0.5">
                  <Image
                    src={post.user?.avatarUrl || defaultUserImage}
                    alt={post.user?.nickname || "undefined"}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-xs">
                  {post.user ? post.user.nickname : "非公開"}
                </p>
              </div>
              <p className="px-2 py-1">{post.body}</p>
              <p className="text-xs text-right">{post.createdAt}</p>
            </div>
          </div>
        </section>
        <section className="space-y-1 relative rounded-md overflow-hidden border border-gray-200 bg-gray-100">
          <p className="flex items-center text-xs font-bold p-2">
            <span
              className="material-icons mr-0.5"
              style={{ fontSize: "16px" }}
            >
              chat
            </span>
            コメント
          </p>
          <div className="w-full pb-16 h-96 overflow-y-auto">
            {comments.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="font-bold text-center text-gray-400 text-sm">
                  コメントがありません。
                </p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="p-2">
                  <div className="flex items-center mb-1">
                    <div className="h-4 w-4 rounded-full overflow-hidden relative mr-1">
                      <Image
                        src={comment.user.avatarUrl || defaultUserImage}
                        alt="user_icon"
                        className="object-cover"
                        fill
                      />
                    </div>
                    <p className="text-xs font-bold">{comment.user.nickname}</p>
                  </div>
                  <div className="flex items-end pl-1">
                    <div
                      className={`${comment.user.name === name ? "bg-main" : "bg-gray-200"} w-max max-w-[75%] rounded-[24px] px-5 py-3 relative z-10`}
                    >
                      <div
                        className={`${comment.user.name === name ? "bg-main" : "bg-gray-200"} absolute top-0 left-0 rounded-md h-1/2 w-1/2 -z-10`}
                      />
                      <p
                        className={`${comment.user.name === name && "text-base"} font-bold w-full break-words z-10`}
                      >
                        {comment.body}
                      </p>
                    </div>
                    <p className="text-right p-1" style={{ fontSize: "10px" }}>
                      {comment.createdAt}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-0 left-0 h-max w-full bg-base p-2 border-t border-gray-200 z-20">
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
        </section>
        {name === post.user?.name && (
          <button
            className="bg-red-500 rounded py-3 text-white flex items-center justify-center w-full font-bold transition-all active:scale-95 text-sm"
            onClick={showPostDeleteModal}
          >
            <span className="material-icons" style={{ fontSize: "20 px" }}>
              delete
            </span>
            投稿を削除する
          </button>
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

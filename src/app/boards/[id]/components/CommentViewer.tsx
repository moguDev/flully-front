import { useBoardComments } from "@/hooks/useBoardComments";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { showModal } from "./SelectLocationModal";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const CommentViewer = ({ boardId }: { boardId: number }) => {
  const [commentText, setCommentText] = useState("");
  const { comments, sendComment } = useBoardComments(boardId);
  const { authState } = useAuth();
  const { isAuthenticated, name } = authState;
  const router = useRouter();

  const handleSendTextComment = async () => {
    if (commentText.trim()) {
      await sendComment(commentText);
      setCommentText("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      sendComment(files[0]);
    }
  };

  const commentsEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    console.log(comments);
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const getMapImageUrl = (lat: number, lng: number) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x400&markers=color:red|${lat},${lng}&key=${apiKey}`;
  };

  return (
    <div className="relative h-full w-full">
      <section className="absolute bg-gray-50 h-full w-full lg:pb-16 pb-32 overflow-y-auto">
        <div className="px-4">
          {comments.reverse().map((comment, index) => (
            <div key={index} className="my-2">
              <div
                className={`flex items-center mb-1 ${comment.user.name === name && "justify-end"}`}
              >
                <div className="h-5 w-5 overflow-hidden rounded-full relative mr-0.5">
                  <Image
                    src={comment.user.avatarUrl}
                    alt={comment.user.nickname}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-xs font-bold">
                  {comment.user.name !== name && comment.user.nickname}
                </p>
              </div>
              <div
                className={`flex items-end justify-start ${comment.user.name === name && "flex-row-reverse"}`}
              >
                {comment.contentType === "text" ? (
                  <div
                    className={`w-max max-w-[70%] px-5 py-2 rounded-[24px] relative mx-2 ${comment.user.name === name ? "bg-main text-white" : "left-0 bg-gray-200"}`}
                  >
                    <div
                      className={`h-1/2 w-1/2 rounded-md absolute top-0 -z-10 ${comment.user.name === name ? "right-0 bg-main text-white" : "left-0 bg-gray-200"}`}
                    />
                    <p className="text-sm font-bold w-full break-words">
                      {comment.content as string}
                    </p>
                  </div>
                ) : comment.contentType === "image" ? (
                  <div className="relative overflow-hidden h-64 w-56 rounded mx-2">
                    <Image
                      src={comment.content as string}
                      alt={`image ${comment.id}`}
                      className="object-cover"
                      fill
                    />
                  </div>
                ) : comment.contentType === "location" ? (
                  <div className="relative overflow-hidden h-56 w-56 rounded mx-2">
                    <Image
                      src={getMapImageUrl(
                        (comment.content as { lat: number; lng: number }).lat,
                        (comment.content as { lat: number; lng: number }).lng
                      )}
                      alt={`Location map`}
                      className="object-cover"
                      fill
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                <p
                  className="text-gray-400 font-bold text-right"
                  style={{ fontSize: "10px" }}
                >
                  {comment.createdAt}
                </p>
              </div>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>
      </section>
      <div className="lg:absolute fixed lg:bottom-0 bottom-16 left-0 h-max w-full bg-white p-2">
        {isAuthenticated ? (
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 px-2 rounded-full w-full flex items-center">
              <label className="material-icons text-main opacity-60 px-1 transition-all active:scale-95">
                image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
              <button
                className="material-icons text-main opacity-60 px-1 transition-all active:scale-95"
                onClick={showModal}
              >
                location_on
              </button>
              <input
                type="text"
                className="w-full bg-gray-100 outline-none ml-1"
                placeholder="コメントを入力..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
            <button
              className="material-icons ml-1 text-main transition-all active:scale-95"
              style={{ fontSize: "32px" }}
              onClick={handleSendTextComment}
            >
              send
            </button>
          </div>
        ) : (
          <button
            className="bg-main rounded w-full transition-all active:scale-95"
            onClick={() => router.push("/signin")}
          >
            <p className="text-white font-bold text-sm p-3 flex items-center justify-center">
              <span className="material-icons mr-1">login</span>
              ログインしてコメントする
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

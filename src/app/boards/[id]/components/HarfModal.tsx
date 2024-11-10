import { useBoardComments } from "@/hooks/useBoardComments";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { showModal } from "./SelectLocationModal";

export const HalfModal = ({
  open,
  boardId,
}: {
  open: boolean;
  boardId: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const startY = useRef<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const { comments, sendComment } = useBoardComments(boardId);

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
  }, [comments, isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleTouchStart = (event: React.TouchEvent) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (startY.current === null) return;

    const currentY = event.touches[0].clientY;
    const distance = currentY - (startY.current || 0);

    if (isOpen && distance > 50) {
      setIsOpen(false);
      startY.current = null;
    } else if (!isOpen && distance < -50) {
      setIsOpen(true);
      startY.current = null;
    }
  };

  const getMapImageUrl = (lat: number, lng: number) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // ここにGoogle Maps APIキーを入れてください
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x400&markers=color:red|${lat},${lng}&key=${apiKey}`;
  };

  return (
    <div
      className={`pb-16 fixed bottom-0 left-0 bg-base w-full rounded-t-lg transition-all duration-300 z-30 ${isOpen ? "h-[70vh]" : "h-32"}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={() => setIsOpen(true)}
      style={{ boxShadow: "0 -1px 10px rgba(0, 0, 0, 0.10)" }}
    >
      <div className="h-4 w-full flex items-center justify-center">
        <div className="bg-gray-300 w-16 h-1 rounded-full" />
      </div>
      <div className="h-12 flex items-center px-3">
        <span className="material-icons mr-1">sms</span>
        <p className="font-bold">コメント</p>
      </div>

      {isOpen && (
        <section className="h-full pb-32 overflow-y-auto relative">
          <div className="px-4">
            {comments.reverse().map((comment, index) => (
              <div key={index} className="my-2">
                <div className="flex items-center mb-1">
                  <div className="h-5 w-5 overflow-hidden rounded-full relative mr-0.5">
                    <Image
                      src={comment.user.avatarUrl}
                      alt={comment.user.nickname}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <p className="text-xs font-bold">{comment.user.nickname}</p>
                </div>
                <div className="flex items-end">
                  {comment.contentType === "text" ? (
                    <div className="bg-gray-200 w-max max-w-[70%] px-5 py-2 rounded-[24px] relative mx-2">
                      <div
                        className={`h-1/2 w-1/2 rounded-md absolute top-0 -z-10 ${"left-0 bg-gray-200"}`}
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
          <div className="fixed bottom-16 left-0 h-max w-full bg-base p-2 border-t border-gray-200">
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
          </div>
        </section>
      )}
    </div>
  );
};

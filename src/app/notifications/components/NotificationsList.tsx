"use client";
import { Notification } from "@/app/types";
import { useNotifications } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotificationView = ({
  category,
  item,
}: {
  category: "follow" | "like" | "post_comment" | "board_comment";
  item: Notification;
}) => {
  const router = useRouter();
  const iconCollections = {
    follow: "person",
    like: "favorite",
    post_comment: "chat",
    board_comment: "chat",
  } as const;
  const iconColors = {
    follow: "text-main",
    like: "text-pink-500",
    post_comment: "text-blue-400",
    board_comment: "text-blue-600",
  } as const;
  return (
    <button
      className={`w-full bg-white p-5 rounded-lg shadow-sm transition-all active:scale-95 ${item.checked ? "opacity-60" : "opacity-100"}}`}
      onClick={() => router.push(item.url)}
    >
      <p className="flex items-start">
        <span
          className={`material-icons mr-2 ${iconColors[category]}`}
          style={{ fontSize: "28px" }}
        >
          {iconCollections[category]}
        </span>
        <span className="text-sm font-bold text-start">{item.body}</span>
      </p>
      <div className="flex items-center justify-between mt-3">
        {!item.checked ? (
          <p
            className="text-end text-white bg-red-400 rounded-lg px-2 py-0.5 font-black"
            style={{ fontSize: "10px" }}
          >
            未読
          </p>
        ) : (
          <p
            className="flex items-center text-end text-gray-400 bg-gray-100 rounded-lg px-1 py-0.5 font-bold"
            style={{ fontSize: "10px" }}
          >
            <span
              className="material-icons mr-0.5"
              style={{ fontSize: "14px" }}
            >
              check
            </span>
            既読
          </p>
        )}
        <p className="text-xs text-end text-gray-500">{item.createdAt}</p>
      </div>
    </button>
  );
};

export const NotificationsList = () => {
  const { notifications, fetch } = useNotifications();
  const iconCollections = {
    follow: "person",
    like: "favorite",
    post_comment: "chat",
    board_comment: "chat",
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="mx-2">
      <h1 className="text-black font-black flex items-center text-2xl p-2 mb-2">
        通知
      </h1>
      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <NotificationView
              key={index}
              category={notification.category}
              item={notification}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center min-h-96">
          <p className="text-sm text-gray-400">通知はありません</p>
        </div>
      )}
    </div>
  );
};

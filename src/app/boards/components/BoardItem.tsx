import { Board } from "@/app/types";
import Image from "next/image";
import defaultUserImage from "/public/images/default_avatar.png";
import { useRouter } from "next/navigation";

type BoardItemProps = {
  board: Board;
};

export const BoardItem = ({ board }: BoardItemProps) => {
  const router = useRouter();
  return (
    <div
      className="py-3 lg:px-4 cursor-pointer transition-all hover:translate-x-1"
      onClick={() => router.push(`/boards/${board.id}`)}
    >
      <div className="flex space-x-2">
        <div className="h-28 min-w-28 rounded-full overflow-hidden relative">
          <Image
            src={board.iconUrl}
            alt={board.name}
            className="object-cover"
            fill
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl font-bold ${!board.name && "text-gray-400"}`}
            >
              {board.name || "(未登録)"}
            </p>
            <div className="flex items-center space-x-1">
              <p
                className={`text-xs px-2 py-1 text-white font-bold rounded-md ${board.category === "迷子" ? "bg-red-500" : board.category === "保護" ? "bg-blue-500" : "bg-green-500"}`}
              >
                {board.category}
              </p>
              <p className="text-xs bg-gray-400 px-2 py-1 text-white font-bold rounded-md">
                {board.status}
              </p>
            </div>
          </div>
          <ul>
            <li className="text-sm font-bold text-gray-400">
              分類：<span className="text-black">{board.breed}</span>
            </li>
            <li className="text-sm font-bold text-gray-400">
              特徴：<span className="text-black">{board.feature}</span>
            </li>
            <li className="text-sm font-bold text-gray-400">
              日時：<span className="text-black">{board.formatedDate} 頃</span>
            </li>
            <li className="text-sm font-bold text-gray-400">
              場所：<span className="text-black">{board.location}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between px-1 py-2">
        <div>
          <p className="flex items-center font-bold text-xs text-main">
            <span className="material-icons" style={{ fontSize: "16px" }}>
              bookmark
            </span>
            {board.bookmarkCount}
          </p>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 overflow-hidden rounded-full relative mr-0.5">
            <Image
              src={board.user?.avatarUrl || defaultUserImage}
              alt={board.user!.nickname}
              className="object-cover"
              fill
            />
          </div>
          <p className="text-xs font-bold">{board.user?.nickname}</p>
        </div>
      </div>
    </div>
  );
};

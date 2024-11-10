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
      className="py-3 lg:px-2"
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
            <p className="text-2xl font-bold">{board.name}</p>
            <p className="text-xs bg-red-500 px-2 py-1 text-white font-bold rounded-md">
              {board.category}情報
            </p>
          </div>
          <ul>
            <li className="text-sm font-bold text-gray-400">
              分類：<span className="text-black">{board.breed}</span>
            </li>
            <li className="text-sm font-bold text-gray-400">
              特徴：<span className="text-black">{board.feature}</span>
            </li>
            <li className="text-sm font-bold text-gray-400">
              日時：<span className="text-black">{board.date} 頃</span>
            </li>
            <li className="text-sm font-bold text-gray-400">
              場所：<span className="text-black">{board.location}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-100 text-xs text-gray-600 font-semibold rounded p-2 mt-2">
        {board.body}
      </div>
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="flex items-center font-bold text-main">
            <span className="material-icons" style={{ fontSize: "20px" }}>
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

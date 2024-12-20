import { Board } from "@/app/types";
import { removeParamsFromUrl } from "@/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BoardItemProps = {
  board: Board;
};

export const BoardItem = ({ board }: BoardItemProps) => {
  const router = useRouter();
  return (
    <div
      className={`bg-white cursor-pointer transition-all duration-500 hover:-translate-y-1 rounded-md overflow-hidden relative shadow ${board.status !== "未解決" && "opacity-50"}`}
      onClick={() => router.push(`/boards/${board.id}`)}
    >
      <div className="w-full min-h-80 overflow-hidden rounded-t-md relative">
        <div
          className={`absolute flex items-center justify-between top-0 left-0 w-full bg-opacity-80 backdrop-blur p-2 z-10 ${board.category === "迷子" ? "bg-red-500" : board.category === "保護" ? "bg-blue-500" : "bg-green-500"}`}
        >
          <p className="text-white font-bold flex items-center">
            <span className="material-icons mr-1">campaign</span>
            {board.category === "迷子"
              ? "探しています"
              : board.category === "保護"
                ? "保護しました"
                : "目撃しました"}
          </p>
          <p className="bg-white rounded text-xs font-bold p-1 opacity-90">
            {board.status}
          </p>
        </div>
        <Image
          src={removeParamsFromUrl(board.images[0]?.url) || board.iconUrl}
          alt={board.name}
          className="object-cover"
          fill
        />
      </div>
      <div className="px-4 py-2">
        <ul className="text-sm">
          <li>
            <span className="text-gray-600">分類：</span>
            <span className="font-bold">{board.breed}</span>
          </li>
          <li>
            <span className="text-gray-600">特徴：</span>
            <span className="font-bold">{board.feature}</span>
          </li>
          <li>
            <span className="text-gray-600">日時：</span>
            <span className="font-bold">{board.formatedDate}</span>
          </li>
          <li>
            <span className="text-gray-600">場所：</span>
            <span className="font-bold">{board.location}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

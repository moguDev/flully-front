import { BoardList } from "./components/BoardList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "まいご掲示板 | flully - ふらりと出会った動物をシェアできるコミュニティ",
};

export default function BoardsPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 p-2">
      <BoardList />
    </div>
  );
}

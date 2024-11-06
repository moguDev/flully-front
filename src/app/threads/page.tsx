import { PREFECTURES } from "@/lib/prefectures";
import { AddThreadButton } from "./components/AddThreadButton";

export default function ThreadsPage() {
  return (
    <div>
      <section className="border-b border-gray-200">
        <div className="bg-gray-200 bg-opacity-50 w-full rounded-full flex items-center p-2">
          <span className="material-icons mx-1 text-gray-400">search</span>
          <input
            type="text"
            className="w-full bg-gray-200 bg-opacity-0 outline-none"
            placeholder="キーワードで検索"
          />
        </div>
        <div className="flex items-center px-1 py-2">
          <span className="material-icons text-main">filter_alt</span>
          <select className="select select-ghost text-xs font-bold w-full max-w-xs outline-none">
            <option>すべての掲示板</option>
            <option>ブックマーク</option>
            <option>まいご情報</option>
            <option>保護情報</option>
          </select>
          <select className="select select-ghost w-full text-xs max-w-xs">
            <option disabled selected>
              都道府県でフィルタ
            </option>
            {PREFECTURES.map((prefecture) => (
              <option key={prefecture}>{prefecture}</option>
            ))}
          </select>
        </div>
      </section>
      <section>{/* 掲示板一覧 */}</section>
      <AddThreadButton />
    </div>
  );
}

"use client";

import { PREFECTURES } from "@/lib/prefectures";
import { AddThreadButton } from "./AddThreadButton";
import { useBoards } from "@/hooks/useBoards";
import { BoardItem } from "./BoardItem";

export const BoardList = () => {
  const { boards } = useBoards();
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
      <section className="py-2 divide-y divide-gray-200">
        <div className="grid lg:first:grid-cols-4 grid-cols-1 lg:divide-y-0 divide-y divide-gray-200">
          {boards.map((board, index) => (
            <BoardItem key={index} board={board} />
          ))}
        </div>
      </section>
      <AddThreadButton />
    </div>
  );
};

"use client";

import { PREFECTURES } from "@/lib/prefectures";
import { AddThreadButton } from "./AddThreadButton";
import { useBoards } from "@/hooks/useBoards";
import { BoardItem } from "./BoardItem";
import { useState } from "react";

export const BoardList = () => {
  const { boards, fetchSearchResults } = useBoards();
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchSearchResults(event.target.value);
  };

  const handlePrefectureChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPrefecture(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  // 選択された都道府県とカテゴリーで boards をフィルタリング
  const filteredBoards = boards.filter((board) => {
    const matchesPrefecture = selectedPrefecture
      ? board.location.startsWith(selectedPrefecture)
      : true;
    const matchesCategory = selectedCategory
      ? board.category === selectedCategory
      : true;
    return matchesPrefecture && matchesCategory;
  });

  return (
    <div className="bg-white px-2 py-4 rounded-lg min-h-[80vh]">
      <section className="max-w-2xl mx-auto border-b border-gray-200">
        <div className="bg-gray-200 bg-opacity-50 w-full rounded-full flex items-center p-2">
          <span className="material-icons mx-1 text-gray-400 select-none">
            search
          </span>
          <input
            type="text"
            className="w-full bg-gray-200 bg-opacity-0 outline-none"
            placeholder="キーワードで検索"
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center px-1 py-2">
          <span className="material-icons text-main select-none">
            filter_alt
          </span>
          <select
            className="select select-ghost text-xs font-bold w-full max-w-xs outline-none"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">すべての掲示板</option>
            <option value="迷子">迷子情報</option>
            <option value="保護">保護情報</option>
            <option value="目撃">目撃情報</option>
          </select>
          <select
            className="select select-ghost w-full text-xs max-w-xs"
            onChange={handlePrefectureChange}
            value={selectedPrefecture}
          >
            <option value="">都道府県でフィルタ</option>
            {PREFECTURES.map((prefecture) => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="py-2 divide-y divide-gray-200">
        <div className="grid 2xl:first:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:divide-y-0 divide-y divide-gray-200 gap-2">
          {filteredBoards.map((board, index) => (
            <BoardItem key={index} board={board} />
          ))}
        </div>
      </section>
      <AddThreadButton />
    </div>
  );
};

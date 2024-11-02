"use client";
import { useState, useRef } from "react";

export const HalfModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const startY = useRef<number | null>(null); // スワイプの開始位置を保持するためのref

  const handleTouchStart = (event: React.TouchEvent) => {
    startY.current = event.touches[0].clientY; // スワイプの開始位置を記録
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (startY.current === null) return; // 開始位置が設定されていない場合は何もしない

    const currentY = event.touches[0].clientY;
    const distance = currentY - (startY.current || 0); // 現在の位置との距離を計算

    if (isOpen && distance > 50) {
      // 開いているときに下にスワイプしたら閉じる
      setIsOpen(false);
      startY.current = null; // 終了したらリセット
    } else if (!isOpen && distance < -50) {
      // 閉じているときに上にスワイプしたら開く
      setIsOpen(true);
      startY.current = null; // 終了したらリセット
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 bg-base w-full rounded-t-lg transition-all duration-300 ${isOpen ? "h-[80vh]" : "h-32"}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <div className={`w-full flex items-center justify-center`}>
        <div className="bg-gray-300 w-16 h-1 rounded-full" />
      </div>
      <div className="h-10 flex items-center px-3">
        <p className="font-bold">近くの情報（大阪市中央区島町）</p>
      </div>

      {/* モーダルが開いている時の内容 */}
      {isOpen && (
        <div className="flex flex-col">
          {/* ここにモーダルの内容を追加 */}
          <div className="p-4">
            <p>モーダルの詳細情報をここに追加できます。</p>
          </div>
        </div>
      )}
    </div>
  );
};

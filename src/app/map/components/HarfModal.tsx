"use client";
import { useState, useRef } from "react";

export const HalfModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const startY = useRef<number | null>(null);

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

  return (
    <div
      className={`fixed bottom-0 left-0 bg-base w-full rounded-t-lg transition-all duration-300 z-30 ${isOpen ? "h-[70vh]" : "h-32"}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <div className={`h-4 w-full flex items-center justify-center`}>
        <div className="bg-gray-300 w-16 h-1 rounded-full" />
      </div>
      <div className="h-12 flex items-center px-3">
        <p className="font-bold">近くの情報（大阪市中央区島町）</p>
      </div>

      {isOpen && (
        <div className="flex flex-col">
          <div className="p-4">
            <p className="font-bold flex items-center">
              <span className="material-icons">search</span>
              この辺りで見つかった
            </p>
          </div>
          <div className="p-4">
            <p className="font-bold flex items-center">
              <span className="material-icons">search</span>
              この辺りのまいご・保護情報
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

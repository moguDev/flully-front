"use client";

import { useBoard } from "@/hooks/useBoard";
import { useParams, useRouter } from "next/navigation";

export const showBoardDeleteModal = () => {
  const dialog = document.getElementById(
    "boardDeleteModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closeBoardDeleteModal = () => {
  const dialog = document.getElementById(
    "boardDeleteModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

export const BoardDeleteModal = () => {
  const { id } = useParams();
  const router = useRouter();
  const { destroy } = useBoard(parseInt(id as string));

  const handleDelete = async () => {
    await destroy();
    closeBoardDeleteModal();
    router.push("/boards");
  };

  return (
    <dialog id="boardDeleteModal" className="modal space-y-1">
      <div className="modal-box bg-base rounded p-3 relative overflow-hidden">
        <h3 className="font-bold text-lg pt-2">掲示板を削除しますか？</h3>
        <p className="text-xs text-red-500 font-bold py-3">
          ※一度削除した掲示板を復元することはできません。
        </p>
        <div className="flex items-center">
          <button
            className="w-full font-bold text-sm"
            onClick={closeBoardDeleteModal}
          >
            キャンセル
          </button>
          <button
            className="bg-red-500 rounded text-white font-bold w-full p-3 flex items-center justify-center text-sm"
            onClick={() => {
              handleDelete();
            }}
          >
            削除する
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

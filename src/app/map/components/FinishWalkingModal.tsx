"use client";
import { useWalking } from "@/hooks/useWalking";

export const showModal = () => {
  const dialog = document.getElementById(
    "finishModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closeModal = () => {
  const dialog = document.getElementById(
    "finishModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

export const FinishWalkingModal = () => {
  const { finish } = useWalking();
  return (
    <dialog id="finishModal" className="modal space-y-1">
      <div className="modal-box bg-base rounded p-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg pt-2">さんぽを終了しますか？</h3>
          <button className="material-icons" onClick={closeModal}>
            close
          </button>
        </div>
        <div className="bg-gray-200 w-full my-1 p-3 rounded">
          <div className="space-y-3">
            <p className="text-gray-500 font-bold text-sm">
              散歩した距離・・・
            </p>
            <p className="text-gray-500 font-bold text-sm">
              みつけた動物・・・
            </p>
            <p className="font-bold text-sm">獲得できるEXP・・・</p>
          </div>
        </div>
        <button
          className="bg-orange-400 rounded text-base font-bold w-full p-3 flex items-center justify-center"
          onClick={() => {
            finish();
            closeModal();
          }}
        >
          <span className="material-icons">directions_walk</span>さんぽを終了
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

"use client";
import { useWalking } from "@/hooks/useWalking";

export const showModal = () => {
  const dialog = document.getElementById(
    "startModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closeModal = () => {
  const dialog = document.getElementById(
    "startModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

export const StartWalkingModal = () => {
  const { start } = useWalking();
  return (
    <dialog id="startModal" className="modal">
      <div className="modal-box bg-base rounded p-3 relative overflow-hidden">
        <h3 className="font-bold text-lg py-5">さんぽを開始しますか？</h3>
        <button
          className="bg-orange-400 rounded text-base font-bold w-full p-3 flex items-center justify-center"
          onClick={() => {
            start();
            closeModal();
          }}
        >
          <span className="material-icons">directions_walk</span>散歩を開始する
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

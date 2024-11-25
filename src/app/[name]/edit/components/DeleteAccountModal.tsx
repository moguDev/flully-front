"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const showDeleteAccountModal = () => {
  const dialog = document.getElementById(
    "finishModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closeDeleteAccountMModal = () => {
  const dialog = document.getElementById(
    "finishModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

export const DeleteAccountModal = () => {
  const { deleteAccount } = useAuth();
  const router = useRouter();
  return (
    <dialog id="finishModal" className="modal space-y-1">
      <div className="modal-box bg-base rounded p-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-black font-bold text-lg pt-2">
            アカウントを削除しますか？
          </h3>
          <button className="material-icons" onClick={closeDeleteAccountMModal}>
            close
          </button>
        </div>
        <p className="py-4 text-red-500 text-sm font-bold">
          ※この操作は取り消すことができません。
        </p>
        <div className="flex items-center">
          <button
            className="rounded font-bold w-full p-3 flex items-center justify-center"
            onClick={closeDeleteAccountMModal}
          >
            キャンセル
          </button>
          <button
            className="bg-red-500 rounded text-base font-bold w-full p-3 flex items-center justify-center"
            onClick={() => {
              closeDeleteAccountMModal();
              deleteAccount();
              router.push("/signin");
            }}
          >
            アカウントを削除
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

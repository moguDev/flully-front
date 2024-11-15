"use client";
import { usePost } from "@/hooks/usePost";
import { useRouter, useSearchParams } from "next/navigation";

export const showPostDeleteModal = () => {
  const dialog = document.getElementById(
    "postDeleteModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closePostDeleteModal = () => {
  const dialog = document.getElementById(
    "postDeleteModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

export const PostDeleteModal = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("post_id");
  const router = useRouter();
  const { destroy } = usePost(parseInt(postId as string));

  const handleDelete = async () => {
    await destroy();
    closePostDeleteModal();
    router.push("/map");
  };

  return (
    <dialog id="postDeleteModal" className="modal space-y-1">
      <div className="modal-box bg-base rounded p-3 relative overflow-hidden">
        <h3 className="font-bold text-lg pt-2">
          投稿したみつけた動物を削除しますか？
        </h3>
        <p className="text-xs text-red-500 font-bold py-3">
          ※一度削除したものを復元することはできません。
        </p>
        <div className="flex items-center">
          <button
            className="w-full font-bold text-sm"
            onClick={closePostDeleteModal}
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

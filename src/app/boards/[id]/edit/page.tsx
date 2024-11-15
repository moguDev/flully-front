import { BoardDeleteModal } from "./components/BoardDeleteModal";
import { BoardEditForm } from "./components/BoardEditForm";

export default function BoardEditPage() {
  return (
    <div className="py-20 p-4 max-w-3xl mx-auto">
      <BoardEditForm />
      <BoardDeleteModal />
    </div>
  );
}

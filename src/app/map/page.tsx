import { FinishWalkingModal } from "./components/FinishWalkingModal";
import { Map } from "./components/Map";
import { PostDeleteModal } from "./components/PostDeleteModal";
import { PostModal } from "./components/PostModal";
import { StartWalkingModal } from "./components/StartWalkingModal";

export default function MapPage() {
  return (
    <main className="bg-base w-full relative">
      <Map />
      <PostModal />
      <PostDeleteModal />
      <StartWalkingModal />
      <FinishWalkingModal />
    </main>
  );
}

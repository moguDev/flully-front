import { Map } from "./components/Map";
import { PostDeleteModal } from "./components/PostDeleteModal";
import { PostModal } from "./components/PostModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "このあたりの情報 | flully - ふらりと出会った動物をシェアできるコミュニティ",
};

export default function MapPage() {
  return (
    <main className="bg-base w-full relative">
      <Map />
      <PostModal />
      <PostDeleteModal />
    </main>
  );
}

import { Map } from "./components/Map";
import { PostDeleteModal } from "./components/PostDeleteModal";
import { PostModal } from "./components/PostModal";

type Props = {
  searchParams?: {
    post_id?: string;
  };
};

export function generateMetadata({ searchParams }: Props) {
  return {
    title: "ホーム | flully - ふらりと出会った動物をシェアできるコミュニティ",
    openGraph: {
      title: "テスト",
      siteName: "",
      type: "article",
      images: {
        url: `http://localhost:3001/api/og?post_id=${searchParams?.post_id}`,
        width: 1200,
        height: 630,
      },
    },
  };
}

export default function MapPage() {
  return (
    <main className="bg-base w-full relative">
      <Map />
      <PostModal />
      <PostDeleteModal />
    </main>
  );
}

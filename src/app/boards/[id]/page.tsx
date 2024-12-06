import { Metadata } from "next";
import { BoardDetail } from "./components/BoardDetails";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  return {
    title: "flully - ふらりと出会った動物をシェアできるコミュニティ",
    description: `ふらりは、街や自然で出会った動物をシェアできるコミュニティサービスです。
      近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
      さらに、迷子のペットや保護したペットの情報を共有することもできます。
      迷子のペットと飼い主がいち早く再開できるようにサポートします。`,
    openGraph: {
      title: "flully - ふらりと出会った動物をシェアできるコミュニティ",
      description: `ふらりは、街や自然で出会った動物をシェアできるコミュニティサービスです。
      近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
      さらに、迷子のペットや保護したペットの情報を共有することもできます。
      迷子のペットと飼い主がいち早く再開できるようにサポートします。`,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/boards/${id}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/boards/${id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "opengraph-image",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "flully - ふらりと出会った動物をシェアできるコミュニティ",
      description: `ふらりは、街や自然で出会った動物をシェアできるコミュニティサービスです。
      近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
      さらに、迷子のペットや保護したペットの情報を共有することもできます。
      迷子のペットと飼い主がいち早く再開できるようにサポートします。`,
      images: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/boards/${id}/opengraph-image`,
    },
  };
}

export default function BoardDetailsPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 p-2">
      <BoardDetail />
    </div>
  );
}

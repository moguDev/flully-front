import { Post } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

type Props = {
  post: Post;
};

const OgImage = ({ post }: Props) => {
  return (
    <div
      style={{
        background: "#8aa8aa",
        color: "#fafafa",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "25px",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          background: "#8aa8aa",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          height: "100%",
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/flully_logo.png`}
          alt="logo"
          style={{ height: "20%", widht: "20%", objectFit: "cover" }}
        />
        <p style={{ fontSize: "68px", fontWeight: "bold" }}>みつけました</p>
      </div>
      <div
        style={{
          background: "#8aa8aa",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("post_id");
    const res = await api.get(`/posts/${postId}`);
    const { data } = res;
    const post: Post = data;
    return new ImageResponse(<OgImage post={post} />);
  } catch (e) {
    return new Response(`エラーが発生しました。${e}`, { status: 500 });
  }
}

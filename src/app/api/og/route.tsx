import { Post } from "@/app/types";
import { api } from "@/lib/axiosInstance";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import camelcaseKeys from "camelcase-keys";

type Props = {
  post: Post;
};

const OgImage = ({ post }: Props) => {
  return (
    <div
      style={{
        position: "relative",
        color: "#fafafa",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/bg_top.jpg`}
        alt="bg_img"
        style={{
          filter: "blur(10px)",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          background: "#8aa8aae4",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
          height: "100%",
          paddingLeft: "30px",
          paddingBottom: "30px",
        }}
      >
        <p
          style={{
            fontSize: "76px",
            fontWeight: "bold",
            margin: 0,
            width: "100%",
          }}
        >
          ふらりと、
        </p>
        <p
          style={{
            fontSize: "76px",
            fontWeight: "bold",
            margin: 0,
            width: "100%",
          }}
        >
          出会った動物を
        </p>
        <p
          style={{
            fontSize: "76px",
            fontWeight: "bold",
            margin: 0,
            width: "100%",
          }}
        >
          シェアしよう。
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          background: "#8aa8aa",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "#333333",
          height: "12%",
          width: "100%",
          padding: "16px",
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/flully_logo.png`}
          alt="logo"
          style={{ height: "80%", objectFit: "cover" }}
        />
        <p></p>
      </div>
      <div
        style={{
          background: "#8aa8aae4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "100%",
          padding: "10px",
        }}
      >
        <div
          style={{
            background: "#fafafa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            height: "90%",
            padding: "25px",
            boxShadow: "1px 4px 10px rgba(0, 0, 0, 0.2)",
            transform: "rotate(2deg)",
          }}
        >
          <img
            src={post.imageUrl}
            alt={`post-image-${post.id}`}
            style={{
              height: "90%",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              color: "#333333",
              width: "100%",
            }}
          >
            <img
              src={
                post.user?.avatarUrl ||
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/default_avatar.png`
              }
              alt="user_image"
              style={{
                height: "30px",
                width: "30px",
                objectFit: "cover",
                borderRadius: "15px",
                marginRight: "2px",
              }}
            />
            <p style={{ fontWeight: "bold", fontSize: "24px" }}>
              {post.user?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("post_id");
    const res = await api.get(`/posts/${postId}`);
    const { data } = res;
    const post: Post = camelcaseKeys(data, { deep: true });

    // Googleフォントの取得
    const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
    endpoint.searchParams.set("family", "Zen Kaku Gothic New");
    endpoint.searchParams.set(
      "key",
      process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY as string
    );
    const info = await fetch(endpoint).then((res) => res.json());
    const fontResponse = await fetch(info.items[0].files["900"]);
    const fontBuffer = await fontResponse.arrayBuffer();

    return new ImageResponse(<OgImage post={post} />, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Zen_Kaku_Gothic_New",
          data: fontBuffer,
        },
      ],
    });
  } catch (e) {
    return new Response(`エラーが発生しました。${e}`, { status: 500 });
  }
}

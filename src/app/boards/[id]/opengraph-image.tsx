import { api } from "@/lib/axiosInstance";
import { ImageResponse } from "next/og";
import { Board } from "../../types";
import camelcaseKeys from "camelcase-keys";
export const runtime = "nodejs";
export const alt = "About Acme";
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await api.get(`/boards/${id}`);
  const { data } = res;
  const board: Board = camelcaseKeys({ ...data }, { deep: true });
  console.log(board);
  const title: string =
    board.category === "迷子"
      ? "探しています。"
      : board.category === "保護"
        ? "保護しました。"
        : "目撃しました。";
  const categoryText: string =
    board.category === "迷子"
      ? "いなくなった"
      : board.category === "保護"
        ? "保護した"
        : "目撃した";
  const categoryColor: string =
    board.category === "迷子"
      ? "#F87171"
      : board.category === "保護"
        ? "#60A5FAaa"
        : "#8aa8aa";

  const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
  endpoint.searchParams.set("family", "Zen Kaku Gothic New");
  endpoint.searchParams.set(
    "key",
    process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY as string
  );
  const info = await fetch(endpoint).then((res) => res.json());
  console.log(info);

  const fontResponse = await fetch(info.items[0].files["900"]);
  const fontBuffer = await fontResponse.arrayBuffer();

  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: categoryColor,
            color: "#333333",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "#333",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "60%",
                height: "100%",
                display: "flex",
                paddingRight: "20px",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <h1
                style={{
                  width: "100%",
                  height: "15%",
                  fontSize: "80px",
                  color: "#fafafa",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 0,
                  padding: "10px",
                }}
              >
                <p>{title}</p>
              </h1>
              <div
                style={{
                  background: "#fafafa",
                  borderRadius: "10px",
                  width: "100%",
                  height: "80%",
                  marginTop: "30px",
                  padding: "10px",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    paddingTop: "10px",
                    fontSize: "14px",
                    color: "#8aa8aa",
                  }}
                >
                  {categoryText}日時
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    paddingBottom: "10px",
                    borderStyle: "dashed",
                    borderBottom: "#33333330",
                    fontSize: "24px",
                  }}
                >
                  {board.formatedDate} 頃
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    paddingTop: "10px",
                    fontSize: "14px",
                    color: "#8aa8aa",
                  }}
                >
                  {categoryText}場所
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    paddingBottom: "10px",
                    borderStyle: "dashed",
                    borderBottom: "#33333330",
                    fontSize: "24px",
                  }}
                >
                  {board.location} 近辺
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    paddingTop: "10px",
                    fontSize: "14px",
                    color: "#8aa8aa",
                  }}
                >
                  種別
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    paddingBottom: "10px",
                    borderStyle: "dashed",
                    borderBottom: "#33333330",
                    fontSize: "24px",
                  }}
                >
                  {board.breed}
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    paddingTop: "10px",
                    fontSize: "14px",
                    color: "#8aa8aa",
                  }}
                >
                  特徴
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    paddingBottom: "10px",
                    borderStyle: "dashed",
                    borderBottom: "#33333330",
                    fontSize: "24px",
                  }}
                >
                  {board.feature}
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    paddingTop: "10px",
                    fontSize: "14px",
                    color: "#8aa8aa",
                  }}
                >
                  {categoryText}時の状況
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    paddingBottom: "10px",
                    borderStyle: "dashed",
                    fontSize: "18px",
                  }}
                >
                  {board.body}
                </p>
              </div>
            </div>
            <div
              style={{
                height: "100%",
                width: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <img
                src={board.images[0].url}
                alt="image1"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Zen_Kaku_Gothic_New",
            data: fontBuffer,
          },
        ],
      }
    );
  } catch (error) {
    console.error("画像処理中のエラー:", error);
    throw new Error("画像の生成に失敗しました");
  }
}

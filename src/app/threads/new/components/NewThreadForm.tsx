"use client";
import Image from "next/image";
import dogIcon from "/public/images/ic_dog.png";
import catIcon from "/public/images/ic_cat.png";
import birdIcon from "/public/images/ic_bird.png";
import rabbitIcon from "/public/images/ic_rabbit.png";
import { useEffect, useRef, useState } from "react";
import useGoogleMaps from "@/hooks/useGoogleMaps";

export const NewThreadForm = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError } = useGoogleMaps();
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    // 現在地の取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("現在地の取得に失敗しました:", error);
        // 失敗した場合、東京の座標をデフォルトとして設定
        setCenter({ lat: 35.6895, lng: 139.6917 });
      }
    );
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && center) {
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
        disableDefaultUI: true,
        gestureHandling: "greedy",
        draggable: true, // ドラッグを有効化
        scrollwheel: true, // スクロールでズームを有効化
      });

      // 地図の中心が移動されたときに中心位置を更新
      map.addListener("center_changed", () => {
        const newCenter = map.getCenter();
        if (newCenter) {
          setCenter({
            lat: newCenter.lat(),
            lng: newCenter.lng(),
          });
        }
      });
    }
  }, [isLoaded, center]);

  if (loadError) {
    return <div>Google Mapsの読み込み中にエラーが発生しました。</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">掲示板を作成</h1>
      <form method="post">
        <section className="divide-y space-y-4">
          <div className="flex items-center space-x-2 py-1">
            <div>
              <input
                type="radio"
                name="radio-1"
                className="mr-1"
                defaultChecked
              />
              <label className="font-bold">まいご</label>
            </div>
            <div>
              <input type="radio" name="radio-1" className="mr-1" />
              <label className="font-bold">保護</label>
            </div>
          </div>
          <div className="py-1">
            <label className="text-sm font-bold">分類</label>
            <div className="flex items-center">
              <div className="flex items-center pr-3">
                <div className="h-5 w-5 relative mr-1">
                  <Image
                    src={dogIcon}
                    alt="dog_icon"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="font-bold">いぬ</p>
              </div>
              <div className="flex items-center pr-3">
                <div className="h-5 w-5 relative mr-1">
                  <Image
                    src={catIcon}
                    alt="dog_icon"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="font-bold">ねこ</p>
              </div>
              <div className="flex items-cente pr-3">
                <div className="h-5 w-5 relative">
                  <Image
                    src={birdIcon}
                    alt="dog_icon"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="font-bold">とり</p>
              </div>
              <div className="flex items-center pr-3">
                <div className="h-5 w-5 relative">
                  <Image
                    src={rabbitIcon}
                    alt="dog_icon"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="font-bold">うさぎ</p>
              </div>
              <div className="flex items-center w-1/5">
                <p className="font-bold">その他</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">種類</label>
            <div>
              <input
                type="text"
                placeholder="いなくなったペットの種類"
                className="w-full p-2 bg-gray-100 rounded outline-none"
              />
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">名前</label>
            <div>
              <input
                type="text"
                placeholder="いなくなったペットの名前"
                className="w-full p-2 bg-gray-100 rounded outline-none"
              />
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">掲載用のアイコン</label>
            <div className="h-16 w-16 rounded-full bg-gray-200 bg-opacity-50 relative overflow-hidden">
              <div className="flex items-center justify-center h-full w-full">
                <span
                  className="material-icons text-gray-300"
                  style={{ fontSize: "32px" }}
                >
                  add_photo_alternate
                </span>
              </div>
            </div>
            <div>
              <input type="file" accept="images/*" hidden />
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">年齢</label>
            <div>
              <input
                type="number"
                placeholder="年齢"
                className="p-2 bg-gray-100 rounded mr-1 w-14 outline-none"
              />
              <label className="font-bold">歳</label>
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">いなくなった日時</label>
            <div>
              <input
                type="datetime-local"
                placeholder="年齢"
                className="w-full p-2 bg-gray-100 rounded mr-1 outline-none"
              />
            </div>
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">いなくなった場所</label>
            <div className="flex items-center p-1">
              <input type="checkbox" className="mr-1" />
              <label className="text-xs">正確な位置情報を共有しない</label>
            </div>
            {isLoaded && center ? (
              <div className="relative border border-gray-200 bg-gray-100 rounded w-full h-64">
                <div ref={mapRef} className="absolute inset-0"></div>
                {/* 中央の「+」マーク */}
                <div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500"
                  style={{ fontSize: "24px" }}
                >
                  +
                </div>
              </div>
            ) : (
              <p>地図を読み込んでいます...</p>
            )}
            {center && (
              <p className="text-xs mt-2">
                中心の位置: 緯度 {center.lat.toFixed(6)}, 経度{" "}
                {center.lng.toFixed(6)}
              </p>
            )}
          </div>
          <div className="py-2">
            <label className="text-sm font-bold">
              いなくなったペットの写真
            </label>
            <div className="grid grid-cols-4">
              <div className="bg-gray-100 w-full h-28 rounded p-1 flex flex-col items-center justify-center text-gray-400">
                <span className="material-icons" style={{ fontSize: "36px" }}>
                  camera_alt
                </span>
                <p className="text-xs font-bold p-0.5">写真を追加</p>
              </div>
            </div>
          </div>
        </section>
        <div className="flex items-center">
          <button type="button" className="p-3 w-1/2 font-bold">
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-main p-3 text-white font-bold w-1/2 rounded"
          >
            掲示板を作成
          </button>
        </div>
      </form>
    </div>
  );
};

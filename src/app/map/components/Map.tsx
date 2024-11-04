"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useWalking } from "@/hooks/useWalking";
import { showPostModal } from "./PostModal";

const Map: React.FC = () => {
  const { inProgress, sendCheckpoint } = useWalking();
  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [locationCount, setLocationCount] = useState(0); // 取得回数をカウント

  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setLocationCount((prevCount) => prevCount + 1);

          if (
            currentPosition &&
            google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(currentPosition),
              new google.maps.LatLng(newPosition)
            ) < 3
          ) {
            return;
          }

          if (!currentPosition) {
            console.log(newPosition);
            setCurrentPosition(newPosition);
            sendCheckpoint(latitude, longitude);
          }

          setPath((prevPath) => [...prevPath, newPosition]);
          setCurrentPosition(newPosition);
        },
        (error) => {
          console.error("Error obtaining location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // 初回のみ現在地を取得して初期位置に設定
    if (!currentPosition) {
      getLocation();
    }
    if (inProgress) {
      // 5秒おきに位置情報を取得
      const intervalId = setInterval(getLocation, 5000);
      return () => clearInterval(intervalId); // クリーンアップ
    }
  }, [inProgress, currentPosition]);

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          libraries={["geometry"]}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentPosition || { lat: 35.6812, lng: 139.7671 }} // currentPositionがまだ設定されていない場合はデフォルト
            zoom={currentPosition ? 17 : 5} // 初期位置取得前はズームアウトして表示
          >
            {currentPosition && <Marker position={currentPosition} />}
            <Polyline
              path={path}
              options={{ strokeColor: "#90acaf", strokeWeight: 12 }}
            />
          </GoogleMap>
        </LoadScript>

        {/* 現在の緯度経度と取得回数を表示 */}
        <div className="absolute top-28 left-4 bg-white p-2 rounded shadow-md">
          <p>取得回数: {locationCount} 回</p>
          {currentPosition && (
            <p>
              現在地: 緯度 {currentPosition.lat}, 経度 {currentPosition.lng}
            </p>
          )}
        </div>
      </div>
      <div className="fixed right-2 bottom-36 z-20">
        <div className="flex flex-col items-center justify-center space-y-2">
          <button className="rounded-full h-16 w-16 bg-base flex items-center justify-center shadow transition-all active:scale-95">
            <span
              className="material-icons select-none"
              style={{ fontSize: "32px" }}
            >
              my_location
            </span>
          </button>
          <button className="rounded-2xl h-16 w-16 bg-blue-500 flex flex-col items-center justify-center shadow transition-all active:scale-95">
            <span
              className="material-icons text-base translate-y-1.5 select-none"
              style={{ fontSize: "36px" }}
            >
              checklist
            </span>
            <span
              className="text-base font-bold select-none"
              style={{ fontSize: "10px" }}
            >
              ミッション
            </span>
          </button>
          <button
            className="rounded-2xl h-16 w-16 bg-main flex flex-col items-center justify-center shadow transition-all active:scale-95"
            onClick={showPostModal}
          >
            <span
              className="material-icons text-base translate-y-1.5 select-none"
              style={{ fontSize: "36px" }}
            >
              search
            </span>
            <span
              className="text-base font-bold select-none"
              style={{ fontSize: "10px" }}
            >
              みつけた
            </span>
          </button>
          <button
            className="rounded-2xl h-16 w-16 bg-orange-400 flex flex-col items-center justify-center shadow transition-all active:scale-95"
            onClick={() => {
              const dialog = document.getElementById(
                "startModal"
              ) as HTMLDialogElement | null;
              if (dialog) {
                dialog.showModal();
              }
            }}
          >
            <span
              className="material-icons text-base translate-y-1.5 select-none"
              style={{ fontSize: "36px" }}
            >
              directions_walk
            </span>
            <span
              className="text-base font-bold select-none"
              style={{ fontSize: "10px" }}
            >
              さんぽ
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Map;

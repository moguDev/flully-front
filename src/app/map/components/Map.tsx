"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const Map: React.FC = () => {
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
          console.log(newPosition);

          if (!currentPosition) setCurrentPosition(newPosition);

          setPath((prevPath) => [...prevPath, newPosition]);
          setLocationCount((prevCount) => prevCount + 1);
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
    // 5秒おきに位置情報を取得
    const intervalId = setInterval(getLocation, 5000);
    return () => clearInterval(intervalId); // クリーンアップ
  }, [currentPosition]);

  return (
    <div className="fixed top-0 left-0 h-screen w-full">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition || { lat: 35.6812, lng: 139.7671 }} // 初期位置
          zoom={17}
        >
          {currentPosition && <Marker position={currentPosition} />}
          <Polyline
            path={path}
            options={{ strokeColor: "#90acaf", strokeWeight: 12 }}
          />
        </GoogleMap>
      </LoadScript>

      {/* 現在の緯度経度と取得回数を表示 */}
      <div className="absolute top-20 left-4 bg-white p-2 rounded shadow-md">
        <p>取得回数: {locationCount} 回</p>
        {currentPosition && (
          <p>
            現在地: 緯度 {currentPosition.lat}, 経度 {currentPosition.lng}
          </p>
        )}
      </div>
    </div>
  );
};

export default Map;

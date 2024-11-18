"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  OverlayView,
  Polyline,
} from "@react-google-maps/api";
import { useWalking } from "@/hooks/useWalking";
import { showPostModal } from "./PostModal";
import { HalfModal } from "./HarfModal";
import { usePosts } from "@/hooks/usePosts";
import Image from "next/image";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { useBoards } from "@/hooks/useBoards";
import { useRouter } from "next/navigation";
import { NearbyInformation } from "@/app/components/NearbyInformation";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { showStartWalkingModal } from "./StartWalkingModal";

const FixedSizeCircles = ({
  position,
}: {
  position: { lat: number; lng: number };
}) => {
  const iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <!-- 薄い円 -->
      <circle cx="20" cy="20" r="18" fill="#90acaf" fill-opacity="0.2" />
      <!-- 濃い円 -->
      <circle cx="20" cy="20" r="7" fill="#90acaf" stroke="#fafafa" stroke-width="1.5" />
    </svg>
  `;

  return (
    <Marker
      position={position}
      icon={{
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(iconSvg),
        scaledSize: new google.maps.Size(40, 40), // サイズをピクセル単位で指定
        anchor: new google.maps.Point(20, 20), // アイコンの中心を基準点に
      }}
    />
  );
};

const Map: React.FC = () => {
  const router = useRouter();
  const { inProgress, checkpoints, sendCheckpoint } = useWalking();
  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [locationCount, setLocationCount] = useState(0);
  const { posts, fetchNearByPost } = usePosts();
  const { boards, fetchNearbyBoard } = useBoards();
  const [harfModalIsOpen, setHarfModalIsOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { showAlert, requireSignin } = useToast();

  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<google.maps.Map | null>(null); // マップの ref を追加

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

          setPath((prevPath) => [...prevPath, newPosition]);
          setCurrentPosition(newPosition);
          sendCheckpoint(latitude, longitude);
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
    if (checkpoints.length > 0) {
      setPath(checkpoints);
    }
  }, [checkpoints]);

  useEffect(() => {
    if (!currentPosition) {
      getLocation();
    }
    if (inProgress) {
      const intervalId = setInterval(getLocation, 5000);
      return () => clearInterval(intervalId);
    }
  }, [inProgress, currentPosition]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          fetchNearByPost(lat, lng);
          fetchNearbyBoard(lat, lng);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("位置情報の取得に失敗しました。");
        }
      );
    } else {
      alert("位置情報が利用できません。");
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="flex absolute top-0 left-0 h-full w-full">
        <div className="lg:block hidden">
          <NearbyInformation posts={posts} boards={boards} />
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition || { lat: 35.6812, lng: 139.7671 }}
          zoom={currentPosition ? 17 : 5}
          onLoad={(map) => {
            mapRef.current = map; // mapRef.current に map を代入
          }}
        >
          {currentPosition && <FixedSizeCircles position={currentPosition} />}
          <Polyline
            path={path}
            options={{ strokeColor: "#90acaf", strokeWeight: 12 }}
          />
          {posts.map((post, index) => (
            <OverlayView
              key={index}
              position={{ lat: post.lat, lng: post.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                className="rounded-full overflow-hidden w-8 h-8 shadow border border-white relative"
                onClick={() => {
                  setHarfModalIsOpen(true);
                  router.replace(`?post_id=${post.id}`);
                }}
              >
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt="Post Thumbnail"
                    className="object-cover"
                    fill
                  />
                )}
              </div>
            </OverlayView>
          ))}
        </GoogleMap>
        {/* <div className="absolute top-28 right-4 bg-white p-2 rounded shadow-md">
          <p>取得回数: {locationCount} 回</p>
          {currentPosition && (
            <p>
              現在地: 緯度 {currentPosition.lat}, 経度 {currentPosition.lng}
            </p>
          )}
        </div> */}
      </div>
      <div className="fixed lg:bottom-10 lg:right-4 bottom-36 right-2 z-20">
        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            className="rounded-full h-16 w-16 bg-base flex items-center justify-center shadow transition-all active:scale-95"
            onClick={() => {
              if (mapRef.current && currentPosition) {
                mapRef.current.panTo(currentPosition); // currentPosition にマップを移動
              }
            }}
          >
            <span
              className="material-icons select-none"
              style={{ fontSize: "32px" }}
            >
              my_location
            </span>
          </button>
          <button
            className="rounded-2xl h-16 w-16 bg-blue-500 flex flex-col items-center justify-center shadow transition-all active:scale-95"
            onClick={() => showAlert("開発中の機能です")}
          >
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
            onClick={() => {
              if (isAuthenticated) {
                showPostModal();
              } else {
                requireSignin();
              }
            }}
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
              if (isAuthenticated) {
                showStartWalkingModal();
              } else {
                requireSignin();
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
      <div className="lg:hidden">
        <HalfModal posts={posts} boards={boards} open={harfModalIsOpen} />
      </div>
    </>
  );
};

export default Map;

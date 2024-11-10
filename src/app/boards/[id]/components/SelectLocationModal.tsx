"use client";
import { useEffect, useRef, useState } from "react";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { useBoardComments } from "@/hooks/useBoardComments"; // useBoardComments フックのインポート

export const showModal = () => {
  const dialog = document.getElementById(
    "selectLocationModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};

export const closeModal = () => {
  const dialog = document.getElementById(
    "selectLocationModal"
  ) as HTMLDialogElement | null;
  if (dialog) {
    dialog.close();
  }
};

export const SelectLocationModal = ({ boardId }: { boardId: number }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useGoogleMaps();
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { sendComment } = useBoardComments(boardId);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error retrieving location", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && currentPosition && !mapInstance.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: currentPosition,
        zoom: 15,
        disableDefaultUI: true, // すべてのデフォルトUIを非表示にする
      });
      mapInstance.current = map;
    }
  }, [isLoaded, currentPosition]);

  const handleSendLocation = () => {
    if (mapInstance.current) {
      const center = mapInstance.current.getCenter();
      if (center) {
        const location = {
          lat: center.lat(),
          lng: center.lng(),
        };
        console.log("Selected Location:", location);

        // 位置情報を送信
        sendComment(location);
      }
    }
    closeModal();
  };

  if (loadError) {
    return <div>マップの読み込み中にエラーが発生しました</div>;
  }

  return (
    <dialog id="selectLocationModal" className="modal space-y-1">
      <div className="modal-box bg-base rounded p-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg pt-2">位置情報</h3>
          <button className="material-icons" onClick={closeModal}>
            close
          </button>
        </div>
        {!isLoaded || !currentPosition ? (
          <div className="flex justify-center items-center h-64">
            読み込み中...
          </div>
        ) : (
          <div className="relative w-full h-64 my-1 rounded">
            <div
              ref={mapRef}
              className="absolute top-0 left-0 w-full h-full"
            ></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-black">+</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center space-x-2 mt-3">
          <button
            className="rounded text-black font-bold w-full p-3 flex items-center justify-center"
            onClick={closeModal}
          >
            キャンセル
          </button>
          <button
            className="bg-main rounded text-base font-bold w-full p-3 flex items-center justify-center"
            onClick={handleSendLocation}
          >
            位置情報を送信
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <style jsx>{`
        .h-64 {
          height: 16rem;
        }
      `}</style>
    </dialog>
  );
};

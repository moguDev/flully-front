"use client";
import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import { showPostModal } from "./PostModal";
import { HalfModal } from "./HarfModal";
import { usePosts } from "@/hooks/usePosts";
import Image from "next/image";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { useBoards } from "@/hooks/useBoards";
import { useRouter } from "next/navigation";
import { NearbyInformation } from "@/app/map/components/NearbyInformation";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { atom, useRecoilState } from "recoil";
import { SelectCategoryButton } from "./SelectCategoryButton";
import { removeParamsFromUrl } from "@/lib";

const FixedSizeCircles = ({
  position,
}: {
  position: { lat: number; lng: number };
}) => {
  const iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <circle cx="20" cy="20" r="20" fill="#90acaf" fill-opacity="0.3" />
      <circle cx="20" cy="20" r="7.5" fill="#90acaf" stroke="#fafafa" stroke-width="2.0" />
    </svg>
  `;

  return (
    <Marker
      position={position}
      icon={{
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(iconSvg),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      }}
    />
  );
};

export const focusPositionState = atom<google.maps.LatLngLiteral | null>({
  key: "focusPositionState",
  default: null,
});

export const selectDisplayTabState = atom<number>({
  key: "selectDisplayTabState",
  default: 0,
});

export const Map: React.FC = () => {
  const router = useRouter();
  const [selectTab, setSelectTab] = useRecoilState<number>(
    selectDisplayTabState
  );

  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  const [focusPosition, setFocusPosition] =
    useRecoilState<google.maps.LatLngLiteral | null>(focusPositionState);

  const { posts } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const { boards } = useBoards();
  const [filteredBoards, setFilteredBoards] = useState(boards);

  const [harfModalIsOpen, setHarfModalIsOpen] = useState<boolean>(false);
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const { requireSignin } = useToast();

  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  const watchIdRef = useRef<number | null>(null);

  const startWatchingLocation = () => {
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          if (currentPosition) {
            const distance =
              google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(currentPosition),
                new google.maps.LatLng(newPosition)
              );
            if (distance < 10.0) {
              return;
            }
          }
          setCurrentPosition(newPosition);
        },
        (error) => {
          console.error("Error watching location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const stopWatchingLocation = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  const panToFocusPosition = () => {
    if (mapRef.current && focusPosition) {
      mapRef.current.panTo(focusPosition);
      if (mapRef.current.getZoom()! < 15) mapRef.current.setZoom(16);
    }
  };

  useEffect(panToFocusPosition, [focusPosition]);

  useEffect(() => {
    startWatchingLocation();
    return () => {
      stopWatchingLocation();
    };
  }, []);

  const handleBoundsChanged = () => {
    if (!mapRef.current || !currentPosition) return;
    const newCenter = mapRef.current.getCenter();
    if (newCenter) {
      setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    }
  };

  const filterPosts = () => {
    if (!mapRef.current || !currentPosition) return;

    const bounds = mapRef.current.getBounds();
    if (bounds) {
      const filteredPosts = posts.filter((post) => {
        const postLatLng = new google.maps.LatLng(post.lat, post.lng);
        return bounds.contains(postLatLng);
      });
      setFilteredPosts(filteredPosts);
    }
  };

  const filterBoards = () => {
    if (!mapRef.current || !center) return;

    const filteredBoards = boards.filter((board) => {
      if (board.isLocationPublic && center) {
        const boardLatLng = new google.maps.LatLng(board.lat!, board.lng);
        const centerLatLng = new google.maps.LatLng(center);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          boardLatLng,
          centerLatLng
        );
        return distance <= 10000;
      }
      return false;
    });
    setFilteredBoards(filteredBoards);
  };

  useEffect(filterPosts, [currentPosition, posts]);

  useEffect(() => {
    filterPosts();
    filterBoards();
  }, [center, posts, boards]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <section>
        <div
          className={`z-20 fixed flex items-center justify-center w-full top-16`}
        >
          <div className="flex items-center rounded-full bg-gray-100 mt-2 p-1">
            <SelectCategoryButton
              icon="pets"
              label="みつかった動物"
              selected={selectTab === 0}
              onClick={() => setSelectTab(0)}
            />
            <SelectCategoryButton
              icon="campaign"
              label="迷子・保護情報"
              selected={selectTab === 1}
              onClick={() => setSelectTab(1)}
            />
          </div>
        </div>
        <div className={`flex absolute h-full w-full`}>
          <div className="lg:block hidden">
            <NearbyInformation posts={filteredPosts} boards={filteredBoards} />
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentPosition || { lat: 35.6812, lng: 139.7671 }}
            zoom={currentPosition ? 15 : 5}
            options={{
              gestureHandling: "greedy",
              disableDefaultUI: true,
            }}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onBoundsChanged={handleBoundsChanged}
          >
            {currentPosition && <FixedSizeCircles position={currentPosition} />}
            {selectTab === 0 &&
              posts.map((post, index) => (
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
                        src={removeParamsFromUrl(post.imageUrl)!}
                        alt="Post Thumbnail"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                </OverlayView>
              ))}
            {selectTab === 1 &&
              boards.map(
                (board, index) =>
                  board.lat &&
                  board.lng && (
                    <OverlayView
                      key={`board-${index}`}
                      position={{ lat: board.lat, lng: board.lng }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div
                        className="rounded-full overflow-hidden w-8 h-8 shadow border border-white relative"
                        onClick={() => {
                          router.push(`/boards/${board.id}`);
                        }}
                      >
                        <Image
                          src={removeParamsFromUrl(board.iconUrl)!}
                          alt="Board Icon"
                          className="object-cover"
                          fill
                        />
                      </div>
                    </OverlayView>
                  )
              )}
          </GoogleMap>
        </div>
        <div className="fixed lg:bottom-10 lg:right-4 bottom-36 right-2 z-20">
          <div className="flex flex-col items-center justify-center lg:space-y-4 space-y-2">
            <button
              className="rounded-full h-16 w-16 bg-base flex items-center justify-center shadow transition-all active:scale-95"
              onClick={() => {
                setFocusPosition(currentPosition);
                panToFocusPosition();
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
                className="material-icons text-base translate-y-1 select-none"
                style={{ fontSize: "36px" }}
              >
                add_a_photo
              </span>
              <span
                className="text-base font-bold select-none"
                style={{ fontSize: "10px" }}
              >
                みつけた
              </span>
            </button>
          </div>
        </div>
      </section>
      <div className="lg:hidden">
        <HalfModal
          posts={filteredPosts}
          boards={filteredBoards}
          open={harfModalIsOpen}
        />
      </div>
    </>
  );
};

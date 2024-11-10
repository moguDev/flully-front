"use client";

import { Walk } from "@/app/types";
import { useWalks } from "@/hooks/useWalks";
import Image from "next/image";

const GridItem = ({ walk }: { walk: Walk }) => {
  const size = "400x400";
  const zoom = 15;

  // Prepare path and markers parameters for the route
  const path = walk.checkpoints
    .map((checkpoint) => `${checkpoint.lat},${checkpoint.lng}`)
    .join("|");
  const markers = walk.checkpoints
    .map(
      (checkpoint) => `markers=color:red|${checkpoint.lat},${checkpoint.lng}`
    )
    .join("&");

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${walk.checkpoints[0].lat},${walk.checkpoints[0].lng}&zoom=${zoom}&size=${size}&path=color:0x0000ff|weight:2|${path}&${markers}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div className="p-0.5">
      <div className="w-full h-32 bg-gray-200 rounded-md relative">
        <Image
          src={mapUrl}
          alt="Walk route map"
          className="w-full h-full object-cover rounded-md"
          fill
        />
        <div className="absolute bottom-0 w-full bg-main bg-opacity-80 rounded-b-md py-1">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-bold text-white flex items-center">
              <span className="material-icons" style={{ fontSize: "18px" }}>
                directions_walk
              </span>
              {walk.totalDistance}
              <span style={{ fontSize: "10px" }}>km</span>
            </p>
            <p className="text-sm font-bold text-white flex items-center">
              <span
                className="material-icons mr-0.5"
                style={{ fontSize: "18px" }}
              >
                camera_alt
              </span>
              {walk.posts.length}
            </p>
          </div>
          <p
            className="font-bold text-white text-right px-1"
            style={{ fontSize: "10px" }}
          >
            {walk.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export const WalksList = () => {
  const { walks } = useWalks();
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold p-1">散歩した記録</p>
        <p className="font-bold">{walks.length}件</p>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {walks.map((walk, index) => (
          <GridItem key={index} walk={walk} />
        ))}
      </div>
    </div>
  );
};

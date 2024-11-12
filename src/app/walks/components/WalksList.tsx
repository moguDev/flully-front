"use client";

import { Walk } from "@/app/types";
import { useStaticMap } from "@/hooks/useStaticMap";
import { useWalks } from "@/hooks/useWalks";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GridItem = ({ walk }: { walk: Walk }) => {
  const router = useRouter();
  const { mapUrl } = useStaticMap(walk);

  return (
    <button
      onClick={() => router.push(`/walks/${walk.id}`)}
      className="transition-all active:scale-95"
    >
      <div className="w-full h-32 bg-gray-200 border-2 border-main border-opacity-90 rounded-md relative">
        <Image
          src={mapUrl}
          alt="Walk route map"
          className="w-full h-full object-cover rounded-md"
          fill
        />
        <div className="absolute bottom-0 w-full bg-main bg-opacity-90 rounded-b-md py-1">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-bold text-white flex items-center">
              <span className="material-icons" style={{ fontSize: "18px" }}>
                directions_walk
              </span>
              {walk.totalDistance}
              <span className="ml-0.5" style={{ fontSize: "10px" }}>
                km
              </span>
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
    </button>
  );
};

export const WalksList = () => {
  const { walks } = useWalks();
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold px-1 py-2">散歩した記録</p>
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

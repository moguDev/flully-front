import { Walk } from "@/app/types";
import { useEffect, useState } from "react";

export const useStaticMap = (content: Walk | null) => {
  const [mapUrl, setMapUrl] = useState<string>("");
  const createMapUrl = () => {
    if (content) {
      const size = "800x800";
      const zoom = 15;
      const path = content.checkpoints
        .map((checkpoint) => `${checkpoint.lat},${checkpoint.lng}`)
        .join("|");
      const markers = content.checkpoints
        .map(
          (checkpoint) =>
            `markers=color:red|${checkpoint.lat},${checkpoint.lng}`
        )
        .join("&");

      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${content.checkpoints[0].lat},${content.checkpoints[0].lng}&zoom=${zoom}&size=${size}&path=color:0x90acaf|weight:12|${path}&${markers}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      setMapUrl(mapUrl);
    }
  };

  useEffect(() => {
    createMapUrl();
  }, [content]);

  return { mapUrl };
};

import { useLoadScript } from "@react-google-maps/api";

const LIBRARIES: ["geometry"] = ["geometry"];

const useGoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  return { isLoaded, loadError };
};

export default useGoogleMaps;

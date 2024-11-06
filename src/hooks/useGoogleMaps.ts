import { useLoadScript } from "@react-google-maps/api";

const useGoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["geometry"],
  });

  return { isLoaded, loadError };
};

export default useGoogleMaps;

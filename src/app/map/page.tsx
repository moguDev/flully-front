import { FinishWalkingModal } from "./components/FinishWalkingModal";
import Map from "./components/Map";
import { StartWalkingModal } from "./components/StartWalkingModal";

export default function MapPage() {
  return (
    <main className="bg-base w-full">
      <Map />
      <StartWalkingModal />
      <FinishWalkingModal />
    </main>
  );
}

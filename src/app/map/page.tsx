import { FinishWalkingModal } from "./components/FinishWalkingModal";
import { HalfModal } from "./components/HarfModal";
import Map from "./components/Map";
import { StartWalkingModal } from "./components/StartWalkingModal";

export default function MapPage() {
  return (
    <main className="bg-base w-full">
      <Map />
      <HalfModal />
      <StartWalkingModal />
      <FinishWalkingModal />
    </main>
  );
}

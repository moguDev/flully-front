import { FloatingActionButtons } from "./components/FloatingActionButtons";
import Map from "./components/Map";

export default function MapPage() {
  return (
    <main className="bg-base w-full">
      <Map />
      <div className="fixed right-2 bottom-20 z-50">
        <FloatingActionButtons />
      </div>
    </main>
  );
}

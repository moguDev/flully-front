import Image from "next/image";
import loadingGif from "/public/images/loading.gif";

export default function Loading() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div className="h-10 w-10 overflow-hidden relative">
        <Image src={loadingGif} alt="loading" className="object-cover" fill />
      </div>
      <p className="text-xs font-bold p-1">LOADING...</p>
    </main>
  );
}

export default function Loading() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <span className="loading loading-dots loading-sm opacity-30" />
      <p className="text-xs">読み込み中...</p>
    </main>
  );
}

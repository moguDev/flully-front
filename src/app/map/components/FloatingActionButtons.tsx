export const FloatingActionButtons = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <button className="rounded-full h-16 w-16 bg-base flex items-center justify-center shadow transition-all active:scale-95">
        <span
          className="material-icons select-none"
          style={{ fontSize: "32px" }}
        >
          my_location
        </span>
      </button>
      <button className="rounded-2xl h-16 w-16 bg-blue-500 flex flex-col items-center justify-center shadow transition-all active:scale-95">
        <span
          className="material-icons text-base translate-y-1.5 select-none"
          style={{ fontSize: "36px" }}
        >
          checklist
        </span>
        <span
          className="text-base font-bold select-none"
          style={{ fontSize: "10px" }}
        >
          ミッション
        </span>
      </button>
      <button className="rounded-2xl h-16 w-16 bg-main flex flex-col items-center justify-center shadow transition-all active:scale-95">
        <span
          className="material-icons text-base translate-y-1.5 select-none"
          style={{ fontSize: "36px" }}
        >
          search
        </span>
        <span
          className="text-base font-bold select-none"
          style={{ fontSize: "10px" }}
        >
          みつけた
        </span>
      </button>
      <button className="rounded-2xl h-16 w-16 bg-orange-400 flex flex-col items-center justify-center shadow transition-all active:scale-95">
        <span
          className="material-icons text-base translate-y-1.5 select-none"
          style={{ fontSize: "36px" }}
        >
          directions_walk
        </span>
        <span
          className="text-base font-bold select-none"
          style={{ fontSize: "10px" }}
        >
          さんぽ
        </span>
      </button>
    </div>
  );
};

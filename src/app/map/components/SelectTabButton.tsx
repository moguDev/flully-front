export const SelectTabButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`p-2 w-full min-w-36 text-sm rounded-full bg-main transition-all ${selected ? "bg-opacity-100 text-white font-bold" : "bg-opacity-0 text-gray-500"}`}
      onClick={onClick}
    >
      <p className="select-none">{label}</p>
    </button>
  );
};

export const SelectTabButton = ({
  iconName,
  label,
  selected,
  onClick,
}: {
  iconName: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-sm font-bold select-none p-4 relative cursor-pointer transition-all ${selected ? "text-black bg-white rounded-xl" : "text-gray-400"}`}
      onClick={onClick}
    >
      {selected && (
        <div className="bg-main h-1 w-full absolute bottom-0 left-0" />
      )}
      <span className="material-icons mr-0.5" style={{ fontSize: "16px" }}>
        {iconName}
      </span>
      <span>{label}</span>
    </div>
  );
};

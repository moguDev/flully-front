export const SelectCategoryButton = ({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`p-2 w-full min-w-36 text-sm rounded-full bg-main transition-all ${selected ? "bg-opacity-100 text-white font-bold" : "bg-opacity-0 text-gray-500"}`}
      onClick={onClick}
    >
      <p className="select-none flex items-center justify-center">
        <span className="material-icons mr-1" style={{ fontSize: "14px" }}>
          {icon}
        </span>
        <span>{label}</span>
      </p>
    </button>
  );
};

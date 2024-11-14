import { useState } from "react";

export const HalfModal = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  return (
    <div
      className={`pb-16 fixed bottom-0 left-0 bg-base w-full rounded-t-lg transition-all duration-300 z-30 ${isOpen ? "h-[70vh]" : "h-32"}`}
      style={{ boxShadow: "0 -1px 10px rgba(0, 0, 0, 0.10)" }}
    >
      <section onClick={() => setIsOpen((prev) => !prev)}>
        <div className="h-4 w-full flex items-center justify-center">
          <div className="bg-gray-300 w-16 h-1 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-12 flex items-center px-3">
            <span className="material-icons mr-1">sms</span>
            <p className="font-bold">コメント</p>
          </div>
          <p className="material-icons p-3">
            {isOpen ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          </p>
        </div>
      </section>
      {isOpen && children}
    </div>
  );
};

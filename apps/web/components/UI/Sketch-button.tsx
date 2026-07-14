import React, { ReactElement } from "react";

function SketchButton({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-md border border-black bg-white text-black font-semibold text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
    >
      {children}
    </button>
  );
}

export default SketchButton;

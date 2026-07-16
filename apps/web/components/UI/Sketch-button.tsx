import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SketchButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function SketchButton({ children, onClick, className }: SketchButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md border border-black bg-white text-black font-semibold text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default SketchButton;

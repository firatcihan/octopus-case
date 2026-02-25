import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] text-[#1A202C] placeholder-[#A0AEC0] focus:bg-white focus:ring-2 focus:ring-[#00C800] focus:border-transparent outline-none transition-all",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

import { ReactNode } from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({ size, children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-neutral-600 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" && "py-2 px-3",
        size === "md" && "py-3 px-4",
        size === "lg" && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

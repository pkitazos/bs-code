import { ReactNode } from "react";

export function Button({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-zinc-600 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:pointer-events-none"
    >
      {children}
    </button>
  );
}
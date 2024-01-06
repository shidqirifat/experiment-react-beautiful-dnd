import { ReactNode } from "react";

type ShadowProps = { children: ReactNode; onClick?: () => void };

export function Shadow({ children, onClick }: ShadowProps) {
  return (
    <div
      onClick={onClick}
      className="fixed overflow-auto inset-0 bg-black/30 z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-5xl md:w-[96vw] mx-auto md:my-12"
      >
        {children}
      </div>
    </div>
  );
}

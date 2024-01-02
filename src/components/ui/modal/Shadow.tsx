import { ReactNode } from "react";

type ShadowProps = { children: ReactNode; onClick?: () => void };

export function Shadow({ children, onClick }: ShadowProps) {
  return (
    <div
      onClick={onClick}
      className="fixed overflow-auto inset-0 bg-black/30 z-10"
    >
      <div onClick={(e) => e.stopPropagation()} className="m-12">
        {children}
      </div>
    </div>
  );
}

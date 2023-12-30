import { ReactNode } from "react";

type ShadowProps = { children: ReactNode; onClick?: () => void };

export function Shadow({ children, onClick }: ShadowProps) {
  return (
    <div onClick={onClick} className="fixed overflow-auto inset-0 bg-black/30">
      <div
        onClick={(e) => e.stopPropagation()}
        className="grid place-content-center py-12"
      >
        {children}
      </div>
    </div>
  );
}

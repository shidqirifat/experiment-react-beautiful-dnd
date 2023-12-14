import { ReactNode } from "react";

type ShadowProps = { children: ReactNode; onClick?: () => void };

export function Shadow({ children, onClick }: ShadowProps) {
  return (
    <div onClick={onClick} className="fixed inset-0 bg-black/30">
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

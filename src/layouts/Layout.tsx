import { ReactNode } from "react";
import { Header } from "./header";

type LayoutProps = { children: ReactNode };

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[url('/background.png')] h-screen bg-center bg-cover bg-no-repeat">
      <Header />
      <div className="m-4">{children}</div>
    </div>
  );
}

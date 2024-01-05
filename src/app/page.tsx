"use client";

import dynamic from "next/dynamic";

const ListCardTask = dynamic(
  () => import("@/components/task").then((task) => task.ListCardTask),
  { ssr: false }
);

export default function Page() {
  return <ListCardTask />;
}

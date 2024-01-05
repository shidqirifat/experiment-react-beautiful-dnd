"use client";

import dynamic from "next/dynamic";

const ListCardTask = dynamic(
  () => import("@/components/task").then((task) => task.ListCardTask),
  { ssr: false }
);

const TaskModal = dynamic(
  () => import("@/components/detail").then((task) => task.TaskModal),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <TaskModal />
      <ListCardTask />
    </>
  );
}

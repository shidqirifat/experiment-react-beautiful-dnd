import { TASKS } from "@/datas/task";
import { useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

export default function useArchiveTasks() {
  const [tasks, setTasks] = useLocalStorage({
    key: "tasks",
    defaultValue: TASKS,
  });

  const toggleArchive = useCallback(
    (id: string) => {
      const index = tasks.findIndex((task) => task.id === id);
      const cloneTasks = [...tasks];
      cloneTasks[index].archived = !cloneTasks[index].archived;

      setTasks(cloneTasks);
    },
    [tasks]
  );

  return { toggleArchive };
}

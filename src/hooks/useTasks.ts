import { useLocalStorage } from "@mantine/hooks";
import { TASKS } from "@/datas/task";
import { reorder } from "@/utils/reorder";
import { DropResult } from "react-beautiful-dnd";
import { Task } from "@/types/task";
import { useCallback } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage({
    key: "data",
    defaultValue: TASKS,
  });

  const handleReorder = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return;
      if (destination.index === source.index) return;

      const newTasks = reorder(tasks, source.index, destination.index);

      setTasks(newTasks);
    },
    [tasks]
  );

  const updateTask = useCallback(
    (id: string, newTask: Task) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index < 0) return;

      const cloneTasks = [...tasks];
      cloneTasks.splice(index, 1, newTask);
      setTasks(cloneTasks);
    },
    [tasks]
  );

  return { tasks, onReorder: handleReorder, updateTask };
}

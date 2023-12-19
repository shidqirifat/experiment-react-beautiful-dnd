import { useClickOutside } from "@mantine/hooks";
import { useCallback, useState } from "react";
import useTasks from "./useTasks";

export default function useNewTask() {
  const { onNewTask } = useTasks();
  const [isNewTask, setNewTask] = useState(false);
  const [title, setTitle] = useState("");

  const toggleNewTask = useCallback(() => setNewTask((prev) => !prev), []);

  const handleNewTask = useCallback(() => {
    if (title) onNewTask(title);
    setTitle("");
  }, [title]);

  const ref = useClickOutside(() => {
    setNewTask(false);
  });

  return {
    ref,
    isNewTask,
    title,
    toggleNewTask,
    setTitle,
    onNewTask: handleNewTask,
  };
}

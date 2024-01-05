"use client";

import { TASKS } from "@/datas/task";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import useTasks from "./useTasks";

export default function useArchiveTasks() {
  const [tasks, setTasks] = useLocalStorage({
    key: "tasks",
    defaultValue: TASKS,
  });
  const { activeTasks, setTasks: setAllTask } = useTasks();
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebouncedValue(keyword, 300);

  const toggleArchive = useCallback(
    (id: string) => {
      const index = tasks.findIndex((task) => task.id === id);
      const cloneTasks = [...tasks];
      cloneTasks[index].archived = !cloneTasks[index].archived;

      setTasks(cloneTasks);
    },
    [tasks]
  );

  const moveAllToArchive = useCallback(() => {
    setAllTask((prev) => {
      return prev.map((task) => {
        const activeTaskIds = activeTasks.map((task) => task.id);

        if (activeTaskIds.includes(task.id)) return { ...task, archived: true };
        return task;
      });
    });
  }, [activeTasks]);

  const initialArchivedTasks = useMemo(
    () => tasks.filter((task) => task.archived),
    [tasks]
  );

  const archivedTasks = useMemo(
    () =>
      initialArchivedTasks.filter((task) =>
        task.title.toLowerCase().includes(debouncedKeyword.toLowerCase())
      ),
    [initialArchivedTasks, debouncedKeyword]
  );

  return {
    keyword,
    initialArchivedTasks,
    archivedTasks,
    setKeyword,
    toggleArchive,
    moveAllToArchive,
  };
}

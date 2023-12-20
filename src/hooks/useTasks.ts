import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { reorder } from "@/utils/reorder";
import { DropResult } from "react-beautiful-dnd";
import { Task } from "@/types/task";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TASKS } from "@/datas/task";
import { useSearch } from "@/store/search";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage({
    key: "tasks",
    defaultValue: TASKS,
  });
  const { keyword } = useSearch();
  const [debouncedKeyword] = useDebouncedValue(keyword, 300);
  const navigate = useNavigate();

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

  const handleNewTask = useCallback((title: string) => {
    const newTask: Task = {
      id: (+new Date()).toString(),
      title,
      archived: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }, []);

  const handleDeleteTask = useCallback(
    (id: string) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index < 0) return;

      const cloneTasks = [...tasks];
      cloneTasks.splice(index, 1);
      setTasks(cloneTasks);

      navigate("/");
    },
    [tasks]
  );

  const activeTasks = useMemo(
    () =>
      tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(debouncedKeyword.toLowerCase()) &&
          !task.archived
        );
      }),
    [tasks, debouncedKeyword]
  );

  return {
    tasks,
    activeTasks,
    onReorder: handleReorder,
    updateTask,
    onNewTask: handleNewTask,
    onDeleteTask: handleDeleteTask,
  };
}

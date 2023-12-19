import { useLocalStorage } from "@mantine/hooks";
import { TASKS } from "@/datas/task";
import { reorder } from "@/utils/reorder";
import { DropResult } from "react-beautiful-dnd";
import { Task } from "@/types/task";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage({
    key: "data",
    defaultValue: TASKS,
  });
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

  return {
    tasks,
    onReorder: handleReorder,
    updateTask,
    onNewTask: handleNewTask,
    onDeleteTask: handleDeleteTask,
  };
}

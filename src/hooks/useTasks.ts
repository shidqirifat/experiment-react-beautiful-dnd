import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { reorder } from "@/utils/reorder";
import { DropResult } from "react-beautiful-dnd";
import { Task } from "@/types/task";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TASKS } from "@/datas/task";
import { useSearch } from "@/store/search";
import useSort from "./useSort";
import {
  sortByCreatedAtAsc,
  sortByCreatedAtDesc,
  sortByTitleAsc,
  sortByTitleDesc,
} from "@/utils/sort";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage({
    key: "tasks",
    defaultValue: TASKS,
  });
  const { sort, setSort } = useSort();
  const { keyword } = useSearch();
  const [debouncedKeyword] = useDebouncedValue(keyword, 300);
  const navigate = useNavigate();

  const activeTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(debouncedKeyword.toLowerCase()) &&
        !task.archived
      );
    });

    if (!sort) return filtered;

    return filtered.sort((a, b) => {
      const { sortBy, sortType } = sort;

      if (sortBy === "created-at") {
        if (sortType === "asc") return sortByCreatedAtAsc(a.id, b.id);
        if (sortType === "desc") return sortByCreatedAtDesc(a.id, b.id);
      }
      if (sortBy === "title") {
        if (sortType === "asc") return sortByTitleAsc(a.title, b.title);
        if (sortType === "desc") return sortByTitleDesc(a.title, b.title);
      }

      return 1;
    });
  }, [tasks, debouncedKeyword, sort]);

  const handleReorder = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return;
      if (destination.index === source.index) return;

      setSort(null);
      const newTasks = reorder(activeTasks, source.index, destination.index);
      setTasks(newTasks);
    },
    [activeTasks]
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
    activeTasks,
    debouncedKeyword,
    setTasks,
    onReorder: handleReorder,
    updateTask,
    onNewTask: handleNewTask,
    onDeleteTask: handleDeleteTask,
  };
}

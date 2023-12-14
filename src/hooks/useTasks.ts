import { useLocalStorage } from "@mantine/hooks";
import { TASKS } from "../datas/task";
import { reorder } from "../utils/reorder";
import { DropResult } from "react-beautiful-dnd";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage({
    key: "data",
    defaultValue: TASKS,
  });

  const handleReorder = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    const newTasks = reorder(tasks, source.index, destination.index);

    setTasks(newTasks);
  };

  return { tasks, onReorder: handleReorder };
}

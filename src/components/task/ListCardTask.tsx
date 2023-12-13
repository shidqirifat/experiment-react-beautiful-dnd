import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TASKS } from "../../datas/task";
import { Task } from "../../types/reorder";
import { reorder } from "../../utils/reorder";
import { useLocalStorage } from "@mantine/hooks";
import { TaskCard } from ".";

type ListTaskProps = { tasks: Array<Task> };
type TaskItemProps = { task: Task; index: number };

function TaskItem({ task, index }: TaskItemProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-lg bg-white px-4 py-2 select-none !cursor-pointer"
        >
          <TaskCard task={task} />
        </div>
      )}
    </Draggable>
  );
}

const ListTask = React.memo(function QuoteList({ tasks }: ListTaskProps) {
  return tasks.map((task, index) => (
    <TaskItem task={task} index={index} key={task.id} />
  ));
});

export const ListCardTask = () => {
  const [tasks, setTasks] = useLocalStorage({
    key: "data",
    defaultValue: TASKS,
  });

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    const newTasks = reorder(tasks, source.index, destination.index);

    setTasks(newTasks);
  };

  return (
    <div className="bg-gray-200 px-2 py-4 rounded-lg">
      <div className="px-4 mb-4 flex justify-between items-center overflow-hidden">
        <h1 className="text-lg font-semibold">Done 🎉</h1>
        <button className="text-2xl px-1 py-1 -mt-3 font-semibold hover:bg-gray-300 transition">
          ...
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              <ListTask tasks={tasks} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

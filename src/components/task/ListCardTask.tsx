import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "@/types/task";
import { NewTask, TaskCard } from ".";
import useTasks from "@/hooks/useTasks";
import { ActionMore } from "./more";

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
          className="rounded-lg bg-white select-none !cursor-pointer"
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

const generateTextMatch = (tasks: Array<Task>) => {
  const length = tasks.length;

  if (length > 1) return `${length} cards match filters`;
  return `${length} card matches filters`;
};

export const ListCardTask = () => {
  const { activeTasks, debouncedKeyword, onReorder } = useTasks();

  return (
    <div className="bg-gray-200 px-2 pt-3 pb-1 rounded-lg">
      <div className="px-4 mb-2 flex justify-between items-center overflow-hidden">
        <div>
          <h1 className="text-lg font-semibold mb-1">Done 🎉</h1>
          {debouncedKeyword && (
            <h4 className="text-sm text-slate-600 font-normal mb-1">
              {generateTextMatch(activeTasks)}
            </h4>
          )}
        </div>
        <ActionMore />
      </div>
      <DragDropContext onDragEnd={onReorder}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2 overflow-auto max-h-[calc(100vh-300px)]"
            >
              <ListTask tasks={activeTasks} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <NewTask />
    </div>
  );
};

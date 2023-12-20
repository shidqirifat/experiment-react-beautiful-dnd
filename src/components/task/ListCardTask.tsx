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

export const ListCardTask = () => {
  const { activeTasks, onReorder } = useTasks();

  return (
    <div className="bg-gray-200 px-2 pt-4 pb-1 rounded-lg">
      <div className="px-4 mb-4 flex justify-between items-center overflow-hidden">
        <h1 className="text-lg font-semibold">Done 🎉</h1>
        <ActionMore />
      </div>
      <DragDropContext onDragEnd={onReorder}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
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

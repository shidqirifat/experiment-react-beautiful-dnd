import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TodoSection } from ".";
import React from "react";
import { TodoItemProps, TodosSectionProps } from "@/types/todo";

function TodoItem({ todo, index, ...props }: TodoItemProps) {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4"
        >
          <TodoSection key={todo.id} {...todo} {...props} />
        </div>
      )}
    </Draggable>
  );
}

const ListTodo = React.memo(function QuoteList({
  todos,
  ...props
}: TodosSectionProps) {
  return todos?.map((todo, i) => (
    <TodoItem key={todo.id} index={i} todo={todo} {...props} />
  ));
});

export function TodosSection(props: TodosSectionProps) {
  return (
    <DragDropContext onDragEnd={props.onReorder}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ListTodo {...props} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

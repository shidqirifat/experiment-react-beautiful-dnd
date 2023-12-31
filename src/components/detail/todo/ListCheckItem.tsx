import { CheckItemSectionProps, ListProps } from "@/types/todo";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CheckItem } from ".";

function CheckItemSection({
  item,
  index,
  onCheck,
  onChange,
  onDelete,
}: CheckItemSectionProps) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CheckItem
            name={item.name}
            isDone={item.is_done}
            onCheck={onCheck}
            onChange={onChange}
            onDelete={onDelete}
          />
        </div>
      )}
    </Draggable>
  );
}

const List = React.memo(function QuoteList({
  id,
  checklist,
  hideDone,
  onCheck,
  onChange,
  onDelete,
}: ListProps) {
  return checklist?.map((item, i) => {
    if (hideDone && item.is_done) return null;

    return (
      <CheckItemSection
        key={item.id}
        index={i}
        item={item}
        onCheck={() => onCheck(id, item.id)}
        onChange={(name) => onChange({ todoId: id, checkId: item.id, name })}
        onDelete={() => onDelete(id, item.id)}
      />
    );
  });
});

export function ListCheckItem(props: ListProps) {
  return (
    <Droppable droppableId={props.id} type="checklist">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <List {...props} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

import { Section } from "..";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionDelete, CheckItem, FormCheckItem, Progress, TitleTodo } from ".";
import { useMemo, useState } from "react";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { cn } from "@/utils";
import { TodoSectionProps } from "@/types/todo";

export function TodoSection({
  id,
  title,
  checklist,
  onChangeTitle,
  onDeleteTodo,
  onAddCheckItem,
  onChangeCheckItem,
  onChangeNameCheckItem,
  onDeleteCheckItem,
}: TodoSectionProps) {
  const [isEdit, setEdit] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [hideDone, setHideDone] = useState(false);

  const toggleEdit = () => setEdit(!isEdit);

  const totalDone = useMemo(() => {
    return checklist.reduce((prev, check) => {
      if (check.is_done) return prev + 1;
      return prev;
    }, 0);
  }, [checklist]);

  const percentDone = Math.floor((totalDone / checklist.length) * 100);

  const generateCheckLabel = () => {
    if (!hideDone) return "Hide checked items";
    return `Show checked items ${totalDone}`;
  };

  return (
    <Section className="!pb-4">
      <div className="flex justify-between items-center">
        <div
          className={cn("flex gap-3 items-center", {
            "w-full": isEdit,
          })}
        >
          <FontAwesomeIcon icon={faSquareCheck} />
          <TitleTodo
            isEdit={isEdit}
            toggleEdit={toggleEdit}
            onSave={(newTitle) => onChangeTitle(id, newTitle)}
          >
            {title}
          </TitleTodo>
        </div>
        {!isEdit && (
          <div className="flex gap-2">
            {totalDone > 0 && (
              <Button onClick={() => setHideDone(!hideDone)}>
                {generateCheckLabel()}
              </Button>
            )}
            <ActionDelete
              titleTodo={title}
              onDeleteTodo={() => onDeleteTodo(id)}
            />
          </div>
        )}
      </div>

      <Progress hideDone={hideDone} percentDone={percentDone} />

      <div className="mt-1">
        {checklist.map((item) => {
          if (hideDone && item.is_done) return null;

          return (
            <CheckItem
              key={item.id}
              name={item.name}
              isDone={item.is_done}
              onCheck={() => onChangeCheckItem(id, item.id)}
              onChange={(name) =>
                onChangeNameCheckItem({ todoId: id, checkId: item.id, name })
              }
              onDelete={() => onDeleteCheckItem(id, item.id)}
            />
          );
        })}

        {isAdd ? (
          <FormCheckItem
            onSubmit={(name) => onAddCheckItem(id, name)}
            onCancel={() => setAdd(false)}
          />
        ) : (
          <Button onClick={() => setAdd(true)} className="mt-2">
            Add an item
          </Button>
        )}
      </div>
    </Section>
  );
}

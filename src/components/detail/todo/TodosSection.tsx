import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Section } from "..";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "@/types/task";
import { ActionDelete } from ".";
import { Progress } from "@/components/ui/progress";
import { KeyboardEvent, useMemo, useState } from "react";
import cx from "clsx";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { useClickOutside } from "@mantine/hooks";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { Textarea } from "@/components/ui/textarea";

interface TodosSectionProps extends Todo {
  onChangeTitle: (id: string, title: string) => void;
  onDeleteTodo: (id: string) => void;
  onAddCheckItem: (toodId: string, name: string) => void;
  onChangeCheckItem: (toodId: string, checkId: string) => void;
  onDeleteCheckItem: (toodId: string, checkId: string) => void;
}

type CheckItemProps = {
  name: string;
  isDone: boolean;
  onChange: () => void;
  onDelete: () => void;
};

const CheckItem = ({ name, isDone, onChange, onDelete }: CheckItemProps) => {
  return (
    <div className="group flex items-center gap-1">
      <Checkbox checked={isDone} onCheckedChange={onChange} />
      <button className="px-2 py-[6px] w-full rounded-md hover:bg-slate-200 transition flex items-center justify-between">
        <h3
          className={cx("font-normal text-sm text-left text-slate-800", {
            "line-through": isDone,
          })}
        >
          {name}
        </h3>
        <Button
          onClick={onDelete}
          className="!px-2 !py-0 h-6 group-hover:visible invisible"
          variant="solid"
          color="danger"
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </button>
    </div>
  );
};

type TitleTodoProps = {
  children: string;
  isEdit: boolean;
  toggleEdit: () => void;
  onSave: (title: string) => void;
};

const TitleTodo = ({
  children,
  isEdit,
  toggleEdit,
  onSave,
}: TitleTodoProps) => {
  const [title, setTitle] = useState(children);

  const ref = useClickOutside(() => {
    onSave(title);
    toggleEdit();
  });

  if (!isEdit) {
    return (
      <h1
        onClick={toggleEdit}
        className="text-base font-semibold cursor-pointer"
      >
        {children}
      </h1>
    );
  }

  return (
    <Input
      ref={ref}
      autoFocus
      className="relative -left-2 text-base font-semibold pl-2 w-full"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export function TodosSection({
  id,
  title,
  checklist,
  onChangeTitle,
  onDeleteTodo,
  onAddCheckItem,
  onChangeCheckItem,
  onDeleteCheckItem,
}: TodosSectionProps) {
  const [isEdit, setEdit] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [nameCheckItem, setNameCheckItem] = useState("");
  const [hideDone, setHideDone] = useState(false);

  const toggleEdit = () => setEdit(!isEdit);

  const totalDone = useMemo(() => {
    return checklist.reduce((prev, check) => {
      if (check.is_done) return prev + 1;
      return prev;
    }, 0);
  }, [checklist]);

  const handleAddCheckItem = () => {
    onAddCheckItem(id, nameCheckItem);
    setNameCheckItem("");
  };

  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleAddCheckItem();
    }
  };

  const ref = useClickOutside(() => {
    setAdd(false);
  });

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
      <div className="mt-2 grid grid-cols-[18px_1fr] items-center gap-2">
        <h4 className="text-slate-800 font-normal text-[9px]">
          {percentDone}%
        </h4>
        <Progress value={percentDone} />
      </div>
      {hideDone && percentDone === 100 && (
        <div className="ml-[26px] mt-1 mb-3">
          <h4 className="text-xs font-normal">
            Everything in this checklist is complete!
          </h4>
        </div>
      )}
      <div className="mt-1">
        {checklist.map((item) => {
          if (hideDone && item.is_done) return null;

          return (
            <CheckItem
              key={item.id}
              name={item.name}
              isDone={item.is_done}
              onChange={() => onChangeCheckItem(id, item.id)}
              onDelete={() => onDeleteCheckItem(id, item.id)}
            />
          );
        })}

        {isAdd ? (
          <form onSubmit={handleAddCheckItem} className="mt-1 ml-7 space-y-2">
            <Textarea
              ref={ref}
              autoFocus
              className="!min-h-[20px] p-2 rounded-sm text-sm"
              placeholder="Add an item"
              value={nameCheckItem}
              onChange={(e) => setNameCheckItem(e.currentTarget.value)}
              onKeyDown={handleEnter}
            />
            <div className="flex gap-2">
              <Button type="submit" variant="solid">
                Add
              </Button>
              <Button onClick={() => setAdd(false)} variant="subtle">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button onClick={() => setAdd(true)} className="mt-2">
            Add an item
          </Button>
        )}
      </div>
    </Section>
  );
}

import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Section, TitleSection } from "..";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "@/types/task";
import { ActionDelete } from ".";
import { Progress } from "@/components/ui/progress";
import { useMemo, useState } from "react";
import cx from "clsx";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

interface TodosSectionProps extends Todo {
  onDeleteTodo: (id: string) => void;
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

export function TodosSection({
  id,
  title,
  checklist,
  onDeleteTodo,
  onChangeCheckItem,
  onDeleteCheckItem,
}: TodosSectionProps) {
  const [hideDone, setHideDone] = useState(false);

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
      <TitleSection
        icon={faSquareCheck}
        label={title}
        action={
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
        }
      />
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
        <Button className="mt-2">Add an item</Button>
      </div>
    </Section>
  );
}

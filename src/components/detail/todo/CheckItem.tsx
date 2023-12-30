import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckItemProps } from "@/types/todo";
import { cn } from "@/utils";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CheckItem = ({
  name,
  isDone,
  onChange,
  onDelete,
}: CheckItemProps) => {
  return (
    <div className="group flex items-center gap-1">
      <Checkbox checked={isDone} onCheckedChange={onChange} />
      <button className="px-2 py-[6px] w-full rounded-md hover:bg-slate-200 transition flex items-center justify-between">
        <h3
          className={cn("font-normal text-sm text-left text-slate-800", {
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import useNewTask from "@/hooks/useNewTask";

export function NewTask() {
  const { ref, isNewTask, title, toggleNewTask, setTitle, onNewTask } =
    useNewTask();

  return (
    <div ref={ref}>
      {isNewTask ? (
        <div className="my-2 space-y-2">
          <Textarea
            className="rounded-lg h-20 resize-none"
            placeholder="Enter a title for this card..."
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <div className="flex items-center gap-1">
            <Button onClick={onNewTask} variant="solid" className="!rounded">
              Add card
            </Button>
            <Button onClick={toggleNewTask} variant="subtle" className="!px-2">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="subtle"
          onClick={toggleNewTask}
          className="px-3 !py-1 my-2 !rounded-lg flex items-center gap-3 w-full"
        >
          <FontAwesomeIcon icon={faPlus} />
          <h3 className="text-base font-semibold text-slate-800">Add a card</h3>
        </Button>
      )}
    </div>
  );
}

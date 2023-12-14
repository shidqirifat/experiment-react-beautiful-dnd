import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DescriptionSection, LinkSection, HeaderSection } from ".";
import { Shadow } from "../ui/modal";
import useTask from "../../hooks/useTask";

export function TaskModal() {
  const { task, onClose } = useTask();
  if (!task) return null;

  return (
    <Shadow onClick={onClose}>
      <div className="absolute z-10 top-12 left-[50%] translate-x-[-50%] w-[90vw] bg-slate-50 rounded-lg p-4 pr-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition hover:bg-slate-200 py-1 px-2 rounded"
        >
          <FontAwesomeIcon icon={faXmark} color="gray" size="lg" />
        </button>
        <HeaderSection
          title={task.title}
          labels={task.labels}
          dueDate={task.due_date}
        />
        <DescriptionSection>{task.description as string}</DescriptionSection>
        <LinkSection links={task.links} />
      </div>
    </Shadow>
  );
}

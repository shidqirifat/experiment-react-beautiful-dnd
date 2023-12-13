import { useLocalStorage } from "@mantine/hooks";
import { TASKS } from "../../datas/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DescriptionSection, LinkSection, HeaderSection } from ".";

export function Modal() {
  const [tasks] = useLocalStorage({
    key: "data",
    defaultValue: TASKS,
  });

  const task = tasks[0];

  return (
    <div className="fixed inset-0 bg-black/30">
      <div className="absolute top-12 left-[50%] translate-x-[-50%] w-[90vw] bg-slate-50 rounded-lg p-4 pr-6">
        <button className="absolute top-4 right-4 transition hover:bg-slate-200 py-1 px-2 rounded">
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
    </div>
  );
}

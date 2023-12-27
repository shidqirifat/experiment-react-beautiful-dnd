import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faBoxesPacking,
  faTableList,
  faTags,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  DescriptionSection,
  LinkSection,
  HeaderSection,
  SubdetailSection,
  Subtitle,
} from ".";
import { Shadow } from "../ui/modal";
import useTask from "@/hooks/useTask";
import { ReactNode } from "react";
import { ActionLink } from "./link";
import { ButtonAction } from "../ui/button";
import { ActionDelete } from "./delete";
import useArchiveTasks from "@/hooks/useArchiveTasks";
import cx from "clsx";
import { ActionDate } from "./date";

type LayoutProps = { children: ReactNode };
type ModalProps = {
  children: ReactNode;
  archived: boolean;
  onClose: () => void;
};

const ArchiveBackground = () => {
  return (
    <div className="flex items-center gap-2 bg-[url('/pattern.png')] bg-cover px-4 py-[26px] rounded-t-lg">
      <FontAwesomeIcon icon={faBoxesPacking} size="sm" />
      <h3 className="text-slate-900 text-base font-medium">
        This card is archived.
      </h3>
    </div>
  );
};

const Modal = ({ children, archived, onClose }: ModalProps) => {
  return (
    <Shadow onClick={onClose}>
      <div className="absolute z-10 top-12 left-[50%] translate-x-[-50%] w-[90vw] bg-slate-50 rounded-lg">
        {archived && <ArchiveBackground />}
        <button
          onClick={onClose}
          className="absolute top-5 right-4 transition hover:bg-slate-200 py-1 px-2 rounded"
        >
          <FontAwesomeIcon icon={faXmark} color="gray" size="lg" />
        </button>
        <div className={cx("p-4", { "pt-2": archived })}>{children}</div>
      </div>
    </Shadow>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return <div className="grid grid-cols-[1fr_170px] gap-4">{children}</div>;
};

export function TaskModal() {
  const {
    task,
    onClose,
    onToggleComplete,
    onSaveTitle,
    onSaveDescription,
    onAddLink,
    onEditLink,
    onRemoveLink,
    onSaveDueDate,
    onRemoveDueDate,
  } = useTask();
  const { toggleArchive } = useArchiveTasks();

  if (!task) return null;

  return (
    <>
      <Modal archived={task.archived} onClose={onClose}>
        <HeaderSection title={task.title} onSave={onSaveTitle} />
        <Layout>
          <div>
            <SubdetailSection
              labels={task.labels}
              dueDate={task.due_date}
              onToggleComplete={onToggleComplete}
            />
            <DescriptionSection onSave={onSaveDescription}>
              {task.description as string}
            </DescriptionSection>
            <LinkSection
              links={task.links}
              onAddLink={onAddLink}
              onEditLink={onEditLink}
              onRemoveLink={onRemoveLink}
            />
          </div>
          <div>
            <div>
              <Subtitle>Add to card</Subtitle>
              <div className="space-y-2 mt-1">
                <ButtonAction icon={faTags}>Labels</ButtonAction>
                <ButtonAction icon={faTableList}>Todos</ButtonAction>
                <ActionDate
                  dates={task.due_date}
                  onSave={onSaveDueDate}
                  onRemove={onRemoveDueDate}
                />
                <ActionLink type="add" onInsert={onAddLink} withIcon />
              </div>
            </div>

            <div className="mt-8">
              <Subtitle>Actions</Subtitle>
              <div className="space-y-2 mt-1">
                {task.archived ? (
                  <>
                    <ButtonAction
                      onClick={() => toggleArchive(task.id)}
                      icon={faArrowRotateRight}
                      flipIcon="horizontal"
                    >
                      Send to board
                    </ButtonAction>
                    <ActionDelete id={task.id} />
                  </>
                ) : (
                  <ButtonAction
                    onClick={() => toggleArchive(task.id)}
                    icon={faBoxesPacking}
                  >
                    Archive
                  </ButtonAction>
                )}
              </div>
            </div>
          </div>
        </Layout>
      </Modal>
    </>
  );
}

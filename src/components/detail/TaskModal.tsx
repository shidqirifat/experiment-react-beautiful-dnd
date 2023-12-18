import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faTableList,
  faTags,
  faTrash,
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
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { LinkModal } from "./link";
import { ButtonAction } from "../ui/button";

type LayoutProps = { children: ReactNode };
type ModalProps = { children: ReactNode; onClose: () => void };

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <Shadow onClick={onClose}>
      <div className="absolute z-10 top-12 left-[50%] translate-x-[-50%] w-[90vw] bg-slate-50 rounded-lg p-4 pt-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-4 transition hover:bg-slate-200 py-1 px-2 rounded"
        >
          <FontAwesomeIcon icon={faXmark} color="gray" size="lg" />
        </button>
        {children}
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
  } = useTask();

  if (!task) return null;

  return (
    <>
      <Modal onClose={onClose}>
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
            <LinkSection links={task.links} onEditLink={onEditLink} />
          </div>
          <div>
            <div>
              <Subtitle>Add to card</Subtitle>
              <div className="space-y-2 mt-1">
                <ButtonAction icon={faTags}>Labels</ButtonAction>
                <ButtonAction icon={faTableList}>Todos</ButtonAction>
                <ButtonAction icon={faClock}>Date</ButtonAction>
                <LinkModal type="add" onInsert={onAddLink} />
              </div>
            </div>

            <div className="mt-8">
              <Subtitle>Actions</Subtitle>
              <div className="space-y-2 mt-1">
                <ButtonAction icon={faBoxesPacking}>Archive</ButtonAction>
                <ButtonAction icon={faTrash}>Delete</ButtonAction>
              </div>
            </div>
          </div>
        </Layout>
      </Modal>
    </>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faTableList,
  faTags,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  DescriptionSection,
  LinkSection,
  HeaderSection,
  SubdetailSection,
} from ".";
import { Shadow } from "../ui/modal";
import useTask from "@/hooks/useTask";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";

type LayoutProps = { children: ReactNode };
type ModalProps = { children: ReactNode; onClose: () => void };
type ButtonActionProps = {
  children: string;
  icon: IconProp;
  sizeIcon?: SizeProp;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <Shadow onClick={onClose}>
      <div className="absolute z-10 top-12 left-[50%] translate-x-[-50%] w-[90vw] bg-slate-50 rounded-lg p-4 pr-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition hover:bg-slate-200 py-1 px-2 rounded"
        >
          <FontAwesomeIcon icon={faXmark} color="gray" size="lg" />
        </button>
        {children}
      </div>
    </Shadow>
  );
};

const ButtonAction = ({ children, icon, sizeIcon }: ButtonActionProps) => {
  return (
    <Button leftIcon={icon} sizeIcon={sizeIcon} className="w-full text-left">
      {children}
    </Button>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return <div className="grid grid-cols-[1fr_170px] gap-4">{children}</div>;
};

export function TaskModal() {
  const { task, onClose, onToggleComplete, onSave } = useTask();
  if (!task) return null;

  return (
    <Modal onClose={onClose}>
      <HeaderSection title={task.title} />
      <Layout>
        <div>
          <SubdetailSection
            labels={task.labels}
            dueDate={task.due_date}
            onToggleComplete={onToggleComplete}
          />
          <DescriptionSection onSave={onSave}>
            {task.description as string}
          </DescriptionSection>
          <LinkSection links={task.links} />
        </div>
        <div className="space-y-2">
          <ButtonAction icon={faTags}>Labels</ButtonAction>
          <ButtonAction icon={faTableList}>Todos</ButtonAction>
          <ButtonAction icon={faClock}>Date</ButtonAction>
          <ButtonAction icon={faLink} sizeIcon="sm">
            Links
          </ButtonAction>
        </div>
      </Layout>
    </Modal>
  );
}

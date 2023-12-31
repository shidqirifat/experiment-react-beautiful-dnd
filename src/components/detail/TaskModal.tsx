import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faBoxesPacking,
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
import { ActionTodo, TodosSection } from "./todo";
import { ActionLabel } from "./label";

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
      <div className="relative z-10 bg-slate-50 md:rounded-lg min-h-screen md:min-h-max">
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_170px] gap-4">
      {children}
    </div>
  );
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
    onAddTodo,
    onChangeTitleTodo,
    onDeleteTodo,
    onReorderTodo,
    onAddCheckItem,
    onChangeCheckItem,
    onChangeNameCheckItem,
    onDeleteCheckItem,
    onSelectLabel,
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
              onSaveDueDate={onSaveDueDate}
              onRemoveDueDate={onRemoveDueDate}
              onSelectLabel={onSelectLabel}
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
            <TodosSection
              todos={task.todos}
              onReorder={onReorderTodo}
              onChangeTitle={onChangeTitleTodo}
              onDeleteTodo={onDeleteTodo}
              onAddCheckItem={onAddCheckItem}
              onChangeCheckItem={onChangeCheckItem}
              onChangeNameCheckItem={onChangeNameCheckItem}
              onDeleteCheckItem={onDeleteCheckItem}
            />
          </div>
          <div>
            <div>
              <Subtitle>Add to card</Subtitle>
              <div className="space-y-2 sm:space-y-0 md:space-y-2 mt-1 sm:grid sm:grid-cols-2 sm:gap-2 md:block">
                <ActionLabel
                  labelsActive={task.labels}
                  onSelect={onSelectLabel}
                >
                  <ButtonAction icon={faTags}>Labels</ButtonAction>
                </ActionLabel>
                <ActionTodo onAdd={onAddTodo} />
                <ActionDate
                  withIcon
                  dueDate={task.due_date}
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

import { LabelsWrapperProps } from "@/types/label";
import { ActionDelete, FormLabel, FormSelectLabel } from ".";
import { useState } from "react";
import { Label } from "@/types/task";
import { useLabels } from "@/hooks/useLabels";

type Mode = "select" | "create" | "edit" | "delete";

export function LabelsWrapper({
  onClose,
  onSelect,
  labelsActive,
}: LabelsWrapperProps) {
  const [mode, setMode] = useState<Mode>("select");
  const [labelSelected, setLabelSelected] = useState<Label | null>(null);
  const { onDelete } = useLabels();

  const handleClickButtonCreate = () => {
    setMode("create");
  };

  const handleClickButtonEdit = (label: Label) => {
    setMode("edit");
    setLabelSelected(label);
  };

  const handleBack = () => {
    setMode("select");
    setLabelSelected(null);
  };

  const handleClose = () => {
    if (onClose) onClose();
    setTimeout(() => {
      setMode("select");
    }, 200);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setTimeout(() => {
      handleBack();
    }, 100);
  };

  return (
    <>
      {(mode === "edit" || mode === "create") && (
        <FormLabel
          withHeader={Boolean(labelsActive)}
          initialForm={labelSelected}
          type={mode}
          onBack={handleBack}
          onClose={handleClose}
          onDelete={() => setMode("delete")}
        />
      )}
      {mode === "select" && (
        <FormSelectLabel
          withHeader={Boolean(labelsActive)}
          onClose={handleClose}
          onClickButtonCreate={handleClickButtonCreate}
          onClickButtonEdit={handleClickButtonEdit}
          onSelectLabel={onSelect}
          labelsActive={labelsActive}
        />
      )}
      {mode === "delete" && labelSelected && (
        <ActionDelete
          onBack={() => setMode("edit")}
          onClose={handleClose}
          onDelete={() => handleDelete(labelSelected.id)}
        />
      )}
    </>
  );
}

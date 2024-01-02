import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PopoverHeader } from "@/components/ui/popover";
import { useLabels } from "@/hooks/useLabels";
import { ColorSelect } from ".";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { FormSelectLabelProps } from "@/types/label";

export function FormSelectLabel({
  onClose,
  onClickButtonEdit,
  onClickButtonCreate,
  onSelectLabel,
  labelsActive,
}: FormSelectLabelProps) {
  const [keyword, setKeyword] = useState("");
  const { labels } = useLabels();

  const labelsActiveIds = useMemo(
    () => labelsActive?.map((label) => label.id),
    [labelsActive]
  );

  const labelsFiltered = useMemo(() => {
    return labels.filter((label) =>
      label.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [labels, keyword]);

  return (
    <div>
      <PopoverHeader onClose={onClose}>Labels</PopoverHeader>
      <div className="space-y-3 mt-3">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search labels..."
          className="py-1 px-2"
          autoFocus
        />
        <h4 className="text-slate-800 font-normal text-xs">Labels</h4>
        <div className="space-y-1">
          {labelsFiltered.map((label) => (
            <div key={label.id} className="flex items-center gap-1">
              <button
                onClick={() => onSelectLabel(label)}
                className="flex items-center w-full gap-3"
              >
                <Checkbox checked={labelsActiveIds?.includes(label.id)} />
                <ColorSelect color={label.color}>
                  {label.name || ""}
                </ColorSelect>
              </button>
              <Button
                onClick={() => onClickButtonEdit(label)}
                variant="subtle"
                className="!p-0 h-7 w-10"
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={onClickButtonCreate} className="w-full">
          Create a new label
        </Button>
      </div>
    </div>
  );
}

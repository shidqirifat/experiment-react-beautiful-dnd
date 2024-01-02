import { COLORS } from "@/datas/color";
import { INITIAL_LABELS } from "@/datas/label";
import { Color, handleCreateArgs, handleEditArgs } from "@/types/label";
import { Label } from "@/types/task";
import { useLocalStorage } from "@mantine/hooks";
import { useCallback, useMemo } from "react";

export function useLabels() {
  const [labels, setLabels] = useLocalStorage<Array<Label>>({
    key: "labels",
    defaultValue: INITIAL_LABELS,
  });

  const handleCreate = useCallback(({ name, color }: handleCreateArgs) => {
    const newLabel = {
      id: (+new Date()).toString(),
      name,
      color,
    };

    setLabels((prev) => [...prev, newLabel]);
  }, []);

  const handleEdit = useCallback((args: handleEditArgs) => {
    setLabels((prev) =>
      prev.map((label) => {
        if (label.id === args.id) return args;

        return label;
      })
    );
  }, []);

  const colorNewLabel = useMemo<Color>(() => {
    const colorsExist = labels?.map((label) => label.color);
    const uniqColorsExist = [...new Set(colorsExist)];

    if (uniqColorsExist.length === COLORS.length) return "green";

    for (const color of COLORS) {
      if (!uniqColorsExist.includes(color)) return color;
    }

    return "green";
  }, [labels]);

  return {
    labels,
    colorNewLabel,
    onCreate: handleCreate,
    onEdit: handleEdit,
  };
}

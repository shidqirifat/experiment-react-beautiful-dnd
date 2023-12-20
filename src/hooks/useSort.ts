import { Sort, SortBy, SortType } from "@/types/sort";
import { useLocalStorage } from "@mantine/hooks";

const initialSort: Sort = { sortBy: "created-at", sortType: "asc" };

export default function useSort() {
  const [sort, setSort] = useLocalStorage<Sort>({
    key: "sort",
    defaultValue: initialSort,
  });

  const handleSort = (sortBy: SortBy, sortType: SortType) => {
    setSort({ sortBy, sortType });
  };

  return { sort, onSort: handleSort };
}

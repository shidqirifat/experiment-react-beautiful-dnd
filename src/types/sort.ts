type SortBy = "created-at" | "title";
type SortType = "asc" | "desc";

type Sort = {
  sortBy: "created-at" | "title";
  sortType: SortType;
};

export type { Sort, SortBy, SortType };

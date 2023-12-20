const sortByTitleAsc = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const sortByTitleDesc = (a: string, b: string) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

const sortByCreatedAtAsc = (a: string, b: string) => {
  return Number(a) - Number(b);
};

const sortByCreatedAtDesc = (a: string, b: string) => {
  return Number(b) - Number(a);
};

export {
  sortByTitleAsc,
  sortByTitleDesc,
  sortByCreatedAtAsc,
  sortByCreatedAtDesc,
};

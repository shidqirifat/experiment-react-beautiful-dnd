import { create } from "zustand";

interface State {
  keyword: string;
  setKeyword: (value: string) => void;
}

export const useSearch = create<State>((set) => ({
  keyword: "",
  setKeyword: (value: string) => set(() => ({ keyword: value })),
}));

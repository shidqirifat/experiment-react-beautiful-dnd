import { Color } from "./label";

type Label = {
  id: string;
  name: string;
  color: Color;
};

type Link = {
  id: string;
  name: string;
  url: string;
  updated_at: string;
};

type DueDate = {
  start_date: string;
  end_date: string;
  is_done: boolean;
};

type CheckItem = {
  id: string;
  name: string;
  is_done: boolean;
};

type Todo = {
  id: string;
  title: string;
  checklist: Array<CheckItem>;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  labels?: Array<Label>;
  todos?: Array<Todo>;
  links?: Array<Link>;
  due_date?: DueDate;
  archived: boolean;
};

export type { Label, Link, DueDate, Todo, Task, CheckItem };

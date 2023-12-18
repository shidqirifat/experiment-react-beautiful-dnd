type Label = {
  id: string;
  name: string;
  color: string;
};

type Link = {
  id: string;
  name: string;
  url: string;
  updated_at: string;
};

type DueDate = {
  date: string;
  is_done: boolean;
};

type Todo = {
  id: string;
  name: string;
  is_done: boolean;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  labels?: Array<Label>;
  todos?: Array<Todo>;
  links?: Array<Link>;
  due_date?: DueDate;
};

export type { Label, Link, DueDate, Todo, Task };
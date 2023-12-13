type Category = {
  id: string;
  name: string;
  color: string;
};

type Link = {
  id: string;
  url: string;
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
  categories?: Array<Category>;
  todos?: Array<Todo>;
  links?: Array<Link>;
  due_date?: DueDate;
};

export type { Category, Link, DueDate, Todo, Task };

import { Task } from "../types/task";
import { COLORS } from "./color";

const TASKS: Array<Task> = [
  {
    id: "1",
    title: "Task 1",
    todos: [
      {
        id: "1",
        name: "Todo 1",
        is_done: true,
      },
      {
        id: "2",
        name: "Todo 2",
        is_done: false,
      },
      {
        id: "3",
        name: "Todo 3",
        is_done: false,
      },
      {
        id: "4",
        name: "Todo 4",
        is_done: false,
      },
    ],
    due_date: { date: "2023-12-04T05:03:03Z", is_done: true },
  },
  {
    id: "2",
    title: "Task 2",
    labels: [
      {
        id: "2",
        name: "Label 2",
        color: COLORS.pink,
      },
      {
        id: "3",
        name: "Label 3",
        color: COLORS.yellow,
      },
      {
        id: "4",
        name: "Label 4",
        color: COLORS.blue,
      },
    ],
    todos: [
      {
        id: "1",
        name: "Todo 1",
        is_done: false,
      },
      {
        id: "2",
        name: "Todo 2",
        is_done: false,
      },
    ],
    description:
      "Since Tailwind is a PostCSS plugin, there’s nothing stopping you from using it with Sass, Less, Stylus, or other preprocessors, just like you can with other PostCSS plugins like Autoprefixer.",
    links: [
      {
        id: "1",
        name: "Link 1",
        url: "https://tailwindcss.com/docs/guides/vite",
        updated_at: "2023-12-03T18:03:03Z",
      },
      {
        id: "2",
        name: "Link 2",
        url: "https://tailwindcss.com/docs/guides/vite",
        updated_at: "2023-12-13T07:03:03Z",
      },
    ],
    due_date: { date: "2023-12-19T05:03:03Z", is_done: true },
  },
  {
    id: "3",
    title: "Task 3",
    labels: [
      {
        id: "3",
        name: "Label 3",
        color: COLORS.green,
      },
    ],
    description:
      "Since Tailwind is a PostCSS plugin, there’s nothing stopping you from using it with Sass, Less, Stylus, or other preprocessors, just like you can with other PostCSS plugins like Autoprefixer.",
    todos: [
      {
        id: "1",
        name: "Todo 1",
        is_done: true,
      },
      {
        id: "2",
        name: "Todo 2",
        is_done: true,
      },
      {
        id: "3",
        name: "Todo 3",
        is_done: false,
      },
    ],
    due_date: { date: "2023-12-07T05:03:03Z", is_done: false },
  },
  {
    id: "4",
    title: "Task 4",
    labels: [
      {
        id: "4",
        name: "Label 4",
        color: COLORS.yellow,
      },
    ],
    description:
      "Since Tailwind is a PostCSS plugin, there’s nothing stopping you from using it with Sass, Less, Stylus, or other preprocessors, just like you can with other PostCSS plugins like Autoprefixer.",
    links: [
      {
        id: "1",
        name: "Link 1",
        url: "https://tailwindcss.com/docs/guides/vite",
        updated_at: "2023-12-13T05:03:03Z",
      },
    ],
    due_date: { date: "2023-12-13T05:03:03Z", is_done: false },
  },
];

export { TASKS };

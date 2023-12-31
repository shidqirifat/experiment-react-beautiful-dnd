import { Task } from "@/types/task";
import { COLORS } from "./color";

const TASKS: Array<Task> = [
  {
    id: "1703070749456",
    title: "Task Pertama",
    todos: [
      {
        id: "progress-1",
        title: "Progress 1",
        checklist: [
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
            is_done: true,
          },
          {
            id: "4",
            name: "Todo 4",
            is_done: false,
          },
        ],
      },
      {
        id: "progress-2",
        title: "Progress 2",
        checklist: [
          {
            id: "5",
            name: "Todo 5",
            is_done: true,
          },
          {
            id: "6",
            name: "Todo 6",
            is_done: false,
          },
          {
            id: "7",
            name: "Todo 7",
            is_done: true,
          },
          {
            id: "8",
            name: "Todo 8",
            is_done: true,
          },
        ],
      },
    ],
    due_date: {
      start_date: "2023-12-02T05:03:03Z",
      end_date: "2023-12-04T05:03:03Z",
      is_done: true,
    },
    archived: false,
  },
  {
    id: "1703070751237",
    title: "Task Kedua",
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
        id: "3",
        title: "Checklist",
        checklist: [
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
        ],
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
    due_date: {
      start_date: "2023-12-14T05:03:03Z",
      end_date: "2023-12-19T05:03:03Z",
      is_done: true,
    },
    archived: false,
  },
  {
    id: "1703070766592",
    title: "Task Ketiga",
    labels: [
      {
        id: "3",
        name: "Label 3",
        color: COLORS.green,
      },
    ],
    description:
      "Since Tailwind is a PostCSS plugin, there’s nothing stopping you from using it with Sass, Less, Stylus, or other preprocessors, just like you can with other PostCSS plugins like Autoprefixer.",
    due_date: {
      start_date: "2023-12-03T05:03:03Z",
      end_date: "2023-12-07T05:03:03Z",
      is_done: false,
    },
    archived: false,
  },
  {
    id: "1703070767212",
    title: "Task Keempat",
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
    due_date: {
      start_date: "2023-12-08T05:03:03Z",
      end_date: "2023-12-13T05:03:03Z",
      is_done: false,
    },
    archived: false,
  },
];

export { TASKS };

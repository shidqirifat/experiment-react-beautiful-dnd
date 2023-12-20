import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route, BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":taskId" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </MantineProvider>
);

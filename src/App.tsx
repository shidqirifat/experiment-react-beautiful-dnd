import { TaskModal } from "./components/detail";
import { ListCardTask } from "./components/task";
import { Layout } from "./layouts";

function App() {
  return (
    <Layout>
      <TaskModal />
      <ListCardTask />
    </Layout>
  );
}

export default App;

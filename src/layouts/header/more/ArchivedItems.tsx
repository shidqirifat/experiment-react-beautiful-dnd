import useArchiveTasks from "@/hooks/useArchiveTasks";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@mantine/core";
import cx from "clsx";
import { Item } from ".";

type SearchArchiveProps = {
  keyword: string;
  setKeyword: (value: string) => void;
};

const SearchArchive = ({ keyword, setKeyword }: SearchArchiveProps) => {
  return (
    <Input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="Search archive item"
      leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
    />
  );
};

type EmptyProps = { search?: boolean };

const Empty = ({ search }: EmptyProps) => {
  return (
    <div
      className={cx("grid place-content-center h-96", {
        "space-y-2": search,
        "space-y-6": !search,
      })}
    >
      <img
        src={search ? "/not-found.png" : "/empty.png"}
        alt={search ? "Not Found" : "Empty"}
        width={search ? 280 : 250}
      />
      <h3 className="text-slate-600 text-lg font-medium text-center">
        {search ? "No result" : "No archive item"}
      </h3>
    </div>
  );
};

export function ArchivedItems() {
  const { initialArchivedTasks, archivedTasks, keyword, setKeyword } =
    useArchiveTasks();

  if (initialArchivedTasks.length === 0) return <Empty />;
  if (keyword && archivedTasks.length === 0) {
    return (
      <div>
        <SearchArchive keyword={keyword} setKeyword={setKeyword} />
        <Empty search />
      </div>
    );
  }

  return (
    <div>
      <SearchArchive keyword={keyword} setKeyword={setKeyword} />
      <div className="space-y-5 mt-4">
        {archivedTasks.map((task) => (
          <Item key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

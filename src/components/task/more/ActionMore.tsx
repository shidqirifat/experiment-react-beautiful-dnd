"use client";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePopover from "@/hooks/usePopover";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useSort from "@/hooks/useSort";
import { SortBy, SortType } from "@/types/sort";
import useArchiveTasks from "@/hooks/useArchiveTasks";

type ItemProps = { children: string; onClick?: () => void };

const Item = ({ children, onClick }: ItemProps) => {
  return (
    <Button
      onClick={onClick}
      variant="subtle"
      className="!py-[6px] px-4 w-full text-left !font-normal"
    >
      {children}
    </Button>
  );
};

type Actions = "sort-by";

const generateTitle = (action: Actions | null): string => {
  switch (action) {
    case "sort-by":
      return "Sort list";
    case null:
      return "List actions";
    default:
      return "";
  }
};

const Border = () => {
  return <div className="border-b border-slate-300 mx-4 my-2" />;
};

export function ActionMore() {
  const { open, toggleOpen, onClose } = usePopover();
  const [activeAction, setActiveAction] = useState<Actions | null>(null);
  const { moveAllToArchive } = useArchiveTasks();
  const { onSort } = useSort();

  const handleSort = (sortBy: SortBy, sortType: SortType) => {
    onSort(sortBy, sortType);
    toggleOpen(false);
    setActiveAction(null);
  };

  const handleMoveAllToArchive = () => {
    moveAllToArchive();
    toggleOpen(false);
    setActiveAction(null);
  };

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger>
        <Button variant="subtle" className="h-9 hover:!bg-slate-300">
          <FontAwesomeIcon icon={faEllipsis} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="px-0 w-64">
        <PopoverHeader
          onBack={activeAction ? () => setActiveAction(null) : undefined}
          onClose={onClose}
          size="lg"
        >
          {generateTitle(activeAction)}
        </PopoverHeader>
        <div className="mt-4">
          {activeAction ? (
            <>
              <Item onClick={() => handleSort("created-at", "desc")}>
                Date created (newest first)
              </Item>
              <Item onClick={() => handleSort("created-at", "asc")}>
                Date created (oldest first)
              </Item>
              <Item onClick={() => handleSort("title", "asc")}>
                Card name (A - Z)
              </Item>
              <Item onClick={() => handleSort("title", "desc")}>
                Card name (Z - A)
              </Item>
            </>
          ) : (
            <>
              <Item onClick={() => setActiveAction("sort-by")}>Sort by...</Item>
              <Border />
              <Item onClick={handleMoveAllToArchive}>
                Archive all cards in this list
              </Item>
              <Item>Archive this list</Item>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

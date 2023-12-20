import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  faBoxArchive,
  faBoxesPacking,
  faChevronLeft,
  faEllipsis,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styleDefault } from "..";
import { useState } from "react";
import { ArchivedItems, MenuItem } from ".";

type Menus = "archive-list" | "archive-items" | "labels";
type ContentMenuProps = { menu: Menus };

const ContentMenu = ({ menu }: ContentMenuProps) => {
  switch (menu) {
    case "archive-items":
      return <ArchivedItems />;
    case "archive-list":
      return <h1>Arsip list</h1>;
    case "labels":
      return <h1>Labels</h1>;
    default:
      return null;
  }
};

const generateTitleMenu = (menu: Menus | null) => {
  switch (menu) {
    case "archive-items":
      return "Archive Items";
    case "archive-list":
      return "Archive List";
    case "labels":
      return "Labels";
    default:
      return "Menu";
  }
};

export function ActionMore() {
  const [menuActive, setMenuActive] = useState<Menus | null>(null);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="subtle" className="h-9 hover:!bg-slate-100/30">
          <FontAwesomeIcon icon={faEllipsis} {...styleDefault} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          {menuActive && (
            <Button
              onClick={() => setMenuActive(null)}
              variant="subtle"
              className="w-max absolute left-4 top-4"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          )}
          <SheetTitle>{generateTitleMenu(menuActive)}</SheetTitle>
        </SheetHeader>
        {menuActive ? (
          <ContentMenu menu={menuActive} />
        ) : (
          <div className="py-4 border-t border-slate-300 space-y-1">
            <MenuItem
              onClick={() => setMenuActive("archive-items")}
              icon={faBoxesPacking}
              label="Archived Items"
            />
            <MenuItem icon={faBoxArchive} label="Archived List" />
            <MenuItem icon={faTags} label="Labels" />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

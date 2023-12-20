import { Button } from "@/components/ui/button";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@mantine/core";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { CSSProperties } from "react";
import { Avatar, Logo } from ".";
import { ActionMore } from "./more";

type Style = { size: SizeProp; style: CSSProperties };

export const styleDefault: Style = {
  size: "xl",
  style: { color: "#fff" },
};

export function Header() {
  return (
    <div className="flex justify-between items-center px-4 py-3 backdrop-blur-sm bg-white/10 shadow-md">
      <Logo />

      <div className="flex items-center gap-1">
        <Input
          placeholder="Search task"
          leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        />
        <Button variant="subtle" className="h-9 hover:!bg-slate-100/30">
          <FontAwesomeIcon icon={faFilter} {...styleDefault} />
        </Button>
        <Avatar />
        <ActionMore />
      </div>
    </div>
  );
}

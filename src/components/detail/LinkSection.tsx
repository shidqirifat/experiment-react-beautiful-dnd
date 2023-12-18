import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { ContentSection, Section, TitleSection } from ".";
import { formatDate } from "@/utils/time";
import { LinkModal } from "./link";
import { LinkItemProps, LinkSectionProps } from "@/types/link";

const Dot = () => <>&#8226;</>;

const LinkItem = ({ link, onEditLink }: LinkItemProps) => {
  return (
    <a
      href={link.url}
      rel="noopener noreferrer"
      target="_blank"
      className="flex gap-3 hover:bg-slate-200 transition rounded-sm"
    >
      <div className="w-28 h-20 rounded-sm bg-slate-300/50 grid place-content-center">
        <FontAwesomeIcon icon={faLink} />
      </div>
      <div className="pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold">{link.name}</h3>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2xs" />
        </div>
        <div className="text-sm text-slate-600 flex gap-1 items-center">
          <h4>
            Updated {formatDate(link.updated_at, "MMM D")} at{" "}
            {formatDate(link.updated_at, "h:mm A")}
          </h4>
          <Dot />
          <button className="underline underline-offset-1">Remove</button>
          <Dot />
          <LinkModal type="edit" initialForm={link} onUpdate={onEditLink} />
        </div>
      </div>
    </a>
  );
};

export function LinkSection({ links, onEditLink }: LinkSectionProps) {
  if (!links) return null;

  return (
    <Section>
      <TitleSection
        icon={faLink}
        sizeIcon="sm"
        label="Attachments"
        action={{ label: "Add" }}
      />
      <ContentSection className="mt-3 space-y-2">
        {links.map((link) => (
          <LinkItem key={link.id} link={link} onEditLink={onEditLink} />
        ))}
      </ContentSection>
    </Section>
  );
}

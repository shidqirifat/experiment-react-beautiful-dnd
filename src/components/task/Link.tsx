import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LinkProps = { total: number | undefined };

export const Link = ({ total }: LinkProps) => {
  if (!total) return null;
  return (
    <div>
      <h4 className="text-gray-600 text-sm">
        <FontAwesomeIcon icon={faLink} /> {total}
      </h4>
    </div>
  );
};

import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styleDefault } from ".";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faChartSimple} {...styleDefault} />
      <h1 className="text-white text-xl font-bold">Organizer</h1>
    </div>
  );
}

import { faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Archived() {
  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faBoxesPacking} style={{ color: "#ababab" }} />
      <h3 className="text-sm font-normal text-slate-700">Archived</h3>
    </div>
  );
}

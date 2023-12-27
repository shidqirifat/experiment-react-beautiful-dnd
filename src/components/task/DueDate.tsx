import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DueDate } from "@/types/task";
import { formatDate, getDayToNow } from "@/utils/time";
import cx from "clsx";
import { faClock } from "@fortawesome/free-regular-svg-icons";

type DateProps = { dueDate: DueDate | undefined };

export const Date = ({ dueDate }: DateProps) => {
  if (!dueDate) return null;

  const { end_date: endDate, is_done } = dueDate;
  const dayToNow = getDayToNow(endDate);
  const isPast = dayToNow < 0;

  return (
    <button
      className={cx(
        "py-1 px-2 rounded w-max mt-1 flex items-center gap-[6px]",
        {
          "bg-yellow-400": !is_done && !isPast && dayToNow < 1,
          "bg-slate-200": !is_done && !isPast,
          "bg-red-400": !is_done && isPast,
          "bg-green-500": is_done,
        }
      )}
    >
      <FontAwesomeIcon icon={faClock} size="sm" />
      <h4 className="text-xs">{formatDate(endDate, "MMM D")}</h4>
    </button>
  );
};

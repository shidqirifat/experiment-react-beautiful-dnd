import { Progress as PercentProgress } from "@/components/ui/progress";
import { ProgressProps } from "@/types/todo";

export const Progress = ({ percentDone, hideDone }: ProgressProps) => {
  return (
    <>
      <div className="mt-2 grid grid-cols-[18px_1fr] items-center gap-2">
        <h4 className="text-slate-800 font-normal text-[9px]">
          {percentDone}%
        </h4>
        <PercentProgress value={percentDone} />
      </div>
      {hideDone && percentDone === 100 && (
        <div className="ml-[26px] mt-1 mb-3">
          <h4 className="text-xs font-normal">
            Everything in this checklist is complete!
          </h4>
        </div>
      )}
    </>
  );
};

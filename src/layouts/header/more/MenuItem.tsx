import { Button } from "@/components/ui/button";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ItemProps = {
  icon: IconProp;
  sizeIcon?: SizeProp;
  label: string;
  onClick?: () => void;
};

export const MenuItem = ({ icon, sizeIcon, label, onClick }: ItemProps) => {
  return (
    <Button
      onClick={onClick}
      variant="subtle"
      className="flex gap-3 items-center py-2 w-full !rounded-md"
    >
      <div className="w-5">
        <FontAwesomeIcon icon={icon} size={sizeIcon} />
      </div>
      <h3 className="text-base font-normal">{label}</h3>
    </Button>
  );
};

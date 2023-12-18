import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from ".";

type ButtonActionProps = {
  children: string;
  icon: IconProp;
  sizeIcon?: SizeProp;
};

export const ButtonAction = ({
  children,
  icon,
  sizeIcon,
}: ButtonActionProps) => {
  return (
    <Button leftIcon={icon} sizeIcon={sizeIcon} className="w-full text-left">
      {children}
    </Button>
  );
};

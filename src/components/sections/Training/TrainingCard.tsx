import type { Training } from "@/types";
import { CYAN } from "@/config/theme";
import TrainingCardMobile from "./TrainingCardMobile";
import TrainingCardDesktop from "./TrainingCardDesktop";

interface TrainingCardProps {
   item: Training;
   index: number;
   accentColor?: string;
   isMobile: boolean;
   onClick?: () => void;
}

const TrainingCard = ({
   item,
   index,
   accentColor = CYAN,
   isMobile,
   onClick,
}: TrainingCardProps) => {
   if (isMobile) {
      return (
         <TrainingCardMobile
            item={item}
            index={index}
            accentColor={accentColor}
            onClick={onClick}
         />
      );
   }

   return (
      <TrainingCardDesktop
         item={item}
         index={index}
         accentColor={accentColor}
         onClick={onClick}
      />
   );
};

export default TrainingCard;

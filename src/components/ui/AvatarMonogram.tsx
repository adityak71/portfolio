import personalData from "@/data/personal.json";
import { CYAN } from "@/config/theme";
import {
   AVATAR_SIZE,
   CARD_FILL,
   DISC_DIAMETER,
   HAIRLINE,
   MONOGRAM_SIZE,
} from "./devAvatarData";

/** "Aditya Kumar" -> "AK": first letter of the first two words. */
const toInitials = (name: string) =>
   name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

/**
 * Static flat disc with the initials in the hero's display face and accent.
 * Nothing here moves; the ring in DevAvatar carries the only motion.
 */
const AvatarMonogram = () => {
   const initials = toInitials(personalData.name);

   return (
      <div
         style={{
            position: "absolute",
            inset: (AVATAR_SIZE - DISC_DIAMETER) / 2,
            borderRadius: "50%",
            background: CARD_FILL,
            border: `1px solid ${HAIRLINE}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <img
            src="/assets/profile/profile.png"
            alt={personalData.name}
            style={{
               width: "100%",
               height: "100%",
               borderRadius: "50%",
               objectFit: "cover"
            }}
         />
      </div>
   );
};

export default AvatarMonogram;

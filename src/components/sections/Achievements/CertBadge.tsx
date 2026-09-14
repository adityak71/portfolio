import { useState } from "react";
import { motion, type Variants } from "motion/react";
import {
   AMBER,
   CYAN,
   DURATION,
   EASING,
   PURPLE,
   RED,
   TEXT_MUTED,
   TEXT_PRIMARY,
   MONO_FONT,
} from "@/config/theme";
import useMotionPreference from "@/hooks/useMotionPreference";

interface CertBadgeProps {
   name: string;
   imageUrl: string;
   badgeUrl?: string;
   url?: string;
   level?: string;
   expiryDate?: string;
   size: number;
   floatDelay: number;
   entranceDelay: number;
}

const credlyThumb = (url: string) => url; // Mock for now

const LEVEL_COLOR: Record<string, string> = {
   Associate: CYAN,
   Foundational: PURPLE,
   Certificate: CYAN,
   "Certificate of Merit": PURPLE,
};

const SESSION_TIME = Date.now();
const EXPIRY_WARNING_DAYS = 90;
const DAY_MS = 86_400_000;
const MAX_STAGGER_S = 0.3;

const HOVER = "hover";
const FLOAT_KEYFRAMES = [0, -8, 0];
const FLOAT_EASE = FLOAT_KEYFRAMES.slice(1).map(() => "easeInOut" as const);
const IMAGE_SPRING = { type: "spring", stiffness: 300, damping: 20 } as const;

const floatVariants: Variants = {
   [HOVER]: { y: 0, transition: { duration: DURATION.default } },
};
const imageVariants: Variants = { [HOVER]: { scale: 1.08 } };
const nameVariants: Variants = { [HOVER]: { color: TEXT_PRIMARY } };

interface ExpiryMeta {
   label: string;
   color: string;
}

const getExpiryMeta = (expiryDate?: string): ExpiryMeta | null => {
   if (!expiryDate) return null;
   const expiry = new Date(`${expiryDate}-01T00:00:00Z`); // appending -01 for yyyy-mm format
   if (isNaN(expiry.getTime())) return null;
   
   const daysUntilExpiry = Math.ceil(
      (expiry.getTime() - SESSION_TIME) / DAY_MS,
   );
   const when = expiry.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
   });
   return { label: `Issued ${when}`, color: TEXT_MUTED };
};

const PlaceholderBadge = ({ size }: { size: number }) => (
   <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,5 115,32 115,88 60,115 5,88 5,32" fill="var(--ch-blue)" opacity="0.1" stroke="var(--color-accent-cyan)" strokeWidth="2" />
      <circle cx="60" cy="60" r="20" fill="var(--color-accent-cyan)" opacity="0.5" />
   </svg>
);

const CertBadge = ({
   name,
   imageUrl,
   badgeUrl,
   url,
   level,
   expiryDate,
   size,
   floatDelay,
   entranceDelay,
}: CertBadgeProps) => {
   const { preference, reducedMotion } = useMotionPreference();
   const [useOriginal, setUseOriginal] = useState(false);
   const accent = level && LEVEL_COLOR[level] ? LEVEL_COLOR[level] : CYAN;
   const expiryMeta = getExpiryMeta(expiryDate);
   
   const ariaLabel = [
      `${name} credential`,
      level && `${level} level`,
      expiryMeta?.label,
   ]
      .filter(Boolean)
      .join(", ");
      
   const hover = reducedMotion ? undefined : HOVER;
   const floatLoop = reducedMotion
      ? undefined
      : {
           y: FLOAT_KEYFRAMES,
           transition: {
              duration: 3,
              repeat: Infinity,
              ease: FLOAT_EASE,
              delay: floatDelay,
           },
        };

   const destinationUrl = url || badgeUrl;

   return (
      <motion.a
         href={destinationUrl || "#"}
         target="_blank"
         rel="noopener noreferrer"
         aria-label={`${ariaLabel} (opens in a new tab)`}
         initial={{ opacity: 0, y: 24 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "0px 0px -60px 0px" }}
         transition={{
            delay: Math.min(entranceDelay, MAX_STAGGER_S),
            duration: 0.5,
            ease: EASING.cinematic,
         }}
         whileHover={hover}
         whileFocus={hover}
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            cursor: destinationUrl ? "pointer" : "default",
            textDecoration: "none",
            position: "relative",
         }}
      >
         <motion.div
            key={preference}
            animate={floatLoop}
            variants={floatVariants}
         >
            {imageUrl ? (
               <div
                  style={{
                     width: size,
                     height: size,
                     backgroundColor: "white",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     padding: 8,
                     borderRadius: 8,
                     overflow: "hidden"
                  }}
               >
                  <motion.img
                     src={useOriginal ? imageUrl : credlyThumb(imageUrl)}
                     onError={() => setUseOriginal(true)}
                     alt={name}
                     loading="lazy"
                     variants={imageVariants}
                     transition={IMAGE_SPRING}
                     style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                     }}
                  />
               </div>
            ) : (
               <motion.div variants={imageVariants} transition={IMAGE_SPRING}>
                  <PlaceholderBadge size={size} />
               </motion.div>
            )}
         </motion.div>

         <div
            style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               gap: 4,
               minHeight: expiryMeta ? 58 : 42,
            }}
         >
            <motion.span
               variants={nameVariants}
               style={{
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: MONO_FONT,
                  color: TEXT_MUTED,
                  textAlign: "center",
                  maxWidth: size + 20,
                  lineHeight: 1.2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
               }}
            >
               {name}
            </motion.span>
            {level && (
               <span
                  style={{
                     fontSize: 9,
                     fontWeight: 700,
                     textTransform: "uppercase",
                     letterSpacing: "0.08em",
                     color: accent,
                     padding: "2px 8px",
                     borderRadius: 4,
                     border: `1px solid ${accent}30`,
                     background: `${accent}08`,
                  }}
               >
                  {level}
               </span>
            )}
            {expiryMeta && (
               <span
                  style={{
                     fontSize: 9,
                     fontWeight: 600,
                     letterSpacing: "0.04em",
                     color: expiryMeta.color,
                  }}
               >
                  {expiryMeta.label}
               </span>
            )}
         </div>
      </motion.a>
   );
};

export default CertBadge;

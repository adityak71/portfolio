import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { fadeInUp } from "@/config/animations";
import type { Certification } from "@/types";
import { CYAN } from "@/config/theme";
import useBreakpoint from "@/hooks/useBreakpoint";
import CertBadge from "./CertBadge";

interface CertBadgeShowcaseProps {
   certifications: Certification[];
}

const CertBadgeShowcase = ({ certifications }: CertBadgeShowcaseProps) => {
   const { isMobile } = useBreakpoint();
   const badgeSize = isMobile ? 90 : 120;

   return (
      <div>
         <motion.div
            className="subsection-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            variants={fadeInUp}
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}
         >
            <ShieldCheck size={22} style={{ color: CYAN }} aria-hidden="true" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>
               Industry Certifications
            </h3>
            <span 
               className="subsection-count" 
               style={{ 
                  color: "var(--color-text-muted)", 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "0.875rem",
                  marginLeft: "auto"
               }}
            >
               {certifications.length}
            </span>
         </motion.div>

         <div
            style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               gap: isMobile ? 20 : 36,
               paddingBottom: 16,
            }}
         >
            {certifications.map((cert, i) => (
               <CertBadge
                  key={cert.id}
                  name={cert.name}
                  imageUrl={cert.imageUrl}
                  badgeUrl={cert.badgeUrl}
                  url={cert.url}
                  level={cert.type}
                  expiryDate={cert.issueDate}
                  size={badgeSize}
                  floatDelay={i * 0.5}
                  entranceDelay={i * 0.1}
               />
            ))}
         </div>
      </div>
   );
};

export default CertBadgeShowcase;

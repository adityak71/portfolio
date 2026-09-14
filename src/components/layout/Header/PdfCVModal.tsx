import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download } from "lucide-react";
import useFocusTrap from "@/hooks/useFocusTrap";

interface PdfCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfSrc: string;
}

const PdfCVModal = ({ isOpen, onClose, pdfSrc }: PdfCVModalProps) => {
  const dialogRef = useFocusTrap<HTMLDivElement>(isOpen);

  const onEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onEsc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(11, 16, 18, 0.8)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdf-cv-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              height: "85vh",
              margin: "0 24px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <h2 id="pdf-cv-title" style={{ fontSize: 18, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>
                Resume
              </h2>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <a
                  href={pdfSrc}
                  download
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  title="Download Resume"
                >
                  <Download size={16} />
                  Download
                </a>
                <button
                  onClick={onClose}
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "var(--color-text-secondary)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label="Close PDF View"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div style={{ flex: 1, width: "100%", backgroundColor: "#e5e7eb", position: "relative" }}>
              <object
                data={`${pdfSrc}#toolbar=0`}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 20, textAlign: "center" }}>
                  <p style={{ color: "#374151", marginBottom: 16 }}>
                    It appears your browser cannot display this PDF inline.
                  </p>
                  <a
                    href={pdfSrc}
                    download
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      backgroundColor: "#000",
                    }}
                  >
                    <Download size={16} />
                    Download Resume
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PdfCVModal;

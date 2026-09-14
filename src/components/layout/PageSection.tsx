import { MAX_WIDTH } from "@/config/theme";

interface PageSectionProps {
  id: string;
  surface: string;
  children: React.ReactNode;
}

const PageSection = ({ id, surface, children }: PageSectionProps) => {
  return (
    <section
      id={id}
      tabIndex={-1}
      className={`${surface} py-10 md:py-16 px-6`}
    >
      <div
        style={{ maxWidth: MAX_WIDTH, marginInline: "auto" }}
      >
        {children}
      </div>
    </section>
  );
};

export default PageSection;

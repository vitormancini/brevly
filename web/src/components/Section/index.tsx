import { SectionContainer } from "./style";

interface SectionProps {
  title: string;
  variant: "form" | "list";
  children?: React.ReactNode;
}

export function Section({ title, children, variant }: SectionProps) {
  return (
    <SectionContainer variant={variant}>
      <h2>{title}</h2>
      {children}
    </SectionContainer>
  );
}

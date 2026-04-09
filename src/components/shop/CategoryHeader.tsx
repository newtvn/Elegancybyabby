import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface CategoryHeaderProps {
  label: string;
  description: string;
}

export function CategoryHeader({ label, description }: CategoryHeaderProps) {
  return (
    <div className="pt-28 pb-12 text-center">
      <ScrollReveal>
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-3">Collection</p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">{label}</h1>
        <p className="text-text-muted max-w-md mx-auto leading-relaxed">{description}</p>
      </ScrollReveal>
    </div>
  );
}

import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { RequestForm } from "@/components/requests/RequestForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: `Special Requests | ${SITE_NAME}`,
  description: "Request a custom piece of jewelry crafted just for you.",
};

export default function RequestsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 mesh-bg min-h-screen">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-3">Custom Orders</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 font-bold">
            Special Requests
          </h1>
          <p className="text-text-muted max-w-md mx-auto leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Describe your dream piece and we&apos;ll craft it for you.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <RequestForm />
      </ScrollReveal>
    </div>
  );
}

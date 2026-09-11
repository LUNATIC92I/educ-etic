import { Hero } from "@/components/marketing/hero";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { LevelPreview } from "@/components/marketing/level-preview";
import { Roadmap } from "@/components/marketing/roadmap";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <LevelPreview />
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Ta feuille de route de créateur</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ck-text-muted">
          Chaque mission te fait avancer sur ce chemin, du premier code au titre de champion HTML &amp; CSS.
        </p>
        <div className="mt-12">
          <Roadmap activeIndex={1} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}

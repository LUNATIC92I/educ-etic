import { Button } from "@/components/ui/button";
import { Blob } from "@/components/ui/decor";

export function CtaSection() {
  return (
    <section className="relative mx-auto my-20 max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-electric-600 via-violet-600 to-bubble-500 px-6 py-16 text-center text-white sm:px-12">
      <Blob className="left-[-10%] top-[-20%] h-72 w-72 bg-white/20" />
      <Blob className="bottom-[-20%] right-[-10%] h-80 w-80 bg-white/10" style={{ animationDelay: "3s" }} />
      <div className="relative">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Prêt à créer quelque chose d&apos;incroyable ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          Rejoins des milliers de jeunes créateurs et code ton premier site dès aujourd&apos;hui.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/register" size="lg" variant="sunny">
            Commencer l&apos;aventure
          </Button>
          <Button
            href="/pricing"
            size="lg"
            variant="secondary"
            className="!border-white/30 !bg-white/10 !text-white hover:!border-white/60"
          >
            Voir les tarifs
          </Button>
        </div>
      </div>
    </section>
  );
}

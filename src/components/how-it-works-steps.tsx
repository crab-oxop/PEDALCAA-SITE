import { howItWorksSteps } from "@/lib/how-it-works";
import { Reveal } from "@/components/reveal";

export function HowItWorksSteps() {
  return (
    <div>
      {howItWorksSteps.map((s, i) => (
        <Reveal key={s.step} delay={i * 100}>
          <div
            className={`flex items-start gap-6 border-white/10 py-8 sm:gap-10 ${
              i === 0 ? "" : "border-t"
            }`}
          >
            <span className="w-12 shrink-0 font-display text-4xl text-ink-faint sm:text-5xl">
              {String(s.step).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
                {s.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

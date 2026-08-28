import { useState } from "react";
import { SERVICES, SKILLS, STATS, TESTIMONIALS, TIMELINE, TICKER_ITEMS, WA_LINK } from "./data";
import { useCountUp, useInView } from "./hooks";
import { Icons, Marquee, PortraitSVG, Reveal } from "./ui";

/* ------------------------------------------------ letreiro inclinado */
export function Ticker({
  tone = "flame",
  reverse = false,
}: {
  tone?: "flame" | "butter";
  reverse?: boolean;
}) {
  const toneClass = tone === "flame" ? "bg-flame" : "bg-butter";
  return (
    <div
      className={`relative z-10 -my-2 scale-[1.02] ${
        reverse ? "rotate-[1.3deg]" : "-rotate-[1.3deg]"
      }`}
    >
      <div className={`border-y-2 border-ink/20 ${toneClass} py-4 text-ink sm:py-5`}>
        <Marquee duration={24} reverse={reverse}>
          {TICKER_ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-7 pr-7">
              <span className="font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl whitespace-nowrap">
                {item}
              </span>
              {Icons.asterisk("w-6 h-6 sm:w-8 sm:h-8")}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

/* ------------------------------------------------ capacidades (acordeão) */
export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="capacidades" className="relative bg-bone py-24 text-ink sm:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink/50">
              ( capacidades )
            </p>
            <h2 className="mt-4 font-display font-extrabold uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,5.5vw,4.6rem)]">
              Design com
              <br />
              <span className="text-outline-ink">intenção.</span>
            </h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-7 lg:pt-8">
            <p className="max-w-xl text-lg font-light leading-relaxed text-ink/70">
              Cinco frentes, um mesmo princípio: nada entra no projeto sem motivo. Cada traço,
              tela e render existe para comunicar — e para funcionar na vida real.
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.n} delay={i * 60}>
                <div className={`border-t border-ink/15 ${i === SERVICES.length - 1 ? "border-b" : ""}`}>
                  <button
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left sm:gap-8 sm:py-8"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    data-cursor
                  >
                    <span
                      className={`font-mono text-xs tracking-[0.2em] transition-colors duration-300 ${
                        isOpen ? "text-flame" : "text-ink/40 group-hover:text-flame"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span
                      className={`font-display font-bold uppercase tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                        isOpen ? "text-flame" : "text-ink"
                      } text-2xl sm:text-4xl`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`grid h-11 w-11 place-items-center border transition-all duration-400 ${
                        isOpen
                          ? "rotate-45 border-ink bg-ink text-bone"
                          : "border-ink/25 text-ink group-hover:border-ink"
                      }`}
                    >
                      {Icons.plus("w-4 h-4")}
                    </span>
                  </button>
                  <div className={`acc-body ${isOpen ? "open" : ""}`}>
                    <div className="acc-inner">
                      <div className="grid gap-6 pb-8 sm:grid-cols-12 sm:pb-10">
                        <p className="sm:col-span-7 sm:col-start-2 text-ink/70 font-light leading-relaxed">
                          {s.desc}
                        </p>
                        <div className="sm:col-span-4 flex flex-wrap content-start gap-2">
                          {s.chips.map((c) => (
                            <span
                              key={c}
                              className="border border-ink/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:bg-ink hover:text-bone"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ números */
function StatItem({ value, suffix, label, started, i }: { value: number; suffix: string; label: string; started: boolean; i: number }) {
  const n = useCountUp(value, started, 1300 + i * 150);
  return (
    <div className="p-8 sm:p-10">
      <p className="font-display font-extrabold leading-none tracking-tight text-5xl sm:text-6xl">
        {String(n).padStart(value >= 100 ? 3 : 2, "0")}
        <span className="text-flame">{suffix}</span>
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">{label}</p>
    </div>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section className="border-y border-line bg-coal/40">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-line lg:[&>*]:border-r lg:[&>*:last-child]:border-r-0 [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-line lg:[&>*]:border-b-0"
      >
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} started={inView} i={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------ sobre */
const ACCENTS = ["var(--color-flame)", "var(--color-butter)", "var(--color-lilac)", "var(--color-chalk)"];

export function About() {
  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[400px_1fr]">
          {/* coluna fixa com o retrato */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <figure className="group relative -rotate-2 border border-line bg-coal p-3 transition-transform duration-500 hover:rotate-0">
                <span className="absolute -top-3 left-8 z-10 h-6 w-20 -rotate-6 bg-butter/70" aria-hidden="true" />
                <span className="absolute -top-3 right-10 z-10 h-6 w-16 rotate-6 bg-lilac/60" aria-hidden="true" />
                <PortraitSVG className="w-full" />
                <figcaption className="mt-4 flex items-center justify-between gap-4 px-1 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  <span>Jean — o Q por trás do Q’ART</span>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-flame dot-live" />
                    online
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* conteúdo */}
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-flame">( sobre )</p>
              <h2 className="mt-4 max-w-xl font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,4.6vw,3.9rem)]">
                Ilustrador &amp; desenvolvedor em formação.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-smoke">
                Não crio apenas layouts bonitos — desenho interfaces pensadas para a{" "}
                <span className="text-chalk">funcionalidade</span> e para a facilidade de
                implementação. Como estudante de TI, transito entre o traço e o código,
                transformando ideias complexas em{" "}
                <span className="text-chalk">identidades visuais claras</span>.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-smoke">
                Do rascunho à ilustração técnica, do wireframe ao protótipo de alta fidelidade:
                se você precisa de um design que converse fluentemente com a equipe de
                desenvolvimento, a gente se entende rápido.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
                Ferramentas &amp; stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="border border-line px-3.5 py-2 font-mono text-[11px] tracking-[0.08em] text-chalk/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame hover:text-chalk"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="mt-14">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">Trajetória</p>
              </Reveal>
              <ol className="mt-6 space-y-9 border-l border-line pl-7">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.year} delay={i * 100}>
                    <li className="relative">
                      <span
                        className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full border-2 border-ink"
                        style={{ background: ACCENTS[i % ACCENTS.length] }}
                        aria-hidden="true"
                      />
                      <p className="font-mono text-xs tracking-[0.2em] text-flame">{t.year}</p>
                      <h3 className="mt-1.5 font-display text-xl font-bold uppercase tracking-tight">
                        {t.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm font-light leading-relaxed text-smoke">{t.desc}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal delay={160}>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="group mt-12 inline-flex items-center gap-3 font-display text-lg font-bold uppercase tracking-wide text-flame"
              >
                <span className="u-link">Vamos conversar</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
                  {Icons.arrowUpRight("w-5 h-5")}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ depoimentos */
export function Testimonials() {
  return (
    <section className="relative border-t border-line py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display font-extrabold uppercase leading-none tracking-tight text-3xl sm:text-4xl">
              Quem já criou <span className="text-outline">comigo</span>
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
              feedback real de projetos reais
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 140} className={t.offset}>
              <blockquote className="border-t-2 pt-6" style={{ borderColor: t.accent }}>
                <span style={{ color: t.accent }}>{Icons.quote("w-9 h-9")}</span>
                <p className="mt-4 text-xl font-light leading-relaxed text-chalk/90">
                  “{t.quote}”
                </p>
                <footer className="mt-6">
                  <p className="font-display text-sm font-bold uppercase tracking-wide">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{t.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

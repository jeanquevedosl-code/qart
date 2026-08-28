import type { CSSProperties } from "react";
import { STRIP_IMAGES, WA_LINK } from "./data";
import { useParallax, useScramble } from "./hooks";
import { Icons, Marquee, RotatingBadge } from "./ui";

const WORDS = ["DIGITAL.", "AUTORAL.", "VIVA.", "ETERNA."] as const;

const STRIP_LABELS = ["fig. 01", "fig. 02", "fig. 03", "fig. 04"];

export default function Hero() {
  const word = useScramble(WORDS);
  const bgRef = useParallax<HTMLDivElement>(0.16);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* camadas de fundo */}
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute -top-32 -left-40 w-[560px] h-[560px] rounded-full bg-flame/[0.08] blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-[55%] -right-40 w-[480px] h-[480px] rounded-full bg-lilac/[0.07] blur-[130px]"
        aria-hidden="true"
      />
      <div
        ref={bgRef}
        className="absolute top-16 right-[-3%] pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display font-extrabold leading-none text-[24vw] text-outline opacity-80 block">
          Q’ART
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-32 sm:pt-40">
        {/* linha de metadados */}
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-smoke">
          <span>Portfólio ©2026</span>
          <span className="hidden sm:inline">Jean — Designer Gráfico &amp; Ilustrador</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-butter inline-block" />
            Brasil · GMT-3
          </span>
        </div>

        {/* título + coluna lateral */}
        <div className="grid lg:grid-cols-12 gap-10 mt-12 lg:mt-16 items-end">
          <div className="lg:col-span-9">
            <h1 className="font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[clamp(2.7rem,9vw,7.6rem)]">
              <span className="mask-line" style={{ "--line-delay": "100ms" } as CSSProperties}>
                <span>Ideias visuais</span>
              </span>
              <span className="mask-line" style={{ "--line-delay": "240ms" } as CSSProperties}>
                <span>
                  que viram{" "}
                  <svg viewBox="0 0 24 24" className="inline-block w-[0.55em] h-[0.55em] text-flame align-baseline" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 3.5v17M4.6 7.75l14.8 8.5M19.4 7.75l-14.8 8.5" />
                  </svg>
                </span>
              </span>
              <span className="mask-line" style={{ "--line-delay": "380ms" } as CSSProperties}>
                <span>
                  presença{" "}
                  <span className="text-flame inline-block text-left min-w-[7.5ch]">{word}</span>
                  <span className="caret inline-block w-[0.09em] h-[0.72em] bg-flame align-baseline ml-1" aria-hidden="true" />
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg sm:text-xl font-light text-smoke leading-relaxed">
              <strong className="text-chalk font-medium">Q’ART</strong> é a prática criativa de
              Jean: identidade, direção de arte e experiências web que unem{" "}
              <em className="text-chalk not-italic underline decoration-flame decoration-2 underline-offset-4">
                intenção visual
              </em>{" "}
              e{" "}
              <em className="text-chalk not-italic underline decoration-butter decoration-2 underline-offset-4">
                código
              </em>
              .
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-flame text-ink font-display font-bold uppercase tracking-wider text-sm px-7 py-4 transition-colors duration-300 hover:bg-chalk"
              >
                {Icons.whatsapp("w-5 h-5")}
                Iniciar conversa
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  {Icons.arrowUpRight("w-4 h-4")}
                </span>
              </a>
              <a
                href="#trabalhos"
                className="u-link inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-chalk/85"
              >
                ver trabalhos
                <span className="text-flame animate-float">{Icons.arrowDown("w-4 h-4")}</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col items-end gap-6 pb-2">
            <RotatingBadge className="w-36 h-36" />
            <div className="text-right font-mono text-[10px] uppercase tracking-[0.22em] text-smoke leading-relaxed">
              estudos visuais
              <br />
              <span className="text-butter">selecionados / 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* faixa de imagens em marquee */}
      <div className="relative mt-14 sm:mt-20 border-y border-line bg-coal/50 py-5 sm:py-7">
        <Marquee duration={38}>
          {STRIP_IMAGES.map((src, i) => (
            <figure
              key={i}
              className={`shrink-0 mx-3 sm:mx-4 w-[clamp(190px,26vw,320px)] border border-line bg-ink p-2 transition-transform duration-500 hover:rotate-0 hover:border-flame/60 ${
                i % 2 === 0 ? "-rotate-[1.6deg]" : "rotate-[1.2deg]"
              }`}
            >
              <img
                src={src}
                alt={`Estudo visual ${i + 1} de Jean`}
                loading="eager"
                className="h-[clamp(170px,22vw,280px)] w-full object-cover"
              />
              <figcaption className="flex items-center justify-between pt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-smoke">
                <span>{STRIP_LABELS[i]}</span>
                <span className="text-flame">{Icons.asterisk("w-3 h-3")}</span>
                <span>estudo</span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

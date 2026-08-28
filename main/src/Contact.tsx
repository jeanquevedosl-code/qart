import { useState } from "react";
import { BEHANCE, EMAIL, INSTAGRAM, WA_LINK } from "./data";
import { Icons, Reveal } from "./ui";

function EmailButton() {
  const [copied, setCopied] = useState(false);

  const flash = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      flash();
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        flash();
      } catch {
        /* sem suporte a cópia */
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <button
      onClick={copy}
      data-cursor
      className={`inline-flex items-center gap-3 border-2 border-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
        copied ? "bg-ink text-butter" : "text-ink hover:bg-ink hover:text-butter"
      }`}
      aria-live="polite"
    >
      {copied ? Icons.check("w-4 h-4") : Icons.copy("w-4 h-4")}
      {copied ? "copiado!" : EMAIL}
    </button>
  );
}

const HEADLINE = ["Vamos", "criar", "algo", "que", "não", "passa", "despercebido."];

export default function Contact() {
  return (
    <>
      <section id="contato" className="relative overflow-hidden bg-flame text-ink">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display font-extrabold text-[22vw] leading-none text-outline-ink opacity-60"
          aria-hidden="true"
        >
          Q’ART®
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink/20 pb-5 font-mono text-[11px] uppercase tracking-[0.24em]">
              <span>( contato )</span>
              <span>resposta em até 24h</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-12 font-display font-extrabold uppercase leading-[0.92] tracking-tight text-[clamp(2.5rem,7.5vw,6.4rem)]">
              {HEADLINE.map((w, i) => (
                <span
                  key={i}
                  className="inline-block transition-all duration-300 hover:-translate-y-2 hover:text-butter"
                >
                  {w}
                  {i < HEADLINE.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-ink/75">
              Para marcas, produtos e experiências que pedem clareza, personalidade e uma
              execução impecável — do primeiro rascunho ao último pixel.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-chalk transition-colors duration-300 hover:bg-coal"
              >
                {Icons.whatsapp("w-5 h-5")}
                Iniciar conversa
                <span className="text-flame transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  {Icons.arrowUpRight("w-4 h-4")}
                </span>
              </a>
              <EmailButton />
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-14 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em]">
              <span className="w-2.5 h-2.5 rounded-full bg-ink dot-live" />
              Disponível para projetos — agenda de 2026 aberta
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="relative border-t border-line bg-ink">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 py-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-display text-3xl font-extrabold tracking-tight">
                Q<span className="text-flame">’</span>ART<span className="align-super text-sm text-smoke">®</span>
              </p>
              <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-smoke">
                Prática criativa de Jean — identidade, direção de arte e experiências web com
                intenção visual e código.
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">Mapa</p>
              <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Rodapé">
                {[
                  ["#trabalhos", "Trabalhos"],
                  ["#capacidades", "Capacidades"],
                  ["#sobre", "Sobre"],
                  ["#contato", "Contato"],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="u-link text-sm text-chalk/85 hover:text-chalk">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="md:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">Social</p>
              <div className="mt-5 flex gap-3">
                {[
                  { href: INSTAGRAM, label: "Instagram", icon: Icons.instagram("w-5 h-5") },
                  { href: BEHANCE, label: "Behance", icon: Icons.behance("w-5 h-5") },
                  { href: WA_LINK, label: "WhatsApp", icon: Icons.whatsapp("w-5 h-5") },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-12 w-12 place-items-center border border-line text-chalk/80 transition-all duration-300 hover:-translate-y-1 hover:border-flame hover:bg-flame hover:text-ink"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <a href={`mailto:${EMAIL}`} className="u-link mt-5 inline-block text-sm text-smoke hover:text-chalk">
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
            <span>© 2026 Q’ART — todos os direitos reservados</span>
            <span className="flex items-center gap-2">
              feito à mão, com código &amp; intenção
              <span className="text-flame">{Icons.asterisk("w-3.5 h-3.5")}</span>
            </span>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 border border-line px-4 py-2.5 transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-ink"
            >
              voltar ao topo
              <span className="rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5">
                {Icons.arrowDown("w-3.5 h-3.5")}
              </span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

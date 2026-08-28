import { useEffect, useState } from "react";
import { PROJECTS, WA_LINK, type Project } from "./data";
import { Icons, Reveal } from "./ui";

function ProjectCard({ p, onOpen, delay }: { p: Project; onOpen: () => void; delay: number }) {
  return (
    <Reveal delay={delay} className={`${p.span} h-full`}>
      <button
        onClick={onOpen}
        data-cursor
        className="group relative flex h-full w-full flex-col text-left"
        aria-label={`Abrir detalhes do projeto ${p.title}`}
      >
        <div
          className={`relative overflow-hidden border border-line bg-coal ${
            p.aspect ?? "min-h-75 lg:min-h-0 lg:flex-1"
          }`}
        >
          <img
            src={p.img}
            alt={`${p.title} — ${p.category}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:rotate-[0.6deg]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 border border-line bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/85">
            N°{p.index}
          </span>
          <span className="absolute right-4 top-4 grid h-11 w-11 translate-y-2 place-items-center bg-flame text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {Icons.arrowUpRight("w-5 h-5")}
          </span>
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-chalk/85 opacity-0 transition-all duration-500 group-hover:opacity-100">
            abrir projeto
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 pt-4">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-flame">
              {p.title}
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
              {p.category}
            </p>
            <span
              className="mt-3 block h-0.75 w-0 transition-all duration-500 group-hover:w-16"
              style={{ background: p.accent }}
            />
          </div>
          <span className="font-mono text-xs text-smoke">{p.year}</span>
        </div>
      </button>
    </Reveal>
  );
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Projeto ${p.title}`}
    >
      <button
        aria-label="Fechar"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/85 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative w-full max-w-5xl overflow-y-auto border border-line bg-coal transition-all duration-300 max-h-[90vh] md:grid md:grid-cols-2 ${
          shown ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="relative min-h-65 md:min-h-130">
          <img src={p.img} alt={`${p.title} — ${p.category}`} className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute left-4 top-4 bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/85 border border-line">
            N°{p.index} / 06
          </span>
        </div>
        <div className="p-7 sm:p-10 flex flex-col">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-flame">
            {p.category} — {p.year}
          </p>
          <h3 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight">
            {p.title}
          </h3>
          <p className="mt-5 text-smoke font-light leading-relaxed">{p.description}</p>

          <dl className="mt-7">
            {[
              ["Papel", p.role],
              ["Ferramentas", p.stack],
              ["Entrega", p.year],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-6 border-t border-line py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">{k}</dt>
                <dd className="text-sm text-chalk/90 text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/70"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 bg-flame px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-chalk"
            >
              Quero algo assim
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                {Icons.arrowUpRight("w-4 h-4")}
              </span>
            </a>
            <button
              onClick={onClose}
              className="u-link font-mono text-xs uppercase tracking-[0.2em] text-smoke hover:text-chalk"
            >
              fechar
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Fechar projeto"
          className="absolute right-4 top-4 border border-line bg-ink/70 p-2.5 text-chalk transition-colors hover:bg-flame hover:text-ink"
        >
          {Icons.close("w-4 h-4")}
        </button>
      </div>
    </div>
  );
}

export default function Works() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="trabalhos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-flame">
                Selecionados / 2026
              </p>
              <h2 className="mt-4 font-display font-extrabold uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6vw,5rem)]">
                Estudos <span className="text-outline">visuais</span>
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke max-w-60 leading-relaxed">
              06 projetos —<br />
              <span className="text-chalk/80">clique para abrir os detalhes</span>
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-14 lg:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} delay={(i % 2) * 120} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
    </section>
  );
}

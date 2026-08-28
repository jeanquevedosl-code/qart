import { useEffect, useState } from "react";
import { BEHANCE, INSTAGRAM, WA_LINK } from "./data";
import { Icons } from "./ui";

const LINKS = [
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#capacidades", label: "Capacidades" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      className="font-display font-extrabold text-xl tracking-tight leading-none select-none"
      aria-label="Q’ART — início"
    >
      Q<span className="text-flame">’</span>ART<span className="align-super text-[0.5em] text-smoke">®</span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "bg-ink/90 backdrop-blur-md border-b border-line py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="u-link font-mono text-[11px] uppercase tracking-[0.22em] text-chalk/80 hover:text-chalk"
              >
                <span className="text-flame mr-1.5">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2.5 border border-line px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-flame dot-live" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
              Disponível
            </span>
          </div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <span className="block w-7 h-[2px] bg-chalk" />
            <span className="block w-5 h-[2px] bg-flame ml-auto" />
            <span className="block w-7 h-[2px] bg-chalk" />
          </button>
        </div>
      </header>

      {/* menu mobile em tela cheia */}
      <div
        className={`fixed inset-0 z-[80] bg-ink transition-all duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative h-full flex flex-col px-6 py-6">
          <div className="flex items-center justify-between">
            <Logo onClick={() => setOpen(false)} />
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-chalk hover:text-flame transition-colors"
              aria-label="Fechar menu"
            >
              {Icons.close("w-7 h-7")}
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-2" aria-label="Menu">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-display font-extrabold uppercase text-5xl leading-tight py-2 transition-all duration-500 hover:text-flame hover:translate-x-3 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
              >
                <span className="font-mono text-xs text-flame align-top mr-3">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-line pt-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-flame dot-live" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                Disponível para projetos
              </span>
            </div>
            <div className="flex gap-4 text-smoke">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-flame transition-colors" aria-label="Instagram">
                {Icons.instagram("w-5 h-5")}
              </a>
              <a href={BEHANCE} target="_blank" rel="noreferrer" className="hover:text-flame transition-colors" aria-label="Behance">
                {Icons.behance("w-5 h-5")}
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="hover:text-flame transition-colors" aria-label="WhatsApp">
                {Icons.whatsapp("w-5 h-5")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


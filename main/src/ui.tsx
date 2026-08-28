import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useInView, useReducedMotion } from "./hooks";

/* ------------------------------------------------ Reveal on scroll */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------ Letreiro contínuo */
export function Marquee({
  children,
  duration = 30,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-track ${reverse ? "reverse" : ""}`}
        style={{ "--mq-dur": `${duration}s` } as CSSProperties}
      >
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------ Cursor customizado */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine)").matches;
    setFine(ok);
    if (ok) document.documentElement.classList.add("fine-cursor");
    return () => document.documentElement.classList.remove("fine-cursor");
  }, []);

  useEffect(() => {
    if (!fine) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      const t = e.target as Element | null;
      const interactive = t?.closest?.("a, button, [role='button'], [data-cursor]");
      ring.classList.toggle("grow", Boolean(interactive));
    };

    const loop = () => {
      const ease = reduced ? 1 : 0.16;
      rx += (x - rx) * ease;
      ry += (y - ry) * ease;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

/* ------------------------------------------------ Ícones (SVG próprios) */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icons = {
  arrowUpRight: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <path d="M6.5 17.5 17.5 6.5M8 6.5h9.5V16" />
    </svg>
  ),
  arrowDown: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <path d="M12 4v15M5.5 13l6.5 6.5L18.5 13" />
    </svg>
  ),
  asterisk: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <path d="M12 3.5v17M4.6 7.75l14.8 8.5M19.4 7.75l-14.8 8.5" />
    </svg>
  ),
  plus: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  close: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  check: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <path d="M4.5 12.5l5 5L19.5 7" />
    </svg>
  ),
  copy: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" />
    </svg>
  ),
  whatsapp: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c}>
      <path
        d="M12 3a9 9 0 0 0-7.9 13.3L3 21l4.8-1.1A9 9 0 1 0 12 3z"
        {...stroke}
      />
      <path
        d="M8.6 8.3c-.5 2.8 4.3 7.6 7.1 7.1l.6-1.7-2.1-1.2-1 .8c-.9-.4-2-1.5-2.4-2.4l.8-1-1.2-2.1z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  instagram: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  behance: (c = "w-4 h-4") => (
    <svg viewBox="0 0 24 24" className={c} {...stroke}>
      <path d="M3.5 7.5h4.6a2.4 2.4 0 0 1 0 4.8H3.5zM3.5 12.3h5.2a2.6 2.6 0 0 1 0 5.2H3.5z" />
      <path d="M14.5 8h5.5M14.3 15a3 3 0 1 0 6-.4h-6a3 3 0 0 0 3.2-3.1" />
    </svg>
  ),
  quote: (c = "w-8 h-8") => (
    <svg viewBox="0 0 24 24" className={c} fill="currentColor">
      <path d="M5.5 11.2c0-3 1.9-5.1 4.8-6.2v2.9c-1.4.6-2 1.6-2 3h2.2v6.3H5.5zM14 11.2c0-3 1.9-5.1 4.8-6.2v2.9c-1.4.6-2 1.6-2 3H19v6.3h-5z" />
    </svg>
  ),
};

/* ------------------------------------------------ Selo giratório */
export function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full animate-spin-slow"
        aria-hidden="true"
      >
        <defs>
          <path
            id="badge-circle"
            d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
          />
        </defs>
        <text className="font-mono" fontSize="10.5" letterSpacing="2.6" fill="var(--color-chalk)">
          <textPath href="#badge-circle">
            DISPONÍVEL PARA PROJETOS • DISPONÍVEL PARA PROJETOS •
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-flame">
        {Icons.asterisk("w-7 h-7")}
      </span>
    </div>
  );
}

/* ------------------------------------------------ Autorretrato ilustrado */
export function PortraitSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label="Autorretrato ilustrado de Jean">
      <rect width="400" height="500" fill="var(--color-coal)" />
      <defs>
        <pattern id="halftone" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="var(--color-chalk)" opacity="0.14" />
        </pattern>
      </defs>

      <circle cx="200" cy="215" r="132" fill="var(--color-line)" />
      <rect x="0" y="330" width="150" height="170" fill="url(#halftone)" />
      <circle cx="306" cy="102" r="34" fill="var(--color-butter)" />
      <path d="M60 88l14 24H46z" fill="var(--color-lilac)" opacity="0.85" />
      <g stroke="var(--color-flame)" strokeWidth="3" strokeLinecap="round">
        <path d="M52 180v22M41 191h22" />
      </g>

      {/* corpo / moletom */}
      <path
        d="M86 500c0-112 44-158 114-158s114 46 114 158z"
        fill="#29221a"
      />
      <path
        d="M146 372c14 26 94 26 108 0l-10-24c-26 16-62 16-88 0z"
        fill="#322a20"
      />
      <path d="M186 396c0 14-4 24-10 32M214 396c0 14 4 24 10 32" stroke="var(--color-flame)" strokeWidth="4" strokeLinecap="round" />

      {/* pescoço + cabeça */}
      <rect x="178" y="296" width="44" height="56" rx="16" fill="#a06b42" />
      <ellipse cx="200" cy="224" rx="80" ry="94" fill="#b97f52" />
      <circle cx="121" cy="232" r="14" fill="#b97f52" />
      <circle cx="279" cy="232" r="14" fill="#b97f52" />

      {/* cabelo crespo */}
      <g fill="#241c14">
        <circle cx="136" cy="168" r="26" />
        <circle cx="162" cy="146" r="27" />
        <circle cx="196" cy="134" r="28" />
        <circle cx="232" cy="142" r="27" />
        <circle cx="260" cy="164" r="25" />
        <circle cx="276" cy="192" r="20" />
        <circle cx="124" cy="196" r="20" />
        <circle cx="150" cy="132" r="18" />
        <circle cx="216" cy="124" r="18" />
        <circle cx="248" cy="130" r="16" />
      </g>

      {/* rosto */}
      <g fill="#241c14">
        <rect x="150" y="196" width="34" height="7" rx="3.5" />
        <rect x="216" y="196" width="34" height="7" rx="3.5" />
      </g>
      <g fill="#1c1410">
        <circle cx="167" cy="224" r="8" />
        <circle cx="233" cy="224" r="8" />
      </g>
      <circle cx="170" cy="221" r="2.4" fill="var(--color-chalk)" />
      <circle cx="236" cy="221" r="2.4" fill="var(--color-chalk)" />
      <path d="M200 232c-4 12-6 20 2 26" stroke="#8f5a34" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M178 276c14 10 30 10 44 0" stroke="#6e4526" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* luz de recorte */}
      <path
        d="M262 152c26 40 28 108-4 152 16-46 14-108-6-146z"
        fill="var(--color-flame)"
        opacity="0.5"
      />

      <text
        x="372"
        y="474"
        textAnchor="end"
        fontFamily="Space Mono, monospace"
        fontSize="13"
        fill="var(--color-smoke)"
      >
        autorretrato — jean, ’26
      </text>
    </svg>
  );
}

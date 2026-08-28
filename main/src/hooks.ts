import { useEffect, useRef, useState } from "react";

/* Detecta preferência por movimento reduzido */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* Observa quando um elemento entra na viewport (uma única vez) */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const SCRAMBLE_CHARS = "#*+=<>/\\_—";

/* Palavras que se “decodificam” em loop (efeito scramble) */
export function useScramble(words: readonly string[], hold = 2400): string {
  const reduced = useReducedMotion();
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (reduced || words.length < 2) {
      setText(words[0]);
      return;
    }
    let wi = 0;
    let frame = 0;
    let mode: "decode" | "hold" = "decode";
    let holdStart = 0;
    let raf = 0;
    let to = words[0];

    const tick = (t: number) => {
      if (mode === "decode") {
        frame += 1;
        const progress = Math.min(1, frame / 16);
        const revealed = Math.floor(progress * to.length);
        let out = "";
        for (let i = 0; i < to.length; i += 1) {
          out +=
            i < revealed
              ? to[i]
              : to[i] === " "
                ? " "
                : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setText(out);
        if (progress >= 1) {
          mode = "hold";
          holdStart = t;
        }
      } else if (t - holdStart > hold) {
        wi = (wi + 1) % words.length;
        to = words[wi];
        frame = 0;
        mode = "decode";
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, words, hold]);

  return text;
}

/* Contador animado (count-up) disparado por `start` */
export function useCountUp(target: number, start: boolean, duration = 1500): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);
  return value;
}

/* Parallax simples: desloca o elemento conforme o scroll */
export function useParallax<T extends HTMLElement>(speed = 0.18) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, reduced]);
  return ref;
}

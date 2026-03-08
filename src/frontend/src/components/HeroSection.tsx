import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getNextValentine(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const valentine = new Date(year, 1, 14, 23, 59, 59); // Feb 14
  if (now > valentine) {
    return new Date(year + 1, 1, 14, 23, 59, 59);
  }
  return valentine;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    function calculate() {
      const target = getNextValentine();
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsPast(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return { timeLeft, isPast };
}

function HeartSVG({
  size,
  opacity,
  color,
}: { size: number; opacity: number; color: string }) {
  return (
    <svg
      role="img"
      aria-label="Heart"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ opacity }}
    >
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  );
}

const HEARTS = [
  { size: 14, opacity: 0.55, color: "oklch(0.72 0.15 10)" },
  { size: 22, opacity: 0.45, color: "oklch(0.58 0.18 15)" },
  { size: 10, opacity: 0.65, color: "oklch(0.80 0.12 70)" },
  { size: 18, opacity: 0.5, color: "oklch(0.65 0.18 12)" },
  { size: 12, opacity: 0.6, color: "oklch(0.72 0.15 10)" },
  { size: 26, opacity: 0.4, color: "oklch(0.58 0.18 15)" },
  { size: 16, opacity: 0.55, color: "oklch(0.80 0.12 70)" },
  { size: 20, opacity: 0.45, color: "oklch(0.65 0.18 12)" },
  { size: 14, opacity: 0.6, color: "oklch(0.72 0.15 10)" },
];

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="countdown-digit rounded-xl px-4 py-3 min-w-[3.5rem] text-center">
        <span className="font-display text-3xl md:text-4xl font-bold text-white tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-white/70 text-xs font-body uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const { timeLeft, isPast } = useCountdown();

  return (
    <section
      data-ocid="hero.section"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/valentine-hero.dim_1200x600.jpg"
          alt="Romantic Valentine's Day atmosphere with roses and candlelight"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Floating Hearts */}
      <div className="hearts-container">
        {HEARTS.map((heart, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static decorative array, order never changes
          <div key={`heart-${i}`} className={`floating-heart heart-${i + 1}`}>
            <HeartSVG
              size={heart.size}
              opacity={heart.opacity}
              color={heart.color}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Decorative top */}
        <div className="animate-fade-in-up mb-6 flex items-center justify-center gap-3">
          <HeartSVG size={18} opacity={0.9} color="oklch(0.80 0.12 70)" />
          <span
            id="4zxe7t"
            className="text-white/80 font-body text-sm uppercase tracking-[0.3em] font-medium"
          >
            For My Loving Pramu
          </span>
          <HeartSVG size={18} opacity={0.9} color="oklch(0.80 0.12 70)" />
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up delay-100 font-display text-5xl md:text-7xl lg:text-8xl font-bold italic leading-tight mb-4">
          <span className="gold-shimmer">Happy Valentine's</span>
          <br />
          <span id="1hqroxm" className="text-white">
            Day, Pramu
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 font-body text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-lg mx-auto">
          Every moment with you is a treasure, every heartbeat is yours — with
          all my love, always and forever.
        </p>

        {/* Countdown */}
        {!isPast ? (
          <div className="animate-fade-in-up delay-300">
            <p className="text-white/60 text-xs uppercase tracking-[0.25em] mb-4 font-body">
              Counting down to Valentine's
            </p>
            <div className="flex items-start justify-center gap-3 md:gap-5">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <span className="text-white/50 text-3xl md:text-4xl font-display mt-2">
                :
              </span>
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <span className="text-white/50 text-3xl md:text-4xl font-display mt-2">
                :
              </span>
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <span className="text-white/50 text-3xl md:text-4xl font-display mt-2">
                :
              </span>
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up delay-300">
            <p className="font-display text-2xl italic text-white/90">
              Happy Valentine's Day! 💕
            </p>
          </div>
        )}

        {/* Scroll hint */}
        <div className="animate-fade-in-up delay-600 mt-14 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-[0.2em] font-body">
            Scroll for love notes
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

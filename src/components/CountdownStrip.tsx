import { useEffect, useState } from 'react';
import { COPY, Language, VENUE_DETAILS } from '../data/weddingData';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function getTimeRemaining(targetIso: string): CountdownState {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    completed: false,
  };
}

export function CountdownStrip({ lang }: { lang: Language }) {
  const [timeLeft, setTimeLeft] = useState<CountdownState>(() =>
    getTimeRemaining(VENUE_DETAILS.muhurthamIso)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeRemaining(VENUE_DETAILS.muhurthamIso));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      aria-label={COPY.countdown.muhurthamLabel[lang]}
      className="border-y border-[#DFD5C5] bg-[#F2ECE1]/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#DFD5C5]">
        <div className="lg:pr-8">
          <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
            {COPY.countdown.muhurthamLabel[lang]}
          </p>
          {timeLeft.completed ? (
            <p className="mt-2 font-editorial text-2xl font-medium text-[#9F2B42]">
              {COPY.countdown.celebrating[lang]}
            </p>
          ) : (
            <div className="mt-2.5 grid grid-cols-4 sm:flex sm:items-baseline gap-2 sm:gap-3 tabular-nums">
              <div className="bg-[#FAF7F2]/75 sm:bg-transparent rounded-lg py-2 px-1 sm:p-0 text-center sm:text-left border border-[#DFD5C5]/70 sm:border-0">
                <span className="block sm:inline font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1714] leading-none">
                  {pad(timeLeft.days)}
                </span>
                <span className="block sm:inline sm:ml-1 mt-1 sm:mt-0 text-[11px] sm:text-xs text-[#6E6056]">
                  {COPY.countdown.days[lang]}
                </span>
              </div>
              <span className="hidden sm:inline text-[#8C6629]" aria-hidden="true">·</span>
              <div className="bg-[#FAF7F2]/75 sm:bg-transparent rounded-lg py-2 px-1 sm:p-0 text-center sm:text-left border border-[#DFD5C5]/70 sm:border-0">
                <span className="block sm:inline font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1714] leading-none">
                  {pad(timeLeft.hours)}
                </span>
                <span className="block sm:inline sm:ml-1 mt-1 sm:mt-0 text-[11px] sm:text-xs text-[#6E6056]">
                  {COPY.countdown.hours[lang]}
                </span>
              </div>
              <span className="hidden sm:inline text-[#8C6629]" aria-hidden="true">·</span>
              <div className="bg-[#FAF7F2]/75 sm:bg-transparent rounded-lg py-2 px-1 sm:p-0 text-center sm:text-left border border-[#DFD5C5]/70 sm:border-0">
                <span className="block sm:inline font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1714] leading-none">
                  {pad(timeLeft.minutes)}
                </span>
                <span className="block sm:inline sm:ml-1 mt-1 sm:mt-0 text-[11px] sm:text-xs text-[#6E6056]">
                  {COPY.countdown.mins[lang]}
                </span>
              </div>
              <span className="hidden sm:inline text-[#8C6629]" aria-hidden="true">·</span>
              <div className="bg-[#FAF7F2]/75 sm:bg-transparent rounded-lg py-2 px-1 sm:p-0 text-center sm:text-left border border-[#DFD5C5]/70 sm:border-0">
                <span className="block sm:inline font-editorial text-2xl sm:text-3xl font-semibold text-[#9F2B42] leading-none">
                  {pad(timeLeft.seconds)}
                </span>
                <span className="block sm:inline sm:ml-1 mt-1 sm:mt-0 text-[11px] sm:text-xs text-[#6E6056]">
                  {COPY.countdown.secs[lang]}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 sm:pt-0 lg:px-8">
          <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
            {COPY.countdown.receptionLabel[lang]}
          </p>
          <p className="mt-1.5 sm:mt-2 font-editorial text-lg sm:text-xl font-medium text-[#1C1714] tabular-nums">
            {COPY.countdown.receptionValue[lang]}
          </p>
        </div>

        <div className="pt-4 sm:pt-0 lg:px-8">
          <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
            {COPY.countdown.muhurthamDateLabel[lang]}
          </p>
          <p className="mt-1.5 sm:mt-2 font-editorial text-lg sm:text-xl font-medium text-[#1C1714] tabular-nums">
            {COPY.countdown.muhurthamDateValue[lang]}
          </p>
        </div>

        <div className="pt-4 sm:pt-0 lg:pl-8">
          <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
            {COPY.countdown.lagnaLabel[lang]}
          </p>
          <p className="mt-1.5 sm:mt-2 font-editorial text-lg sm:text-xl font-medium text-[#1C1714]">
            {COPY.countdown.lagnaValue[lang]}
          </p>
        </div>
      </div>
    </section>
  );
}

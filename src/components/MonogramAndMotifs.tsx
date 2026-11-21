import { useState } from 'react';

export function CoupleMonogram({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CH Monogram"
    >
      <circle cx="48" cy="48" r="44" stroke="#B0812C" strokeWidth="1.2" strokeOpacity="0.65" />
      <circle cx="48" cy="48" r="39" stroke="#B0812C" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="2 2" />
      <path
        d="M52 28C41 25 28 33 27 46C26 59 37 68 49 65"
        stroke="#241610"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M44 37V66M65 37V66M44 51.5H65"
        stroke="#7A1C24"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 48C18 45 21 43 24 44M78 48C78 51 75 53 72 52"
        stroke="#B0812C"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GaneshaCrest({ className = 'w-16 h-16 sm:w-20 sm:h-20' }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`rounded-full border border-[#B0812C]/80 bg-[#F4EBDA] flex items-center justify-center text-[#7A1C24] font-kannada text-lg font-semibold ${className}`}
        aria-label="Sri Ganesha"
      >
        ಶ್ರೀ
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-[#B0812C]/80 bg-[#F4EBDA] shadow-xs ${className}`}
    >
      <img
        src="/src/assets/images/sri_ganesha_emblem_1795285964740.jpg"
        alt="Sri Ganesha temple gold emblem"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover scale-[1.42] object-[50%_54%]"
      />
    </div>
  );
}

export function MangalaKalasha({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Mango leaves */}
      <path
        d="M24 14C20 10 14 11 12 15C16 16 20 17 24 18C28 17 32 16 36 15C34 11 28 10 24 14Z"
        stroke="#7A1C24"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Coconut */}
      <path
        d="M19 16C19 11 29 11 29 16"
        stroke="#B0812C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M24 7V11" stroke="#B0812C" strokeWidth="1.3" strokeLinecap="round" />
      {/* Kalasha pot */}
      <path
        d="M17 20H31L29 24C33 26 35 31 33 36C31 40 27 41 24 41C21 41 17 40 15 36C13 31 15 26 19 24L17 20Z"
        stroke="#B0812C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M18 32H30" stroke="#7A1C24" strokeWidth="1.1" strokeOpacity="0.6" />
      <path d="M19 41H29" stroke="#B0812C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TempleLampIcon({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Flame */}
      <path
        d="M24 7C24 7 28 11.5 28 14.5C28 16.8 26.2 18.5 24 18.5C21.8 18.5 20 16.8 20 14.5C20 11.5 24 7 24 7Z"
        stroke="#7A1C24"
        strokeWidth="1.4"
        fill="#D4A037"
        fillOpacity="0.25"
      />
      {/* Oil Bowl */}
      <path
        d="M14 21H34L30 26H18L14 21Z"
        stroke="#B0812C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Pillar */}
      <path d="M24 26V38" stroke="#B0812C" strokeWidth="1.8" strokeLinecap="round" />
      {/* Base */}
      <path
        d="M16 41C18 38 30 38 32 41H16Z"
        stroke="#B0812C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToranaFrieze({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className="w-full h-6 sm:h-7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="2" x2="1200" y2="2" stroke="#B0812C" strokeWidth="1.5" strokeOpacity="0.55" />
        <line x1="0" y1="6" x2="1200" y2="6" stroke="#7A1C24" strokeWidth="0.8" strokeOpacity="0.35" />
        {Array.from({ length: 24 }).map((_, i) => {
          const x = i * 50 + 25;
          return (
            <g key={i}>
              <path
                d={`M${x - 22} 6 C${x - 10} 18, ${x + 10} 18, ${x + 22} 6`}
                stroke="#B0812C"
                strokeWidth="1.1"
                strokeOpacity="0.65"
              />
              {/* Mango leaf pendant */}
              <path
                d={`M${x} 13 C${x - 4} 18, ${x - 3} 25, ${x} 29 C${x + 3} 25, ${x + 4} 18, ${x} 13 Z`}
                fill="#7A1C24"
                fillOpacity="0.14"
                stroke="#7A1C24"
                strokeWidth="1"
                strokeOpacity="0.65"
              />
              {/* Marigold bead */}
              <circle cx={x - 25} cy="10" r="2.2" fill="#D4A037" fillOpacity="0.7" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ZariTempleBorder({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden py-1 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 18"
        preserveAspectRatio="none"
        className="w-full h-4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="3" x2="1200" y2="3" stroke="#B0812C" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="0" y1="15" x2="1200" y2="15" stroke="#B0812C" strokeWidth="1" strokeOpacity="0.5" />
        {Array.from({ length: 60 }).map((_, i) => {
          const x = i * 20 + 10;
          return (
            <polygon
              key={i}
              points={`${x},4 ${x + 5},9 ${x},14 ${x - 5},9`}
              stroke="#7A1C24"
              strokeOpacity="0.45"
              strokeWidth="0.9"
              fill="#D4A037"
              fillOpacity="0.18"
            />
          );
        })}
      </svg>
    </div>
  );
}

export function OrnamentalDivider({ className = 'my-6' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C59B3E]/70 to-[#C59B3E]" />
      <svg width="64" height="20" viewBox="0 0 64 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 2C34.5 6 37.5 8.5 42 10C37.5 11.5 34.5 14 32 18C29.5 14 26.5 11.5 22 10C26.5 8.5 29.5 6 32 2Z"
          stroke="#7A1C24"
          strokeWidth="1.2"
          fill="#FBF6EC"
        />
        <circle cx="32" cy="10" r="2" fill="#B0812C" />
        <circle cx="12" cy="10" r="1.8" fill="#B0812C" fillOpacity="0.7" />
        <circle cx="52" cy="10" r="1.8" fill="#B0812C" fillOpacity="0.7" />
        <path d="M2 10H8M56 10H62" stroke="#B0812C" strokeWidth="1" strokeOpacity="0.6" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C59B3E]/70 to-[#C59B3E]" />
    </div>
  );
}

export function PatrikaCorners() {
  return (
    <>
      <svg
        viewBox="0 0 36 36"
        className="pointer-events-none absolute top-2.5 left-2.5 w-7 h-7 text-[#B0812C]"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 24V2H24" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" />
        <path d="M6 18V6H18" stroke="#7A1C24" strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="6" cy="6" r="1.8" fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 36 36"
        className="pointer-events-none absolute top-2.5 right-2.5 w-7 h-7 text-[#B0812C] rotate-90"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 24V2H24" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" />
        <path d="M6 18V6H18" stroke="#7A1C24" strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="6" cy="6" r="1.8" fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 36 36"
        className="pointer-events-none absolute bottom-2.5 left-2.5 w-7 h-7 text-[#B0812C] -rotate-90"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 24V2H24" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" />
        <path d="M6 18V6H18" stroke="#7A1C24" strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="6" cy="6" r="1.8" fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 36 36"
        className="pointer-events-none absolute bottom-2.5 right-2.5 w-7 h-7 text-[#B0812C] rotate-180"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 24V2H24" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" />
        <path d="M6 18V6H18" stroke="#7A1C24" strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="6" cy="6" r="1.8" fill="currentColor" />
      </svg>
    </>
  );
}

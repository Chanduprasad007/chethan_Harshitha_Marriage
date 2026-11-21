export function CoupleMonogram({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CH Monogram"
    >
      <circle cx="48" cy="48" r="44" stroke="#8C6629" strokeWidth="1" strokeOpacity="0.45" />
      <circle cx="48" cy="48" r="39" stroke="#8C6629" strokeWidth="0.6" strokeOpacity="0.25" />
      <path
        d="M52 28C41 25 28 33 27 46C26 59 37 68 49 65"
        stroke="#1C1714"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M44 37V66M65 37V66M44 51.5H65"
        stroke="#9F2B42"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 48C20 45 23 43 26 44M76 48C76 51 73 53 70 52"
        stroke="#8C6629"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OrnamentalDivider({ className = 'my-6' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-[#DFD5C5]" />
      <svg width="42" height="16" viewBox="0 0 42 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 2C23.2 5.2 25.5 7 29 8C25.5 9 23.2 10.8 21 14C18.8 10.8 16.5 9 13 8C16.5 7 18.8 5.2 21 2Z"
          stroke="#8C6629"
          strokeWidth="1.1"
          fill="#FAF7F2"
        />
        <circle cx="5" cy="8" r="1.5" fill="#8C6629" fillOpacity="0.6" />
        <circle cx="37" cy="8" r="1.5" fill="#8C6629" fillOpacity="0.6" />
      </svg>
      <div className="h-px flex-1 bg-[#DFD5C5]" />
    </div>
  );
}

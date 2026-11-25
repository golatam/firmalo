export function ToolIcon({ paths, size = 18 }: { paths: string[]; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function Chevron({ className = "", size = 14, dir = "down" }: { className?: string; size?: number; dir?: "down" | "right" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={dir === "down" ? "m6 9 6 6 6-6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect width="30" height="30" rx="8" fill="#2563eb" />
      <path d="M6 21c3-9 5-11 6-7s2 4 4-1 3-2 4 1" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 24.5h18" stroke="#93c5fd" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

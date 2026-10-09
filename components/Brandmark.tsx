/**
 * Ottomate brandmark — an "O" (closed loop) with a signal-orange arc and node
 * running around it: a workflow that keeps going on its own.
 * The ring uses currentColor so it follows the surrounding ink colour.
 */
export function Brandmark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="20"
        cy="20"
        r="13.5"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        d="M8.31 13.75 A 13.5 13.5 0 0 1 31.69 13.75"
        stroke="var(--color-accent)"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <circle cx="31.69" cy="13.75" r="3.4" fill="var(--color-accent)" />
    </svg>
  );
}

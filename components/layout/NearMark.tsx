export default function NearMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M50 90 C50 90 22 54 22 34 C22 16.3 34.3 4 50 4 C65.7 4 78 16.3 78 34 C78 54 50 90 50 90 Z"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="34" r="10" fill="currentColor" />
    </svg>
  );
}

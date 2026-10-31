export default function MascotPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#AEE0F5] via-[#CFF5C2] to-[#7FB8E8] ${className}`}
    >
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse cx="150" cy="190" rx="16" ry="32" fill="#113B6B" />
        <ellipse cx="250" cy="190" rx="16" ry="32" fill="#113B6B" />
        <path
          d="M140 255 Q200 295 260 255"
          stroke="#113B6B"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
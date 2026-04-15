export function DiamondDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`divider-motif ${className}`}>
      <div className="flex-1 h-px bg-bone2" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="7"
          width="8.485"
          height="8.485"
          rx="0.5"
          transform="rotate(-45 1 7)"
          stroke="#8C4A30"
          strokeWidth="0.8"
        />
        <rect
          x="3.5"
          y="7"
          width="4.95"
          height="4.95"
          transform="rotate(-45 3.5 7)"
          fill="#8C4A30"
          fillOpacity="0.2"
        />
      </svg>
      <div className="flex-1 h-px bg-bone2" />
    </div>
  )
}

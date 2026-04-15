export function MotifBackground({ className = '' }: { className?: string }) {
  // A subtle Tifinagh-inspired geometric repeating pattern
  return (
    <svg 
      className={`absolute inset-0 w-full h-full opacity-5 pointer-events-none ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="tifinagh-motif" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M20 0 L40 20 L20 40 L0 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M10 20 L30 20 M20 10 L20 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tifinagh-motif)" />
    </svg>
  )
}

import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function EggIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 32 40" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
      className={cn("fill-current", props.className)}
    >
      <defs>
        <linearGradient id="egg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      <path
        d="M16 40C24.837 40 32 31.046 32 20S24.837 0 16 0 0 8.954 0 20 7.163 40 16 40z"
        fill="hsl(var(--card))"
      />
      <path
        d="M16 40C24.837 40 32 31.046 32 20S24.837 0 16 0 0 8.954 0 20 7.163 40 16 40z"
        fill="url(#egg-gradient)"
      />
       {/* Zig-zag pattern */}
      <path d="M0 18 L8 22 L16 18 L24 22 L32 18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />

      {/* Wavy line pattern */}
      <path d="M0 28 Q 8 24, 16 28 T 32 28" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      
      {/* Dots */}
      <circle cx="8" cy="12" r="2" fill="hsl(var(--primary))" />
      <circle cx="24" cy="12" r="2" fill="hsl(var(--primary))" />
      <circle cx="16" cy="34" r="2.5" fill="hsl(var(--accent))" />
    </svg>
  );
}

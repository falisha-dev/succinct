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
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M16 40C24.837 40 32 31.046 32 20S24.837 0 16 0 0 8.954 0 20 7.163 40 16 40z"
        fill="url(#egg-gradient)"
      />
    </svg>
  );
}

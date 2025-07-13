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
      <path
        d="M16 40C24.837 40 32 31.046 32 20S24.837 0 16 0 0 8.954 0 20 7.163 40 16 40z"
      />
    </svg>
  );
}

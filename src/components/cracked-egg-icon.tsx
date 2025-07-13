import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function CrackedEggIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 42 42" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("fill-current", props.className)}
    >
      <g transform="translate(5 1)">
        <path d="M16.11,18.25l-1.63-1.3,1.38-2.76L15.2,15.4l-2.12-1.22L11.87,16.3l-1.4-1.4L9.25,16.3,7.48,14.52,6.26,16.3,4.48,15.08l-1.22,2.12L0,14.29C0,7.5,7.16,0,16,0S32,7.5,32,14.29c0,1.07-.12,2.11-.35,3.12l-1.77.88-2.76-1.38-1.21,1.62-2.76-1.38-1.21,1.62-1.63-1.3Z" transform="translate(0 -2)" />
        <path d="M1.05,22.18l1.22-2.12,1.78,1.22L6.26,19.5,7.48,21.28l1.77-1.78,1.22,1.4,1.22-2.12,1.21,1.21,2.12-1.21,1.21,2.12,1.63-1.3,1.21,1.62,2.76-1.38,1.21,1.62,2.76-1.38,1.77.88c.23,1,.35,2.06.35,3.12,0,10.5-7.16,19-16,19S0,33.19,0,22.69c0-.2,0-.39.05-.59Z" transform="translate(0 4)" />
      </g>
    </svg>
  );
}

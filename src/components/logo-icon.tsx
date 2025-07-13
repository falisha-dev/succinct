import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("fill-current", props.className)}
    >
      <path
        d="M25 50 L50 37.5 L75 50 L50 62.5 Z M25 50 L50 62.5 L50 87.5 L25 75 Z M75 50 L50 62.5 L50 87.5 L75 75 Z"
        className="text-primary"
      />
      <path
        d="M25 50 L50 37.5 L50 12.5 L25 25 Z M75 50 L50 37.5 L50 12.5 L75 25 Z"
        className="text-accent"
      />
    </svg>
  );
}

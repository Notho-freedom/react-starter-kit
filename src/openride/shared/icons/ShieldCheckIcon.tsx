import type { SVGProps } from "react";

export function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2.6 18.5 5a1 1 0 0 1 .65.94v4.98c0 4.2-2.7 7.99-6.71 9.41a1.32 1.32 0 0 1-.88 0C7.55 18.9 4.85 15.12 4.85 10.92V5.94A1 1 0 0 1 5.5 5L12 2.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9.1 11.7 2 2 4-4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

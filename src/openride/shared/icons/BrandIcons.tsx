import type { SVGProps } from "react";

type BrandIconProps = SVGProps<SVGSVGElement>;

export function GoogleIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21.8 12.23c0-.73-.06-1.43-.2-2.09H12v3.96h5.49a4.7 4.7 0 0 1-2.04 3.08v2.55h3.3c1.93-1.78 3.05-4.4 3.05-7.5Z"
        fill="currentColor"
      />
      <path
        d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.3-2.55c-.92.62-2.08 1-3.47 1-2.67 0-4.93-1.8-5.74-4.22H2.84v2.63A10 10 0 0 0 12 22Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M6.26 13.76A5.97 5.97 0 0 1 5.94 12c0-.61.11-1.2.32-1.76V7.61H2.84A10 10 0 0 0 2 12c0 1.58.38 3.08 1.05 4.39l3.21-2.63Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M12 5.98c1.5 0 2.84.52 3.9 1.54l2.92-2.91C17.07 2.97 14.75 2 12 2A10 10 0 0 0 2.84 7.61l3.42 2.63c.8-2.42 3.07-4.26 5.74-4.26Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}

export function FacebookIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8.19h2.78l.42-3.23H13.5V8.51c0-.94.27-1.57 1.62-1.57H16.8V4.05c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.5-4.18 4.28v2.38H7.2v3.23h2.92V22h3.38Z" />
    </svg>
  );
}

export function PaypalIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.32 20H4.46a.46.46 0 0 1-.45-.54l2.57-15.9A.68.68 0 0 1 7.25 3h6.43c2.23 0 3.85.48 4.82 1.43.8.8 1.14 1.88 1 3.23-.2 2.3-1.6 3.8-4.2 4.5-.12.03-.2.14-.22.26l-.06.43c-.52 3.37-2.31 5.05-5.37 5.05H8.8a.5.5 0 0 0-.49.42L7.32 20Z" />
      <path d="M9.2 9.9h2.1c1.9 0 2.85-.7 3.05-2.28.05-.5-.03-.88-.25-1.13-.3-.35-.9-.53-1.8-.53H9.92L9.2 9.9Z" opacity="0.72" />
    </svg>
  );
}

export function VisaIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 48 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.2 13.7h-3l1.9-11.3h3l-1.9 11.3Zm12.5-11.1a7.4 7.4 0 0 0-2.7-.5c-3 0-5 1.5-5 3.7 0 1.6 1.5 2.5 2.6 3 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-2 1.2-1.3 0-2-.2-3-.7l-.4-.2-.4 2.5c.8.3 2.1.6 3.5.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.3-2.5-3-1-.5-1.7-.8-1.7-1.4 0-.4.5-.9 1.6-.9.9 0 1.6.2 2.1.4l.2.1.4-2.5Zm4.1 7.1 1.2-3.3.7 3.3h-1.9Zm3.6 4h2.8L38.7 2.4h-2.6c-.6 0-1 .2-1.3.8l-4.4 10.5h3.1l.6-1.7H38l.3 1.7Zm-24.2-11.3L11.3 10l-.3-1.5c-.5-1.5-2-3-3.6-3.7l2.6 8.9h3.1l4.7-11.3h-3.2Z" />
      <path d="M9.2 2.4H4.5l-.1.2c3.6.9 5.9 3.2 6.9 5.9L10.3 3c-.2-.5-.6-.6-1.1-.6Z" opacity="0.7" />
    </svg>
  );
}

export function MastercardIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 16" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="5.5" opacity="0.85" />
      <circle cx="16" cy="8" r="5.5" opacity="0.55" />
      <path d="M12 3.2a5.4 5.4 0 0 1 0 9.6 5.4 5.4 0 0 1 0-9.6Z" />
    </svg>
  );
}

import type { SVGProps } from "react";

/**
 * Inline line icons, drawn from the Lucide set (ISC license) so the page ships
 * no icon package. Every icon is decorative: the text beside it carries the
 * meaning, so they are hidden from screen readers.
 */
function Icon({ strokeWidth = 2, className = "h-5 w-5", children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

type P = SVGProps<SVGSVGElement>;

export const CheckIcon = (p: P) => (
  <Icon strokeWidth={3} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const PhoneMissedIcon = (p: P) => (
  <Icon {...p}>
    <path d="m16 2 6 6M22 2l-6 6" />
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

export const EyeOffIcon = (p: P) => (
  <Icon {...p}>
    <path d="M10.73 5.08a10.74 10.74 0 0 1 11.2 6.57 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-1.44 2.49" />
    <path d="M14.08 14.16a3 3 0 0 1-4.24-4.24" />
    <path d="M17.48 17.5a10.75 10.75 0 0 1-15.42-5.15 1 1 0 0 1 0-.7 10.75 10.75 0 0 1 4.45-5.14" />
    <path d="m2 2 20 20" />
  </Icon>
);

export const CalendarXIcon = (p: P) => (
  <Icon {...p}>
    <path d="M8 2v4M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18M14 14l-4 4M10 14l4 4" />
  </Icon>
);

export const SparklesIcon = (p: P) => (
  <Icon {...p}>
    <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" />
    <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
  </Icon>
);

export const MailIcon = (p: P) => (
  <Icon strokeWidth={1.8} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </Icon>
);

export const CalendarIcon = (p: P) => (
  <Icon strokeWidth={1.8} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 11h18" />
  </Icon>
);

export const PlusIcon = (p: P) => (
  <Icon strokeWidth={2.5} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const ArrowRightIcon = (p: P) => (
  <Icon strokeWidth={2.5} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

/** Button spinner. Motion is reduced to a static ring by the global rule. */
export const SpinnerIcon = ({ className = "h-4 w-4", ...p }: P) => (
  <Icon strokeWidth={3} className={`${className} animate-spin`} {...p}>
    <path d="M21 12a9 9 0 1 1-6.22-8.56" />
  </Icon>
);

export const SearchIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);

export const MegaphoneIcon = (p: P) => (
  <Icon {...p}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </Icon>
);

export const UserPlusIcon = (p: P) => (
  <Icon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6M22 11h-6" />
  </Icon>
);

export const GlobeIcon = (p: P) => (
  <Icon strokeWidth={1.8} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
  </Icon>
);

export const LinkedInIcon = (p: P) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

export const InstagramIcon = (p: P) => (
  <Icon strokeWidth={1.8} {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
  </Icon>
);

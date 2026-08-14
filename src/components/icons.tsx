import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// One consistent thin-stroke line-icon language, used everywhere in place
// of emoji. Every icon shares the same viewBox, stroke weight, and corner
// treatment so the set reads as a single system.

export function IconPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s-7-6.7-7-11.5A7 7 0 0 1 19 9.5C19 14.3 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Icon>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3.5h2.8l1.4 4-2 1.6a12.4 12.4 0 0 0 5.7 5.7l1.6-2 4 1.4V17a2 2 0 0 1-2.1 2A16.4 16.4 0 0 1 4 4.6 2 2 0 0 1 6 3.5z" />
    </Icon>
  );
}

export function IconMessage(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4.5" width="18" height="12.5" rx="3" />
      <path d="M8 17v3l3.5-3" />
    </Icon>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </Icon>
  );
}

export function IconWrench(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.5 5.5a4.2 4.2 0 0 0-5.6 5.2L3.5 16l4 4 5.4-5.3a4.2 4.2 0 0 0 5.2-5.6l-2.6 2.6-2.8-2.8 2.8-2.6z" />
    </Icon>
  );
}

export function IconVan(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 16.5V9.8a1 1 0 0 1 1-1h8.3l4 3.7H20a1 1 0 0 1 1 1v3H3z" />
      <circle cx="7.5" cy="17.3" r="1.7" />
      <circle cx="17" cy="17.3" r="1.7" />
    </Icon>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 13l4 4L19 7" />
    </Icon>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Icon>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 1.9" />
    </Icon>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.2l7 2.8v5.4c0 5-3.2 7.7-7 9.4-3.8-1.7-7-4.4-7-9.4V6l7-2.8z" />
    </Icon>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 19c8.5 0 14.5-6.3 14.5-14.5C11 4.5 5 10.5 5 19z" />
      <path d="M5 19c0-5.2 3-9.3 8-11.3" />
    </Icon>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 6l-6 6 6 6" />
    </Icon>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8.2h3.2L8.7 6h6.6l1.5 2.2H20a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.2a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13.8" r="3.4" />
    </Icon>
  );
}

// Brand mark — a six-spoke wheel motif, used in place of an emoji badge.
// Spokes sit at true 60° intervals (computed, not eyeballed) around a
// shared center so the mark reads as one deliberate object at small
// sizes: M12 3.2 is 12 o'clock, then every 60° clockwise around r=8.8.
export function IconMark(props: IconProps) {
  return (
    <Icon {...props} strokeWidth={1.3}>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 3.2 12 20.8M19.62 7.6 4.38 16.4M19.62 16.4 4.38 7.6" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </Icon>
  );
}

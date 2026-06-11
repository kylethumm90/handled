/** 16px stroke icons from the design's sidebar/tab bar. */

const base = { width: 16, height: 16, viewBox: '0 0 16 16' };

export function DashIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="1.5" y="1.5" width="5.2" height="5.2" rx="1.2" />
      <rect x="9.3" y="1.5" width="5.2" height="5.2" rx="1.2" />
      <rect x="1.5" y="9.3" width="5.2" height="5.2" rx="1.2" />
      <rect x="9.3" y="9.3" width="5.2" height="5.2" rx="1.2" />
    </svg>
  );
}

export function LeadsIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <line x1="2" y1="3.5" x2="14" y2="3.5" />
      <line x1="2" y1="8" x2="11" y2="8" />
      <line x1="2" y1="12.5" x2="13" y2="12.5" />
    </svg>
  );
}

export function CalIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <rect x="1.5" y="2.8" width="13" height="11.5" rx="2" />
      <line x1="1.5" y1="6.6" x2="14.5" y2="6.6" />
      <line x1="5" y1="1.2" x2="5" y2="4" />
      <line x1="11" y1="1.2" x2="11" y2="4" />
    </svg>
  );
}

export function RepIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round">
      <polygon points="8,1.5 9.9,5.6 14.5,6.1 11.1,9.3 12,13.8 8,11.5 4,13.8 4.9,9.3 1.5,6.1 6.1,5.6" />
    </svg>
  );
}

export function RefsIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="3.5" cy="8" r="2" />
      <circle cx="12.5" cy="3.5" r="2" />
      <circle cx="12.5" cy="12.5" r="2" />
      <line x1="5.3" y1="7.1" x2="10.7" y2="4.4" />
      <line x1="5.3" y1="8.9" x2="10.7" y2="11.6" />
    </svg>
  );
}

export function InsightsIcon() {
  return (
    <svg {...base} fill="currentColor">
      <rect x="2" y="9" width="3" height="5" rx="0.8" />
      <rect x="6.5" y="5" width="3" height="9" rx="0.8" />
      <rect x="11" y="1.5" width="3" height="12.5" rx="0.8" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="8" cy="8" r="5.8" />
      <circle cx="8" cy="8" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MoreIcon() {
  return (
    <svg {...base} fill="currentColor">
      <circle cx="3" cy="8" r="1.4" />
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="13" cy="8" r="1.4" />
    </svg>
  );
}

export function MicIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="var(--amber-ink)" strokeWidth={1.6} strokeLinecap="round">
      <rect x="5.8" y="1.5" width="4.4" height="8" rx="2.2" />
      <line x1="8" y1="11.8" x2="8" y2="14" />
      <line x1="5" y1="14" x2="11" y2="14" />
    </svg>
  );
}

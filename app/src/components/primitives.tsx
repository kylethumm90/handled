import type { ReactNode } from 'react';
import { AGENTS } from '../data/sample';
import type { AgentId, AmbassadorTier, LeadSource, LeadStatus } from '../data/types';

export function AgentChip({ agent, size = 22 }: { agent: AgentId; size?: number }) {
  const a = AGENTS[agent];
  return (
    <span
      className="agent-chip"
      title={a.name}
      style={{
        width: size,
        height: size,
        background: a.color,
        fontSize: Math.max(9, Math.round(size * 0.48)),
      }}
    >
      {a.name[0]}
    </span>
  );
}

const STATUS_COLORS: Record<LeadStatus, [string, string]> = {
  New: ['#e9f1fa', '#2f6bab'],
  Contacted: ['#f0efea', '#6f6a60'],
  Quoted: ['#fdf1d8', '#92600a'],
  Booked: ['#e3eaf4', '#1e3a5f'],
  Won: ['#e9f3ee', '#2f6b4f'],
  Lost: ['#f5ecea', '#9a4b40'],
};

export function StatusPill({ status }: { status: LeadStatus }) {
  const [bg, fg] = STATUS_COLORS[status];
  return <span className="pill" style={{ background: bg, color: fg }}>{status}</span>;
}

const TIER_COLORS: Record<AmbassadorTier, [string, string]> = {
  MVP: ['#fdf1d8', '#92600a'],
  Pro: ['#e3eaf4', '#1e3a5f'],
  Rookie: ['#f0efea', '#6f6a60'],
};

export function TierPill({ tier }: { tier: AmbassadorTier }) {
  const [bg, fg] = TIER_COLORS[tier];
  return <span className="pill" style={{ background: bg, color: fg, fontSize: 11.5, fontWeight: 700, padding: '2px 9px' }}>{tier}</span>;
}

export function SourceTag({ source }: { source: LeadSource }) {
  return <span className={'source-tag' + (source === 'Referral' ? ' referral' : '')}>{source}</span>;
}

export function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={'toggle' + (on ? ' on' : '')}
      onClick={onToggle}
    >
      <span className="toggle-knob" />
    </button>
  );
}

export function Checkbox({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label?: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className={'checkbox' + (checked ? ' checked' : '')}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      {checked ? '✓' : ''}
    </button>
  );
}

export function DoneNote({ children }: { children: ReactNode }) {
  return (
    <div className="done-note">
      <span className="done-check">✓</span>
      {children}
    </div>
  );
}

export function ScoutCard({ title, children, link }: { title: string; children: ReactNode; link?: string }) {
  return (
    <div className="scout-card">
      <div className="scout-card-head">
        <AgentChip agent="scout" />
        <span className="scout-card-label">{title}</span>
      </div>
      <div className="scout-card-body">{children}</div>
      {link && <div className="scout-card-link">{link} →</div>}
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="review-stars">
      {'★'.repeat(n)}
      {n < 5 && <span className="off">{'★'.repeat(5 - n)}</span>}
    </span>
  );
}

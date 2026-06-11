import { useState, type ReactNode } from 'react';
import { ACCOUNT } from '../data/sample';
import { AgentChip } from '../components/primitives';
import {
  CalIcon, DashIcon, InsightsIcon, LeadsIcon, MicIcon, MoreIcon, RefsIcon, RepIcon, SettingsIcon,
} from './icons';

export type Screen = 'dash' | 'leads' | 'detail' | 'cal' | 'rep' | 'refs';

interface NavDef {
  id: Screen | 'ins' | 'set';
  label: string;
  icon: ReactNode;
  trailing?: ReactNode;
  /** Screens that highlight this item (detail highlights Leads). */
  matches: Screen[];
  enabled: boolean;
}

interface Props {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  newLeadCount: number;
  micOn: boolean;
  onMic: () => void;
  showMic: boolean;
  children: ReactNode;
}

export function AppShell({ screen, onNavigate, newLeadCount, micOn, onMic, showMic, children }: Props) {
  const [moreOpen, setMoreOpen] = useState(false);

  const nav: NavDef[] = [
    { id: 'dash', label: 'Dashboard', icon: <DashIcon />, matches: ['dash'], enabled: true },
    {
      id: 'leads', label: 'Leads', icon: <LeadsIcon />, matches: ['leads', 'detail'], enabled: true,
      trailing: newLeadCount > 0 ? <span className="nav-badge">{newLeadCount}</span> : undefined,
    },
    { id: 'cal', label: 'Calendar', icon: <CalIcon />, matches: ['cal'], enabled: true },
    { id: 'rep', label: 'Reputation', icon: <RepIcon />, matches: ['rep'], enabled: true, trailing: <span className="nav-trailing-chip"><AgentChip agent="stella" size={16} /></span> },
    { id: 'refs', label: 'Referrals', icon: <RefsIcon />, matches: ['refs'], enabled: true, trailing: <span className="nav-trailing-chip"><AgentChip agent="stella" size={16} /></span> },
    { id: 'ins', label: 'Insights', icon: <InsightsIcon />, matches: [], enabled: false, trailing: <span className="nav-trailing-chip"><AgentChip agent="scout" size={16} /></span> },
    { id: 'set', label: 'Settings', icon: <SettingsIcon />, matches: [], enabled: false },
  ];

  const go = (s: Screen) => {
    setMoreOpen(false);
    onNavigate(s);
  };

  const tab = (id: Screen, label: string, icon: ReactNode, matches: Screen[]) => (
    <button className={'bottom-tab' + (matches.includes(screen) ? ' active' : '')} onClick={() => go(id)}>
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-logo">handled<span>.</span></div>
        {nav.map((n) => (
          <button
            key={n.id}
            className={'nav-item' + (n.matches.includes(screen) ? ' active' : '') + (n.enabled ? '' : ' idle')}
            onClick={n.enabled ? () => go(n.id as Screen) : undefined}
          >
            {n.icon}
            {n.label}
            {n.trailing}
          </button>
        ))}
        <div className="sidebar-spacer" />
        <div className="sidebar-account">
          <div className="sidebar-avatar">{ACCOUNT.initials}</div>
          <div style={{ minWidth: 0 }}>
            <div className="sidebar-account-name">{ACCOUNT.owner}</div>
            <div className="sidebar-account-biz">{ACCOUNT.business}</div>
          </div>
        </div>
      </aside>

      <main className="main">{children}</main>

      {showMic && (
        <>
          {micOn && <div className="mic-hint">Listening… tap to stop. Ava files it as a voice note on the right lead.</div>}
          <button className={'mic-fab' + (micOn ? ' recording' : '')} onClick={onMic} aria-label={micOn ? 'Stop voice note' : 'Record voice note'}>
            {micOn
              ? <span style={{ width: 14, height: 14, borderRadius: 3, background: '#fff', display: 'block' }} />
              : <MicIcon />}
          </button>
        </>
      )}

      <nav className="bottom-tabs">
        {tab('dash', 'Home', <DashIcon />, ['dash'])}
        {tab('leads', 'Leads', <LeadsIcon />, ['leads', 'detail'])}
        {tab('cal', 'Calendar', <CalIcon />, ['cal'])}
        <button className={'bottom-tab' + (['rep', 'refs'].includes(screen) ? ' active' : '')} onClick={() => setMoreOpen(true)}>
          <MoreIcon />
          <span>More</span>
        </button>
      </nav>

      {moreOpen && (
        <>
          <div className="more-sheet-backdrop" onClick={() => setMoreOpen(false)} />
          <div className="more-sheet">
            <button className="more-sheet-item" onClick={() => go('rep')}><RepIcon /> Reputation</button>
            <button className="more-sheet-item" onClick={() => go('refs')}><RefsIcon /> Referrals</button>
            <button className="more-sheet-item" style={{ opacity: 0.5, cursor: 'default' }}><InsightsIcon /> Insights</button>
            <button className="more-sheet-item" style={{ opacity: 0.5, cursor: 'default' }}><SettingsIcon /> Settings</button>
          </div>
        </>
      )}
    </div>
  );
}

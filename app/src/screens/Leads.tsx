import { useMemo, useState } from 'react';
import { LEADS } from '../data/sample';
import type { LeadStatus } from '../data/types';
import { AgentChip, Checkbox, SourceTag, StatusPill } from '../components/primitives';

const STATUSES: ('All' | LeadStatus)[] = ['All', 'New', 'Contacted', 'Quoted', 'Booked', 'Won', 'Lost'];

interface Props {
  onOpenLead: (id: string) => void;
}

export function Leads({ onOpenLead }: Props) {
  const [filter, setFilter] = useState<'All' | LeadStatus>('All');
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const q = search.trim().toLowerCase();
  const filtered = useMemo(
    () => LEADS.filter(
      (l) => (filter === 'All' || l.status === filter)
        && (!q || (l.name + ' ' + l.job + ' ' + l.loc).toLowerCase().includes(q)),
    ),
    [filter, q],
  );
  const selCount = Object.values(checked).filter(Boolean).length;
  const toggleCheck = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  const filterPills = (
    <div className="filter-row">
      {STATUSES.map((st) => (
        <button key={st} className={'filter-pill' + (filter === st ? ' active' : '')} onClick={() => setFilter(st)}>
          {st} <span className="count">{st === 'All' ? LEADS.length : LEADS.filter((l) => l.status === st).length}</span>
        </button>
      ))}
    </div>
  );

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <h1 className="page-title">Leads</h1>
          <span className="section-meta">{LEADS.length} this month</span>
        </div>
        <div className="desktop-only">
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost">Import CSV</button>
            <button className="btn btn-navy">+ New lead</button>
          </div>
        </div>
      </div>

      {/* desktop: search + filters + table */}
      <div className="desktop-only">
        <div className="leads-toolbar">
          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or job…"
            aria-label="Search leads"
          />
          {filterPills}
        </div>

        {selCount > 0 && (
          <div className="bulk-bar">
            <span className="bulk-count">{selCount} selected</span>
            <button className="btn btn-navy btn-sm">Text all</button>
            <button className="btn btn-ghost btn-sm">Export</button>
            <button className="bulk-clear" onClick={() => setChecked({})}>Clear</button>
          </div>
        )}

        <div className="card leads-table-wrap" style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <div className="leads-table">
            <div className="leads-head">
              <span /><span>Lead</span><span>Job</span><span>Source</span><span>Status</span><span>Value</span><span>Last activity</span>
            </div>
            {filtered.map((l) => (
              <div key={l.id} className="lead-row" onClick={() => onOpenLead(l.id)}>
                <span><Checkbox checked={!!checked[l.id]} onToggle={() => toggleCheck(l.id)} label={'Select ' + l.name} /></span>
                <div style={{ minWidth: 0, paddingRight: 12 }}>
                  <div className="lead-name">{l.name}</div>
                  <div className="lead-loc">{l.loc}</div>
                </div>
                <div style={{ minWidth: 0, paddingRight: 16 }}>
                  <div className="lead-job">{l.job}</div>
                  <div className="lead-summary-row">
                    <AgentChip agent="ava" size={14} />
                    <span className="lead-summary">{l.summary}</span>
                  </div>
                </div>
                <span><SourceTag source={l.source} /></span>
                <span><StatusPill status={l.status} /></span>
                <span className="lead-value">{l.value}</span>
                <span style={{ minWidth: 0 }}>
                  <span className="lead-activity">{l.activity}</span>
                  <span className="row-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn btn-ghost btn-sm">Call</button>
                    <button className="btn btn-ghost btn-sm">Text</button>
                    <button className="btn btn-navy btn-sm" onClick={() => onOpenLead(l.id)}>Book</button>
                  </span>
                </span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="leads-empty">
                No leads match. <button onClick={() => { setFilter('All'); setSearch(''); }}>Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile: filter pills + cards */}
      <div className="mobile-only">
        <div style={{ marginBottom: 14 }}>{filterPills}</div>
        <div className="lead-cards">
          {filtered.map((l) => (
            <div key={l.id} className="lead-card" onClick={() => onOpenLead(l.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, flex: 1, lineHeight: 1.3 }}>{l.name}</span>
                <StatusPill status={l.status} />
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.45, marginTop: 2 }}>{l.job} · {l.loc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
                <SourceTag source={l.source} />
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{l.value}</span>
                <span style={{ fontSize: 12, color: 'var(--faintest)', marginLeft: 'auto' }}>{l.activity}</span>
              </div>
              <div className="lead-card-actions" onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-ghost" style={{ padding: '11px 0', fontSize: 13.5, borderRadius: 10 }}>Call</button>
                <button className="btn btn-navy" style={{ padding: '11px 0', fontSize: 13.5, borderRadius: 10 }}>Text</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="lead-cards-empty">No leads match this filter.</div>}
        </div>
      </div>
    </section>
  );
}

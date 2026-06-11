import { useState } from 'react';
import { CALENDAR, TODAY_INDEX } from '../data/sample';
import { AgentChip } from '../components/primitives';

export function Calendar() {
  const [dayIdx, setDayIdx] = useState(TODAY_INDEX);
  const day = CALENDAR[dayIdx];

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h1 className="page-title">Calendar</h1>
        <span className="section-meta">June 2026</span>
      </div>

      <div className="cal-days">
        {CALENDAR.map((d, i) => (
          <button key={d.d} className={'cal-cell' + (i === dayIdx ? ' selected' : '')} onClick={() => setDayIdx(i)}>
            <span className="week-cell-day">{d.d}</span>
            <span className="cal-cell-num">{d.n}</span>
            <span className="week-dot" style={{ opacity: d.hasJobs ? 1 : 0, background: i === TODAY_INDEX ? 'var(--amber)' : undefined }} />
          </button>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 9 }}>{day.label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxWidth: 720 }}>
        {day.items.map((slot) => (
          <div key={slot.t + slot.title} className="cal-item">
            <span className={'cal-time' + (slot.done ? ' done' : '')}>{slot.t}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                {slot.hasAgent && <AgentChip agent="ava" size={16} />}
                <span className={'cal-title' + (slot.done ? ' done' : '')}>{slot.title}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--faint)', lineHeight: 1.4, marginTop: 2 }}>{slot.sub}</div>
            </div>
            {slot.done && <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)', flex: 'none', paddingTop: 2 }}>✓</span>}
          </div>
        ))}
        {day.items.length === 0 && (
          <div className="cal-empty">Nothing booked. Ava keeps this day open for new jobs.</div>
        )}
      </div>
    </section>
  );
}

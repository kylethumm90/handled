import { ACCOUNT, CALENDAR, JOBS, PRIORITIES, SCOUT_TEXT, STATS, TODAY_INDEX } from '../data/sample';
import { AGENTS } from '../data/sample';
import { AgentChip, DoneNote, ScoutCard } from '../components/primitives';

const TONE_COLOR = { success: 'var(--success)', warn: 'var(--warn)', muted: 'var(--muted)' } as const;

interface Props {
  done: Record<string, boolean>;
  dismissed: Record<string, boolean>;
  onDone: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function Dashboard({ done, dismissed, onDone, onDismiss }: Props) {
  const priorities = PRIORITIES.filter((p) => !dismissed[p.id]);
  const openCount = priorities.filter((p) => !done[p.id]).length;

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 className="page-title">{ACCOUNT.greeting}</h1>
          <div className="page-sub">{ACCOUNT.dateline}</div>
        </div>
      </div>

      <div className="stat-grid">
        {STATS.map((st) => (
          <div key={st.label} className="card card-pad stat-card">
            <div className="overline">{st.label}</div>
            <div className="stat-value">{st.value}</div>
            <div className="stat-delta" style={{ color: TONE_COLOR[st.tone] }}>{st.delta}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <h2 className="section-title">Today's Priorities</h2>
            <span className="section-meta">{openCount} open · ranked by Ava</span>
          </div>
          <div className="prio-list">
            {priorities.map((p) => (
              <div key={p.id} className="card prio-card">
                <AgentChip agent={p.agent} size={24} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                    <span className="prio-title">{p.title}</span>
                    <span className="prio-agent">{AGENTS[p.agent].name}</span>
                  </div>
                  <div className="prio-body">{p.body}</div>
                  {done[p.id] ? (
                    <div style={{ marginTop: 12 }}><DoneNote>{p.doneText}</DoneNote></div>
                  ) : (
                    <div className="prio-actions">
                      <button className={'btn ' + (p.attention ? 'btn-amber' : 'btn-navy')} onClick={() => onDone(p.id)}>{p.primary}</button>
                      <button className="btn btn-ghost" onClick={() => onDismiss(p.id)}>{p.secondary}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {priorities.length === 0 && (
              <div className="prio-empty">All clear. Ava will surface the next thing that needs you.</div>
            )}
          </div>
        </div>

        <div className="dash-rail">
          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 10 }}>This week</div>
            <div className="week-strip">
              {CALENDAR.map((day, i) => (
                <div key={day.d} className={'week-cell' + (i === TODAY_INDEX ? ' today' : '')}>
                  <span className="week-cell-day">{day.d}</span>
                  <span className="week-cell-num">{day.n}</span>
                  <span className="week-dot" style={{ opacity: day.hasJobs ? 1 : 0 }} />
                </div>
              ))}
            </div>
            <div className="job-list">
              {JOBS.map((job) => (
                <div key={job.time + job.title} className="job-row">
                  <span className={'job-time' + (job.pending ? ' pending' : '')}>{job.time}</span>
                  <div style={{ minWidth: 0 }}>
                    <div className="job-title">{job.title}</div>
                    <div className="job-sub">{job.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ScoutCard title="Scout · this month" link="See source breakdown">
            {SCOUT_TEXT}
          </ScoutCard>
        </div>
      </div>
    </section>
  );
}

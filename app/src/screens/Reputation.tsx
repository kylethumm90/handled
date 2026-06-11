import { useState } from 'react';
import { REFERRERS, REVIEWS, REVIEW_QUEUE } from '../data/sample';
import { AgentChip, Stars } from '../components/primitives';

export function Reputation() {
  const [sent, setSent] = useState<Record<string, boolean>>({});
  const [replied, setReplied] = useState<Record<string, boolean>>({});
  const [winbackStarted, setWinbackStarted] = useState(false);

  return (
    <section>
      <div style={{ marginBottom: 22 }}>
        <h1 className="page-title">Reputation</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6 }}>
          <AgentChip agent="stella" />
          <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>
            Stella runs review requests, referrals and win-backs — you approve, she sends.
          </span>
        </div>
      </div>

      <div className="rep-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <div className="card-title">Review requests</div>
              <span className="section-meta" style={{ fontSize: 12 }}>3 jobs finished without an ask</span>
            </div>
            {REVIEW_QUEUE.map((q) => (
              <div key={q.id} className="queue-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>{q.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--faint)', lineHeight: 1.35 }}>{q.job} · {q.when}</div>
                </div>
                {sent[q.id]
                  ? <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--success)' }}>Sent ✓</span>
                  : <button className="btn btn-navy btn-sm" onClick={() => setSent((s) => ({ ...s, [q.id]: true }))}>Send request</button>}
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <div className="card-title">Latest reviews</div>
              <span className="section-meta" style={{ fontSize: 12 }}>4.9 average · 132 total</span>
            </div>
            {REVIEWS.map((r) => {
              const isReplied = r.preReplied || replied[r.id];
              return (
                <div key={r.id} className="review-row">
                  <div className="review-head">
                    <span style={{ fontSize: 13.5, fontWeight: 700 }}>{r.name}</span>
                    <Stars n={r.stars} />
                    <span className="review-time">{r.time}</span>
                  </div>
                  <div className="review-body">{r.body}</div>
                  <div style={{ marginTop: 8 }}>
                    {isReplied ? (
                      <span className="replied-note">
                        <AgentChip agent="stella" size={14} />
                        {r.preReplied ? 'Replied Mon' : 'Stella drafted a reply — in your approvals'}
                      </span>
                    ) : (
                      <button className="btn btn-ghost btn-sm" onClick={() => setReplied((s) => ({ ...s, [r.id]: true }))}>Reply with Stella</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rep-rail">
          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 12 }}>Referrals · this quarter</div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
              {[['6', 'referred leads'], ['4', 'won'], ['$9,300', 'revenue']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 21, fontWeight: 800 }}>{v}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--faint)', fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-light)' }}>
              {REFERRERS.map((rf) => (
                <div key={rf.name} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{rf.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--faint)' }}>{rf.n}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, marginLeft: 'auto' }}>{rf.v}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--navy)', marginTop: 10, cursor: 'pointer' }}>Share referral link →</div>
          </div>

          <div className="navy-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <AgentChip agent="stella" />
              <span className="navy-panel-label">Stella · win-back</span>
            </div>
            <div className="navy-panel-big">47 past customers</div>
            <div className="navy-panel-body">
              last contact 6+ months ago. Stella drafts a friendly check-in with a seasonal tune-up offer — you approve the batch before anything sends.
            </div>
            {winbackStarted ? (
              <div style={{ marginTop: 16 }}>
                <div className="progress-track"><div className="progress-fill" style={{ width: '26%' }} /></div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#c9d6e5', marginTop: 8 }}>12 of 47 sent · 3 replies · 1 booked</div>
              </div>
            ) : (
              <button
                className="btn btn-amber btn-full"
                style={{ marginTop: 16, padding: '11px 0', fontSize: 13.5, borderRadius: 9 }}
                onClick={() => setWinbackStarted(true)}
              >
                Start win-back campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

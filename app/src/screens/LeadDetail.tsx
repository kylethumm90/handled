import { useState } from 'react';
import {
  LEADS, LEAD_FACTS, LEAD_INTEL, LEAD_TIMELINES, SEQ_QUOTED, SEQ_SPEED, fallbackTimeline,
} from '../data/sample';
import { AgentChip, StatusPill, Toggle } from '../components/primitives';

interface Props {
  leadId: string;
  onBack: () => void;
}

export function LeadDetail({ leadId, onBack }: Props) {
  const lead = LEADS.find((l) => l.id === leadId) ?? LEADS[0];
  const [seqOn, setSeqOn] = useState(true);

  const timeline = LEAD_TIMELINES[lead.id] ?? fallbackTimeline(lead);
  const intel = LEAD_INTEL[lead.id] ?? ('Ava replied within 90 seconds of this lead coming in. ' + lead.summary);
  const facts = LEAD_FACTS[lead.id] ?? [];
  const isQuoted = lead.status === 'Quoted';
  const seqSteps = isQuoted ? SEQ_QUOTED : SEQ_SPEED;
  const quoteMeta = lead.id === 'mike' ? 'Sent Mon Jun 8 · viewed 2×' : `Sent ${lead.activity} · not viewed yet`;

  const stepColor = (st: 'done' | 'next' | 'pend') =>
    st === 'done' ? 'var(--success)' : st === 'next' && seqOn ? 'var(--amber)' : 'var(--disabled)';

  return (
    <section>
      <button className="back-link" onClick={onBack}>← All leads</button>

      <div className="detail-head">
        <div>
          <div className="detail-name-row">
            <h1 className="detail-name">{lead.name}</h1>
            <StatusPill status={lead.status} />
          </div>
          <div className="detail-contact">{lead.phone} · {lead.addr}</div>
        </div>
        <div className="detail-head-actions">
          <div className="detail-value-label">
            <div className="overline">Value</div>
            <div className="detail-value">{lead.value}</div>
          </div>
          <button className="btn btn-amber">Send follow-up</button>
          <button className="btn btn-ghost">Edit lead</button>
        </div>
      </div>

      <div className="card" style={{ padding: '16px 20px', marginBottom: 22 }}>
        <div className="scout-card-head">
          <AgentChip agent="scout" />
          <span className="scout-card-label">Scout · lead intelligence</span>
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: '88ch', textWrap: 'pretty' }}>{intel}</div>
        {facts.length > 0 && (
          <div style={{ display: 'flex', gap: 36, marginTop: 14, borderTop: '1px solid var(--border-light)', paddingTop: 12, flexWrap: 'wrap' }}>
            {facts.map((f) => (
              <div key={f.k}>
                <div className="overline" style={{ fontSize: 11 }}>{f.k}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{f.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="detail-grid">
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="card-title" style={{ marginBottom: 6 }}>Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timeline.map((ev) => (
              <div key={ev.title + ev.time} className="timeline-row">
                <span className={'timeline-dot' + (ev.highlight ? ' navy' : '')} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                    <span className="timeline-title">{ev.title}</span>
                    <span className="timeline-time">{ev.time}</span>
                  </div>
                  {ev.body && <div className="timeline-body">{ev.body}</div>}
                  {ev.voice && (
                    <>
                      <div className="voice-player">
                        <button className="voice-play" aria-label="Play voice note">▶</button>
                        <span className="voice-track"><span className="voice-progress" /></span>
                        <span className="voice-duration">0:19</span>
                      </div>
                      <div className="voice-transcript">{ev.transcript}</div>
                    </>
                  )}
                  {ev.chipText && (
                    <div className="timeline-chip-note">
                      <AgentChip agent="ava" size={14} />
                      {ev.chipText}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-rail">
          <div className="card card-pad">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <AgentChip agent="ava" />
              <span style={{ fontSize: 13, fontWeight: 800 }}>Ava · {isQuoted ? 'Quote follow-up' : 'Speed-to-lead'}</span>
              <div style={{ marginLeft: 'auto' }}>
                <Toggle on={seqOn} onToggle={() => setSeqOn(!seqOn)} label="Toggle follow-up sequence" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {seqSteps.map((s) => (
                <div key={s.label} className="seq-step">
                  <span className="seq-dot" style={{ background: stepColor(s.st) }} />
                  <div>
                    <div className="seq-label">{s.label}</div>
                    <div className={'seq-sub' + (s.st === 'next' && seqOn ? ' next' : '')}>
                      {!seqOn && s.st !== 'done' ? 'Paused' : s.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="seq-note">Ava pauses the sequence the moment they reply.</div>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 10 }}>Job details</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                ['Job', lead.job],
                ['Address', lead.addr],
                ['Source', lead.source],
                ['Est. value', lead.value],
              ].map(([k, v]) => (
                <div key={k} className="kv-row">
                  <span className="kv-key">{k}</span>
                  <span className="kv-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {isQuoted && (
            <div className="card card-pad">
              <div className="card-title" style={{ marginBottom: 6 }}>Quote</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>{lead.value}</div>
              <div style={{ fontSize: 12.5, color: 'var(--faint)', marginTop: 3 }}>{quoteMeta}</div>
              <button className="btn btn-ghost btn-sm btn-full" style={{ marginTop: 12, padding: '8px 0' }}>Resend quote</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

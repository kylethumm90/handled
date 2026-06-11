import { useState } from 'react';
import {
  AMBASSADORS, AUTOMATIONS, INVITE_DRAFT, INVITE_JOBS, PAYOUTS, REFERRAL_STAGES, REWARD_RULES,
} from '../data/sample';
import { AgentChip, Checkbox, TierPill, Toggle } from '../components/primitives';

type RefTab = 'pipeline' | 'amb' | 'rewards' | 'auto';

const TABS: [RefTab, string][] = [
  ['pipeline', 'Pipeline'],
  ['amb', 'Ambassadors'],
  ['rewards', 'Rewards'],
  ['auto', 'Automations'],
];

export function Referrals() {
  const [tab, setTab] = useState<RefTab>('pipeline');
  const [nudged, setNudged] = useState<Record<string, boolean>>({});
  const [thanked, setThanked] = useState<Record<string, boolean>>({});
  const [paid, setPaid] = useState<Record<string, boolean>>({});
  const [autos, setAutos] = useState<Record<string, boolean>>(
    Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a.defaultOn])),
  );
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invChecked, setInvChecked] = useState<Record<string, boolean>>({ i1: true, i2: true });
  const [invSentCount, setInvSentCount] = useState<number | null>(null);

  const invCount = Object.values(invChecked).filter(Boolean).length;

  const openInvite = () => { setInvSentCount(null); setInviteOpen(true); };

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
        <div>
          <h1 className="page-title">Referrals</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6 }}>
            <AgentChip agent="stella" />
            <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>
              Stella turns happy customers into ambassadors — no app, just a text and a link. Referral leads land in your main pipeline.
            </span>
          </div>
        </div>
        <button className="btn btn-navy" onClick={openInvite}>Invite ambassadors</button>
      </div>

      <div className="tab-bar">
        {TABS.map(([id, label]) => (
          <button key={id} className={'tab' + (tab === id ? ' active' : '')} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <>
          <div className="kanban-wrap">
            <div className="kanban">
              {REFERRAL_STAGES.map((col) => (
                <div key={col.name} className="kanban-col">
                  <div className="kanban-col-head">
                    <span className="kanban-col-name">{col.name}</span>
                    <span className="kanban-col-count">{col.cards.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {col.cards.map((card) => (
                      <div key={card.id} className="kanban-card">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, flex: 1 }}>{card.lead}</span>
                          <span className={'days-tag' + (card.stalled ? ' stalled' : '')}>{card.days}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--faint)', lineHeight: 1.35, marginTop: 1 }}>{card.job}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 7 }}>
                          <span style={{ fontSize: 12.5, fontWeight: 700 }}>{card.val}</span>
                          <span style={{ fontSize: 11.5, color: 'var(--faint)' }}>via {card.ref}</span>
                        </div>
                        {(card.rewardDue || card.paidNote) && (
                          <div className="kanban-meta" style={{ color: card.rewardDue ? 'var(--warn)' : 'var(--success)' }}>
                            {card.rewardDue || card.paidNote}
                          </div>
                        )}
                        {card.stalled && !nudged[card.id] && (
                          <div className="kanban-stall">
                            <AgentChip agent="stella" size={14} />
                            <span style={{ fontSize: 11.5, color: 'var(--muted)', flex: 1, lineHeight: 1.35 }}>{card.stallText}</span>
                            <button className="btn btn-navy btn-sm" onClick={() => setNudged((s) => ({ ...s, [card.id]: true }))}>Nudge</button>
                          </div>
                        )}
                        {card.stalled && nudged[card.id] && (
                          <div style={{ marginTop: 9, borderTop: '1px solid var(--border-light)', paddingTop: 9, fontSize: 11.5, fontWeight: 700, color: 'var(--success)' }}>
                            Nudge sent ✓ — follow-up text queued
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="table-note">
            Won referrals create a payout automatically. Every card here also lives in your main Leads list with a Referral badge.
          </div>
        </>
      )}

      {tab === 'amb' && (
        <>
          <div className="card amb-table-wrap" style={{ overflow: 'hidden', overflowX: 'auto' }}>
            <div className="amb-table">
              <div className="amb-head">
                <span>Ambassador</span><span>Tier</span><span>Sent</span><span>Won</span><span>Earned</span><span>Last activity</span><span />
              </div>
              {AMBASSADORS.map((am) => (
                <div key={am.id} className="amb-row">
                  <span style={{ fontSize: 13.5, fontWeight: 700 }}>{am.name}</span>
                  <span><TierPill tier={am.tier} /></span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{am.sent}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{am.won}</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{am.earned}</span>
                  <span style={{ fontSize: 12.5, fontWeight: am.dormant ? 700 : 400, color: am.dormant ? 'var(--warn)' : 'var(--faint)' }}>{am.last}</span>
                  <span className="amb-actions">
                    <button className="btn btn-ghost btn-sm">Text</button>
                    {thanked[am.id]
                      ? <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)' }}>Thanked ✓</span>
                      : <button className="btn btn-ghost btn-sm" onClick={() => setThanked((s) => ({ ...s, [am.id]: true }))}>Thank-you</button>}
                    <button className="btn btn-ghost btn-sm">Boost reward</button>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="table-note">
            Tiers update automatically: Rookie → Pro at 2 wins, Pro → MVP at 3. MVPs get a $50 bonus per close.
          </div>
        </>
      )}

      {tab === 'rewards' && (
        <div className="rep-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="card" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                <div className="card-title">Reward rules</div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer' }}>Edit rules</span>
              </div>
              {REWARD_RULES.map((rl) => (
                <div key={rl.job} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{rl.job}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--faint)' }}>{rl.ex}</div>
                  </div>
                  <div style={{ textAlign: 'right', flex: 'none' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 800 }}>{rl.rule}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--faint)' }}>{rl.when}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <div className="card-title">Payout queue</div>
                <span className="section-meta" style={{ fontSize: 12 }}>approve, and Stella handles delivery</span>
              </div>
              {PAYOUTS.map((po) => (
                <div key={po.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{po.to} · {po.amount}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--faint)' }}>{po.reason} · {po.method}</div>
                  </div>
                  {paid[po.id]
                    ? <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--success)' }}>Paid ✓</span>
                    : <button className="btn btn-navy btn-sm" onClick={() => setPaid((s) => ({ ...s, [po.id]: true }))}>Approve &amp; pay</button>}
                </div>
              ))}
            </div>
          </div>

          <div className="navy-panel" style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <AgentChip agent="scout" />
              <span className="navy-panel-label">Scout · referral ROI, last 12 months</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em' }}>12.9×</div>
            <div style={{ fontSize: 12.5, color: 'var(--sidebar-sub)', marginTop: 2 }}>return on rewards paid</div>
            <div style={{ display: 'flex', gap: 22, marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 14 }}>
              {[['$3,250', 'rewards paid'], ['$41,800', 'referral revenue'], ['23', 'jobs won']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{v}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--sidebar-sub)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'auto' && (
        <div style={{ maxWidth: 720 }}>
          <div className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <AgentChip agent="stella" />
              <div className="card-title">Stella's sequences</div>
            </div>
            {AUTOMATIONS.map((au) => (
              <div key={au.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{au.label}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--faint)', lineHeight: 1.45, marginTop: 2 }}>{au.sub}</div>
                </div>
                <Toggle on={!!autos[au.id]} onToggle={() => setAutos((s) => ({ ...s, [au.id]: !s[au.id] }))} label={au.label} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12 }}>
            <AgentChip agent="stella" size={14} />
            <span style={{ fontSize: 12.5, color: 'var(--faint)' }}>
              Every message Stella sends shows up in the lead's activity feed. Nothing goes out you couldn't have written.
            </span>
          </div>
        </div>
      )}

      {inviteOpen && (
        <div className="modal-backdrop" onClick={() => setInviteOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {invSentCount === null ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>Invite ambassadors</div>
                  <button className="btn btn-ghost btn-sm" onClick={() => setInviteOpen(false)}>Close</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
                  <AgentChip agent="stella" size={14} />
                  <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                    Stella drafts a personal text for each customer. They tap the link — no app, no signup.
                  </span>
                </div>
                <div className="overline" style={{ marginBottom: 8 }}>Recent completed jobs</div>
                <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                  {INVITE_JOBS.map((j) => (
                    <div
                      key={j.id}
                      className={'invite-row' + (invChecked[j.id] ? ' checked' : '')}
                      onClick={() => setInvChecked((s) => ({ ...s, [j.id]: !s[j.id] }))}
                    >
                      <Checkbox checked={!!invChecked[j.id]} onToggle={() => setInvChecked((s) => ({ ...s, [j.id]: !s[j.id] }))} label={'Invite ' + j.name} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{j.name}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--faint)' }}>{j.job} · completed {j.when}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="overline" style={{ marginBottom: 8 }}>Stella's draft — tap to edit</div>
                <div className="draft-box" style={{ marginBottom: 18 }}>{INVITE_DRAFT}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer' }}>Bulk invite — import past customers</span>
                  <button
                    className="btn btn-amber"
                    style={{ marginLeft: 'auto' }}
                    disabled={invCount === 0}
                    onClick={() => setInvSentCount(invCount)}
                  >
                    Send {invCount} {invCount === 1 ? 'invite' : 'invites'}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '26px 10px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--success-bg)', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 800 }}>✓</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 12 }}>
                  {invSentCount} {invSentCount === 1 ? 'invite sent' : 'invites sent'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginTop: 6, maxWidth: '38ch', marginLeft: 'auto', marginRight: 'auto' }}>
                  Stella enrolls each customer the moment they tap their link — they'll appear in your ambassador roster.
                </div>
                <div style={{ marginTop: 18 }}>
                  <button className="btn btn-navy" onClick={() => setInviteOpen(false)}>Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

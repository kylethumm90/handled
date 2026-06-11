/** Sample data for Hayes Plumbing Co. (Madison, AL — owner Dale Hayes).
 *  Lifted verbatim from the approved hi-fi mockups so screens render
 *  identically. Replace with Supabase queries:
 *    leads → public.leads · timeline → public.activity_log
 *    reviews → public.reviews / review_responses
 *    ambassadors/payouts → public.referral_partners / referral_rewards */

import type {
  Ambassador, Automation, CalendarDay, InviteJob, Job, Lead, Payout, Priority,
  ReferralStage, Referrer, Review, ReviewRequest, RewardRule, SequenceStep, Stat,
  TimelineEvent,
} from './types';

export const ACCOUNT = {
  owner: 'Dale Hayes',
  initials: 'DH',
  business: 'Hayes Plumbing Co.',
  greeting: 'Good morning, Dale.',
  dateline: 'Thursday, June 11 · 3 jobs today · Ava is watching 5 follow-ups',
};

export const AGENTS = {
  ava: { name: 'Ava', color: 'var(--ava)' },
  stella: { name: 'Stella', color: 'var(--stella)' },
  scout: { name: 'Scout', color: 'var(--scout)' },
} as const;

export const STATS: Stat[] = [
  { label: 'New leads', value: '12', delta: '+4 vs last week', tone: 'success' },
  { label: 'Needs follow-up', value: '5', delta: '2 going cold', tone: 'warn' },
  { label: 'Booked this week', value: '9', delta: '$16,400 scheduled', tone: 'muted' },
  { label: 'New reviews', value: '6', delta: '4.9 average', tone: 'muted' },
];

export const PRIORITIES: Priority[] = [
  { id: 'p1', agent: 'ava', attention: true, title: 'Mike Reynolds is going cold', body: 'Quoted $1,850 for a water heater swap 3 days ago — no response. He viewed the quote twice yesterday.', primary: 'Send follow-up', secondary: 'Snooze', doneText: 'Follow-up sent — Ava will watch for a reply' },
  { id: 'p2', agent: 'ava', title: 'Sarah Whitfield wants a morning slot', body: 'Tankless install, $3,400 est. Fri 9:30 AM is open — she said any morning works.', primary: 'Book Fri 9:30', secondary: 'Other times', doneText: 'Booked Fri 9:30 AM — confirmation text sent' },
  { id: 'p3', agent: 'stella', title: 'Carlos Vega’s drain job wrapped Tuesday', body: 'Paid $310 on site, happy on the phone. The first 48 hours is the best review window.', primary: 'Send review request', secondary: 'Skip', doneText: 'Review request sent' },
  { id: 'p4', agent: 'ava', title: 'Tom Brantley mentioned a competing bid', body: 'Repipe quote $8,900, open 5 days. Scout: similar Huntsville jobs closed $8,400–$9,200.', primary: 'Call Tom', secondary: 'Snooze', doneText: 'Call logged — Ava scheduled a Friday check-in' },
];

export const JOBS: Job[] = [
  { time: 'Today 9:00', title: 'Linda Pham — sump pump replacement', sub: 'Meridianville · $740 · confirmed' },
  { time: 'Today 1:30', title: 'Backflow test — City of Madison', sub: 'Annual certification · 2 units' },
  { time: 'Fri 8:00', title: 'Annie Kessler — walkthrough', sub: 'Water softener · Madison' },
  { time: 'Fri 9:30', title: 'Hold — Sarah Whitfield', sub: 'Ava is confirming this slot', pending: true },
];

export const SCOUT_TEXT =
  'Google leads are booking at 2.3× the rate of Angi this month, at half the cost per lead. Worth a look before the Angi renewal on June 20.';

export const LEADS: Lead[] = [
  { id: 'sarah', name: 'Sarah Whitfield', loc: 'Huntsville, AL', job: 'Tankless water heater install', summary: 'Asked for a morning slot this week — ready to book.', source: 'Website', status: 'New', value: '$3,400 est.', activity: '12m ago', phone: '(256) 555-0142', addr: '2208 Tollgate Rd, Huntsville, AL' },
  { id: 'jess', name: 'Jess Mercer', loc: 'Harvest, AL', job: 'Bathroom remodel rough-in', summary: 'Addition build; wants a walkthrough before quoting.', source: 'Facebook', status: 'New', value: '—', activity: '28m ago', phone: '(256) 555-0177', addr: '119 Cedar Gate Ln, Harvest, AL' },
  { id: 'dave', name: 'Dave Garrick', loc: 'Madison, AL', job: 'Sewer line camera inspection', summary: 'HOA property manager — recurring work potential.', source: 'Angi', status: 'Contacted', value: '$450 est.', activity: '1h ago', phone: '(256) 555-0103', addr: '400 Garrick Commons, Madison, AL' },
  { id: 'annie', name: 'Annie Kessler', loc: 'Madison, AL', job: 'Water softener install', summary: 'Walkthrough booked Fri 8:00 — confirm model first.', source: 'Website', status: 'Contacted', value: '$1,150 est.', activity: '3h ago', phone: '(256) 555-0156', addr: '78 Sagewood Dr, Madison, AL' },
  { id: 'linda', name: 'Linda Pham', loc: 'Meridianville, AL', job: 'Sump pump replacement', summary: 'Booked today 9:00 AM — reminder text sent last night.', source: 'Referral', status: 'Booked', value: '$740', activity: 'Yesterday', phone: '(256) 555-0129', addr: '301 Monroe Rd, Meridianville, AL' },
  { id: 'mike', name: 'Mike Reynolds', loc: 'Madison, AL', job: 'Water heater replacement', summary: 'Quoted 3 days ago, no response. Viewed quote twice — going cold.', source: 'Google', status: 'Quoted', value: '$1,850', activity: '3d ago', phone: '(256) 555-0118', addr: '114 Brookline Ct, Madison, AL' },
  { id: 'tom', name: 'Tom Brantley', loc: 'Huntsville, AL', job: 'Whole-home repipe', summary: 'Comparing two bids; mentioned price. A call beats a text.', source: 'Google', status: 'Quoted', value: '$8,900', activity: '5d ago', phone: '(256) 555-0191', addr: '5510 Chasewood Dr, Huntsville, AL' },
  { id: 'carlos', name: 'Carlos Vega', loc: 'Madison, AL', job: 'Kitchen drain clog', summary: 'Cleared Tuesday, paid on site. Review request queued.', source: 'Google', status: 'Won', value: '$310', activity: '2d ago', phone: '(256) 555-0164', addr: '92 Hardiman Pl, Madison, AL' },
  { id: 'ray', name: 'Ray Dotson', loc: 'Huntsville, AL', job: 'Gas line for range', summary: 'Went with another bid on price. Win-back eligible in 90 days.', source: 'Angi', status: 'Lost', value: '$680 quoted', activity: '8d ago', phone: '(256) 555-0137', addr: '1816 Bide-A-Wee Dr, Huntsville, AL' },
];

export const LEAD_INTEL: Record<string, string> = {
  mike: 'High intent. Viewed the quote twice and asked about financing on the first call. Comparable Madison water-heater jobs closed at $1,790–$1,950 — a follow-up that leads with a financing option is the strongest next move.',
  tom: 'Price-sensitive and comparing two bids. The quote has been open 5 days; similar Huntsville repipes closed at $8,400–$9,200. A call beats a text here.',
  sarah: 'Fast mover — replied to Ava’s intro text within 4 minutes and asked for morning availability. Booking her this week is the whole game.',
};

export const LEAD_FACTS: Record<string, { k: string; v: string }[]> = {
  mike: [
    { k: 'Quote viewed', v: '2× — last today 8:12 AM' },
    { k: 'Mentioned', v: 'Financing' },
    { k: 'Local comps', v: '$1,790–$1,950' },
  ],
};

export const LEAD_TIMELINES: Record<string, TimelineEvent[]> = {
  mike: [
    { title: 'Quote viewed (2nd time)', time: 'Today 8:12 AM', body: 'Mike opened the quote link from his phone.', highlight: true },
    { title: 'Voice note — you', time: 'Tue 4:31 PM', voice: true, transcript: '“Quoted Mike eighteen-fifty for the 50-gallon Rheem swap. Wants to think it over — follow up Friday if it stays quiet.”', chipText: 'Transcribed by Ava' },
    { title: 'Text — sent by Ava', time: 'Mon 9:02 AM', body: '“Hi Mike, Dale from Hayes Plumbing. Your water heater quote is attached — $1,850 installed, haul-away included. Reply here with any questions.”', chipText: 'Auto-sent 90 seconds after the call' },
    { title: 'Inbound call — 6 min', time: 'Mon 8:46 AM', body: 'Tank vs. tankless discussion; asked about financing options.' },
    { title: 'Lead created — Google', time: 'Mon 8:40 AM', body: 'Search: “water heater replacement madison al”' },
  ],
};

export function fallbackTimeline(lead: Lead): TimelineEvent[] {
  return [
    { title: 'Text — sent by Ava', time: lead.activity, body: 'Instant reply went out 90 seconds after the lead came in.', chipText: 'Auto-sent' },
    { title: 'Lead created — ' + lead.source, time: lead.activity, body: lead.job + ' · ' + lead.loc },
  ];
}

export const SEQ_QUOTED: SequenceStep[] = [
  { label: 'Day 1 — text nudge', sub: 'Sent Mon 9:02 AM', st: 'done' },
  { label: 'Day 3 — text + email with financing link', sub: 'Today 4:30 PM', st: 'next' },
  { label: 'Day 7 — call task on your list', sub: 'Pending', st: 'pend' },
];

export const SEQ_SPEED: SequenceStep[] = [
  { label: 'Instant text reply', sub: 'Sent within 90 seconds', st: 'done' },
  { label: 'Call attempt if no reply in 15 min', sub: 'Watching', st: 'next' },
  { label: 'Day 2 nudge with booking link', sub: 'Pending', st: 'pend' },
];

export const REVIEW_QUEUE: ReviewRequest[] = [
  { id: 'q1', name: 'Carlos Vega', job: 'Kitchen drain clog · $310', when: 'completed Tue' },
  { id: 'q2', name: 'Marcus Lee', job: 'Garbage disposal swap · $285', when: 'completed Mon' },
  { id: 'q3', name: 'Brenda Holt', job: 'Hose bib replacement · $190', when: 'completed Jun 5' },
];

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'Tonya Pruitt', stars: 5, time: '2h ago · Google', body: '“Came out same day and had our drain cleared in under an hour. Fair price, no upsell.”' },
  { id: 'r2', name: 'Greg Tatum', stars: 4, time: 'Yesterday · Google', body: '“Solid work on the water heater. Scheduling took a couple tries but the install was clean.”' },
  { id: 'r3', name: 'Brenda Holt', stars: 5, time: 'Mon · Facebook', body: '“Dale is our go-to now. Honest about what didn’t need fixing.”', preReplied: true },
];

export const REFERRERS: Referrer[] = [
  { name: 'Linda Pham', n: '3 referrals', v: '$2,120' },
  { name: 'J. Castillo', n: '2 referrals', v: '$640' },
  { name: 'Brenda Holt', n: '1 referral', v: '$740' },
];

export const REFERRAL_STAGES: ReferralStage[] = [
  { name: 'Submitted', cards: [
    { id: 'rf1', lead: 'Dana Whitlock', job: 'Water heater replacement', val: '$1,900 est.', ref: 'Linda Pham', days: 'Today' },
    { id: 'rf2', lead: 'Pete Solano', job: 'Kitchen drain clog', val: '$300 est.', ref: 'Carlos Vega', days: '1d' },
  ] },
  { name: 'Contacted', cards: [
    { id: 'rf3', lead: 'John Okafor', job: 'Tankless install', val: '$3,600 est.', ref: 'Brenda Holt', days: '2d' },
  ] },
  { name: 'Appt set', cards: [
    { id: 'rf4', lead: 'Maria Reyes', job: 'Repipe consult', val: '$8,000 est.', ref: 'Linda Pham', days: '1d' },
  ] },
  { name: 'Quoted', cards: [
    { id: 'rf5', lead: 'Sam Tully', job: 'Water softener install', val: '$1,250', ref: 'J. Castillo', days: '4d', stalled: true, stallText: 'Sat 4 days since the quote — nudge Sam?' },
  ] },
  { name: 'Won', cards: [
    { id: 'rf6', lead: 'Greg Tatum', job: 'Water heater replacement', val: '$1,790', ref: 'Brenda Holt', days: '2d', rewardDue: '$250 reward due → payout queue' },
  ] },
  { name: 'Reward paid', cards: [
    { id: 'rf7', lead: 'Nina Calloway', job: 'Sump pump replacement', val: '$760', ref: 'Linda Pham', days: 'May 30', paidNote: '$100 paid · gift card' },
  ] },
];

export const AMBASSADORS: Ambassador[] = [
  { id: 'a1', name: 'Linda Pham', tier: 'MVP', sent: '5', won: '3', earned: '$750', last: '2d ago' },
  { id: 'a2', name: 'Brenda Holt', tier: 'Pro', sent: '3', won: '2', earned: '$400', last: '6d ago' },
  { id: 'a3', name: 'J. Castillo', tier: 'Pro', sent: '2', won: '1', earned: '$250', last: '3w — dormant', dormant: true },
  { id: 'a4', name: 'Carlos Vega', tier: 'Rookie', sent: '1', won: '0', earned: '$0', last: 'Today' },
];

export const REWARD_RULES: RewardRule[] = [
  { job: 'Standard service', ex: 'drains, disposals, hose bibs', rule: '$100 flat', when: 'paid at close' },
  { job: 'Water heater / tankless', ex: 'replacement or new install', rule: '$50 + $200', when: 'appointment + close' },
  { job: 'Repipe / remodel', ex: 'whole-home jobs', rule: '$100 + $400', when: 'appointment + close' },
];

export const PAYOUTS: Payout[] = [
  { id: 'po1', to: 'Brenda Holt', amount: '$250', reason: 'Greg Tatum — water heater closed', method: 'digital gift card' },
  { id: 'po2', to: 'Linda Pham', amount: '$100', reason: 'Maria Reyes — appointment milestone', method: 'Venmo' },
];

export const AUTOMATIONS: Automation[] = [
  { id: 'au1', label: 'Auto-invite after a 5-star review', sub: '12 invites sent this quarter — 4 became ambassadors', defaultOn: true },
  { id: 'au2', label: 'Milestone texts to referrers', sub: '“Your referral John just booked!” — referrers always know where their reward stands', defaultOn: true },
  { id: 'au3', label: 'Quarterly re-engagement for dormant ambassadors', sub: '2 ambassadors quiet 90+ days — J. Castillo, R. Otis', defaultOn: false },
  { id: 'au4', label: 'Stalled-referral nudges to you', sub: '1 active: Sam Tully, 4 days in Quoted', defaultOn: true },
];

export const INVITE_JOBS: InviteJob[] = [
  { id: 'i1', name: 'Carlos Vega', job: 'Kitchen drain clog · $310', when: 'Tue' },
  { id: 'i2', name: 'Marcus Lee', job: 'Garbage disposal swap · $285', when: 'Mon' },
  { id: 'i3', name: 'Dot Greer', job: 'Hose bib replacement · $190', when: 'Jun 5' },
];

export const INVITE_DRAFT =
  '“Hey Carlos — Dale here. Glad the drain’s flowing again! Know anyone who’d want the same? Here’s your personal link — you get $100 for every referral that closes, paid automatically. No app, no signup: hayes.handled.app/carlos”';

export const CALENDAR: CalendarDay[] = [
  { d: 'Mon', n: '8', hasJobs: true, label: 'Monday, June 8', items: [
    { t: '8:30', title: 'Marcus Lee — garbage disposal swap', sub: 'Madison · $285 · paid', done: true },
    { t: '1:00', title: 'Brenda Holt — hose bib replacement', sub: 'Madison · $190 · paid', done: true },
  ] },
  { d: 'Tue', n: '9', hasJobs: true, label: 'Tuesday, June 9', items: [
    { t: '9:00', title: 'Carlos Vega — kitchen drain clog', sub: 'Madison · $310 · paid', done: true },
    { t: '2:30', title: 'Annie Kessler — first visit', sub: 'Water softener walkthrough booked for Fri', done: true },
  ] },
  { d: 'Wed', n: '10', hasJobs: true, label: 'Wednesday, June 10', items: [
    { t: '10:00', title: 'Tom Brantley — repipe walkthrough', sub: 'Huntsville · quote sent same day', done: true },
  ] },
  { d: 'Thu', n: '11', hasJobs: true, label: 'Today — Thursday, June 11', items: [
    { t: '9:00', title: 'Linda Pham — sump pump replacement', sub: 'Meridianville · $740 · confirmed' },
    { t: '11:30', title: 'Supply run — Ferguson', sub: '50-gal Rheem on will-call' },
    { t: '1:30', title: 'Backflow test — City of Madison', sub: 'Annual certification · 2 units' },
    { t: '4:30', title: 'Ava sends the day’s follow-up batch', sub: '3 texts queued — review before they go', hasAgent: true },
  ] },
  { d: 'Fri', n: '12', hasJobs: true, label: 'Tomorrow — Friday, June 12', items: [
    { t: '8:00', title: 'Annie Kessler — walkthrough', sub: 'Water softener · Madison' },
    { t: '9:30', title: 'Hold — Sarah Whitfield', sub: 'Ava is confirming this slot', hasAgent: true },
  ] },
];

export const TODAY_INDEX = 3;

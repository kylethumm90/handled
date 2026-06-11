/** Data contracts for the handled. app UI.
 *  Shapes mirror the Supabase schema where one exists (leads, activity_log,
 *  reviews, referral_partners, referral_rewards); the rest (priorities,
 *  Scout insights) are derived/agent data with no backing table yet. */

export type AgentId = 'ava' | 'stella' | 'scout';

export type LeadStatus = 'New' | 'Contacted' | 'Quoted' | 'Booked' | 'Won' | 'Lost';
export type LeadSource = 'Website' | 'Facebook' | 'Google' | 'Angi' | 'Referral';

export interface Lead {
  id: string;
  name: string;
  loc: string;
  job: string;
  summary: string;
  source: LeadSource;
  status: LeadStatus;
  value: string;
  activity: string;
  phone: string;
  addr: string;
}

export interface Priority {
  id: string;
  agent: AgentId;
  /** Amber treatment — at most one per screen. */
  attention?: boolean;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  doneText: string;
}

export interface Stat {
  label: string;
  value: string;
  delta: string;
  tone: 'success' | 'warn' | 'muted';
}

export interface Job {
  time: string;
  title: string;
  sub: string;
  pending?: boolean;
}

export interface TimelineEvent {
  title: string;
  time: string;
  body?: string;
  voice?: boolean;
  transcript?: string;
  chipText?: string;
  highlight?: boolean;
}

export interface SequenceStep {
  label: string;
  sub: string;
  st: 'done' | 'next' | 'pend';
}

export interface ReviewRequest {
  id: string;
  name: string;
  job: string;
  when: string;
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  time: string;
  body: string;
  preReplied?: boolean;
}

export interface Referrer {
  name: string;
  n: string;
  v: string;
}

export interface ReferralCard {
  id: string;
  lead: string;
  job: string;
  val: string;
  ref: string;
  days: string;
  stalled?: boolean;
  stallText?: string;
  rewardDue?: string;
  paidNote?: string;
}

export interface ReferralStage {
  name: string;
  cards: ReferralCard[];
}

export type AmbassadorTier = 'Rookie' | 'Pro' | 'MVP';

export interface Ambassador {
  id: string;
  name: string;
  tier: AmbassadorTier;
  sent: string;
  won: string;
  earned: string;
  last: string;
  dormant?: boolean;
}

export interface RewardRule {
  job: string;
  ex: string;
  rule: string;
  when: string;
}

export interface Payout {
  id: string;
  to: string;
  amount: string;
  reason: string;
  method: string;
}

export interface Automation {
  id: string;
  label: string;
  sub: string;
  defaultOn: boolean;
}

export interface InviteJob {
  id: string;
  name: string;
  job: string;
  when: string;
}

export interface CalendarItem {
  t: string;
  title: string;
  sub: string;
  done?: boolean;
  hasAgent?: boolean;
}

export interface CalendarDay {
  d: string;
  n: string;
  hasJobs: boolean;
  label: string;
  items: CalendarItem[];
}

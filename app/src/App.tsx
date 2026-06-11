import { useState } from 'react';
import { AppShell, type Screen } from './shell/AppShell';
import { Dashboard } from './screens/Dashboard';
import { Leads } from './screens/Leads';
import { LeadDetail } from './screens/LeadDetail';
import { Calendar } from './screens/Calendar';
import { Reputation } from './screens/Reputation';
import { Referrals } from './screens/Referrals';
import { LEADS } from './data/sample';

/* Screen state is a tiny in-memory router. When this moves into
   handledsites, each screen becomes a Next.js route and AppShell
   becomes the shared layout — see app/README.md. */

export default function App() {
  const [screen, setScreen] = useState<Screen>('dash');
  const [leadId, setLeadId] = useState<string>('mike');
  const [micOn, setMicOn] = useState(false);

  // Priority actions persist across navigation, like the mockup's shared state.
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

  const newLeadCount = LEADS.filter((l) => l.status === 'New').length;

  return (
    <AppShell
      screen={screen}
      onNavigate={setScreen}
      newLeadCount={newLeadCount}
      micOn={micOn}
      onMic={() => setMicOn(!micOn)}
      showMic={screen === 'dash'}
    >
      {screen === 'dash' && (
        <Dashboard
          done={done}
          dismissed={dismissed}
          onDone={(id) => setDone((s) => ({ ...s, [id]: true }))}
          onDismiss={(id) => setDismissed((s) => ({ ...s, [id]: true }))}
        />
      )}
      {screen === 'leads' && (
        <Leads onOpenLead={(id) => { setLeadId(id); setScreen('detail'); }} />
      )}
      {screen === 'detail' && (
        <LeadDetail leadId={leadId} onBack={() => setScreen('leads')} />
      )}
      {screen === 'cal' && <Calendar />}
      {screen === 'rep' && <Reputation />}
      {screen === 'refs' && <Referrals />}
    </AppShell>
  );
}

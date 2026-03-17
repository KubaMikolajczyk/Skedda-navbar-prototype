import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { LangProvider, useLang } from './i18n'
import { VenueProvider } from './venue'
import { getSettingsSections } from './components/settings-data'
import './index.css'

function AppContent() {
  const { t } = useLang()
  const [active, setActive] = useState('schedule')
  const [settingsCompact, setSettingsCompact] = useState(false)

  const isSettings = active.startsWith('settings-')

  const settingsPageTitles = Object.fromEntries(
    getSettingsSections(t).flatMap(s => s.items.map(i => [i.id, i.label]))
  )

  const pageTitles: Record<string, string> = {
    schedule:           t.nav.schedule,
    visits:             t.nav.visits,
    users:              t.nav.users,
    insights:           t.nav.insights,
    'booking-requests': t.nav.bookingRequests,
    billing:            t.sidebar.billing,
    settings:           t.sidebar.settings,
    'edit-profile':     t.popover.editProfile,
    support:            t.popover.support,
    'platform-status':  t.popover.platformStatus,
    terms:              t.popover.terms,
    'privacy-policy':   t.popover.privacyPolicy,
    updates:            t.popover.updates,
    ...settingsPageTitles,
  }

  const title = pageTitles[active] ?? active

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeItem={active} onNavigate={setActive} settingsCompact={settingsCompact} />

      {/* Page placeholder */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div data-id="body-header" style={{
          padding: '0 24px', height: 70,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #dee2e6',
        }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: '#000' }}>{title}</span>

          {isSettings && (
            <div data-id="settings-layout-switcher" style={{
              display: 'flex',
              background: '#f1f3f5',
              borderRadius: 8,
              padding: 3,
              gap: 2,
            }}>
              <button
                data-id="settings-layout-with-desc"
                onClick={() => setSettingsCompact(false)}
                style={{
                  height: 28, padding: '0 12px',
                  border: 'none', borderRadius: 6,
                  background: !settingsCompact ? '#fff' : 'transparent',
                  boxShadow: !settingsCompact ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  color: !settingsCompact ? '#0a0a0a' : 'rgba(63,69,76,0.6)',
                  fontSize: 13, fontWeight: !settingsCompact ? 500 : 400,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
                }}
              >
                {t.settings.withDescriptions}
              </button>
              <button
                data-id="settings-layout-without-desc"
                onClick={() => setSettingsCompact(true)}
                style={{
                  height: 28, padding: '0 12px',
                  border: 'none', borderRadius: 6,
                  background: settingsCompact ? '#fff' : 'transparent',
                  boxShadow: settingsCompact ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  color: settingsCompact ? '#0a0a0a' : 'rgba(63,69,76,0.6)',
                  fontSize: 13, fontWeight: settingsCompact ? 500 : 400,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
                }}
              >
                {t.settings.withoutDescriptions}
              </button>
            </div>
          )}
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 12, userSelect: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(63,69,76,0.5)' }}>
                Placeholder for <em style={{ fontStyle: 'normal', color: 'rgba(63,69,76,0.7)' }}>{title}</em> content
              </span>
              <span style={{ fontSize: 13, color: 'rgba(63,69,76,0.35)', maxWidth: 340 }}>
                {t.placeholder.body}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <VenueProvider>
      <LangProvider>
        <AppContent />
      </LangProvider>
    </VenueProvider>
  )
}

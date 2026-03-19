import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { SchedulePage } from './components/SchedulePage'
import { LangProvider, useLang } from './i18n'
import { VenueProvider } from './venue'
import { getSettingsSections } from './components/settings-data'
import './index.css'

export type Variant = 'v1' | 'v2'
export type ColorMode = 'neutral' | 'color'

type ProtoId = 'p1' | 'p2' | 'p3' | 'p4'
type AppContentProps = { variant: Variant; protoId: ProtoId }

function AppContent({ variant, protoId }: AppContentProps) {
  const { t } = useLang()
  const navigate = useNavigate()
  const [active, setActive] = useState('schedule')
  const [settingsCompact, setSettingsCompact] = useState(true)
  const [isSettingsMode, setIsSettingsMode] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>('neutral')

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

  const switcherBtnStyle = (active: boolean): React.CSSProperties => ({
    height: 28, padding: '0 12px',
    border: 'none', borderRadius: 6,
    background: active ? '#fff' : 'transparent',
    boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
    color: active ? '#0a0a0a' : '#767c83',
    fontSize: 13, fontWeight: active ? 500 : 400,
    cursor: 'pointer', whiteSpace: 'nowrap' as const,
    fontFamily: "'IBM Plex Sans', sans-serif",
    transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
  })

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeItem={active} onNavigate={setActive} settingsCompact={settingsCompact} variant={variant} onSettingsModeChange={variant === 'v2' ? setIsSettingsMode : undefined} colorMode={colorMode} protoId={protoId} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginLeft: variant === 'v2' ? (isSettingsMode ? 240 : 60) : 0, transition: variant === 'v2' ? 'margin-left 0.28s cubic-bezier(0.2,0,0,1)' : undefined }}>
        {active === 'schedule' ? (
          <SchedulePage />
        ) : (
          <>
            <div data-id="body-header" style={{
              padding: '0 24px', height: 70,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid #dee2e6',
            }}>
              <span style={{ fontSize: 18, fontWeight: 500, color: '#000' }}>{title}</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {false && isSettings && (
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
                      style={switcherBtnStyle(!settingsCompact)}
                    >
                      {t.settings.withDescriptions}
                    </button>
                    <button
                      data-id="settings-layout-without-desc"
                      onClick={() => setSettingsCompact(true)}
                      style={switcherBtnStyle(settingsCompact)}
                    >
                      {t.settings.withoutDescriptions}
                    </button>
                  </div>
                )}
              </div>
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
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#767c83' }}>
                    Placeholder for <em style={{ fontStyle: 'normal', color: 'rgba(63,69,76,0.7)' }}>{title}</em> content
                  </span>
                  <span style={{ fontSize: 13, color: '#767c83', maxWidth: 340 }}>
                    {t.placeholder.body}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* DEV: color mode toggle — remove before launch */}
      <div data-id="color-mode-toggle" style={{
        position: 'fixed', bottom: 66, right: 24, zIndex: 300,
        display: 'flex',
        background: '#f1f3f5',
        borderRadius: 8,
        padding: 3,
        gap: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      }}>
        <button data-id="color-mode-neutral" onClick={() => setColorMode('neutral')} style={switcherBtnStyle(colorMode === 'neutral')}>Neutral</button>
        <button data-id="color-mode-color" onClick={() => setColorMode('color')} style={switcherBtnStyle(colorMode === 'color')}>In color</button>
      </div>

      {/* DEV: prototype switcher — remove before launch */}
      <div data-id="prototype-switcher" style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 300,
        display: 'flex',
        background: '#f1f3f5',
        borderRadius: 8,
        padding: 3,
        gap: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      }}>
        <button data-id="prototype-switcher-p1" onClick={() => navigate('/prototype1')} style={switcherBtnStyle(protoId === 'p1')}>Prototype 1</button>
        <button data-id="prototype-switcher-p2" onClick={() => navigate('/prototype2')} style={switcherBtnStyle(protoId === 'p2')}>Prototype 2</button>
        <button data-id="prototype-switcher-p3" onClick={() => navigate('/prototype3')} style={switcherBtnStyle(protoId === 'p3')}>Prototype 3</button>
        <button data-id="prototype-switcher-p4" onClick={() => navigate('/prototype4')} style={switcherBtnStyle(protoId === 'p4')}>Prototype 4</button>
      </div>
    </div>
  )
}

function PrototypeRoutes() {
  return (
    <Routes>
      <Route path="/prototype1" element={<AppContent key="p1" variant="v1" protoId="p1" />} />
      <Route path="/prototype2" element={<AppContent key="p2" variant="v2" protoId="p2" />} />
      <Route path="/prototype3" element={<AppContent key="p3" variant="v1" protoId="p3" />} />
      <Route path="/prototype4" element={<AppContent key="p4" variant="v2" protoId="p4" />} />
      <Route path="*" element={<Navigate to="/prototype1" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <VenueProvider>
      <LangProvider>
        <PrototypeRoutes />
      </LangProvider>
    </VenueProvider>
  )
}

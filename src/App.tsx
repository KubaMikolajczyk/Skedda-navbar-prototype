import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { SchedulePage } from './components/SchedulePage'
import { LangProvider, useLang } from './i18n'
import { VenueProvider } from './venue'
import { getSettingsSections } from './components/settings-data'
import './index.css'

export type Variant = 'v1' | 'v2'
export type ColorMode = 'neutral' | 'color'

type ProtoId = 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6'
type AppContentProps = { variant: Variant; protoId: ProtoId }

function AppContent({ variant, protoId }: AppContentProps) {
  const { t } = useLang()
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

      {/* Prototype settings card */}
      <div data-id="color-mode-card" style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 300,
        width: 280,
        background: '#fff',
        borderRadius: 10,
        border: '1.5px solid var(--color-primary)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
        padding: '16px',
        display: 'flex', flexDirection: 'column', gap: 12,
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>Prototype settings</span>
          <span style={{ fontSize: 12, color: '#767c83', lineHeight: 1.5 }}>
            See this prototype in neutral colors or using the venue's primary color. Which do you prefer and why?
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {(['neutral', 'color'] as const).map((mode) => {
            const active = colorMode === mode
            const label = mode === 'neutral' ? 'A) Neutral' : 'B) In color'
            return (
              <button
                key={mode}
                data-id={`color-mode-${mode}`}
                onClick={() => setColorMode(mode)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px',
                  border: active ? '1.5px solid var(--color-primary)' : '1.5px solid #dee2e6',
                  borderRadius: 6,
                  background: active ? 'var(--color-primary-light)' : '#fff',
                  color: active ? 'var(--color-primary-dark)' : '#3f454c',
                  fontSize: 13, fontWeight: active ? 500 : 400,
                  textAlign: 'left', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  border: active ? '2px solid var(--color-primary)' : '2px solid #c8cdd2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {active && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'block' }} />}
                </span>
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function SideBySidePane({ variant, label, protoId }: { variant: Variant; label: string; protoId: ProtoId }) {
  const [active, setActive] = useState('schedule')
  const [isSettingsMode, setIsSettingsMode] = useState(false)
  const isV2 = variant === 'v2'

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.14)', minWidth: 0, background: '#fff' }}>
      {/* Black label strip */}
      <div style={{
        background: '#000', color: '#fff',
        padding: '10px 16px',
        fontSize: 13, fontWeight: 500, flexShrink: 0,
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}>
        {label}
      </div>
      {/* App content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <Sidebar
          activeItem={active}
          onNavigate={setActive}
          variant={variant}
          onSettingsModeChange={isV2 ? setIsSettingsMode : undefined}
          protoId={protoId}
          containerized
        />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          marginLeft: isV2 ? (isSettingsMode ? 240 : 60) : 0,
          transition: isV2 ? 'margin-left 0.28s cubic-bezier(0.2,0,0,1)' : undefined,
        }}>
          {active === 'schedule' ? (
            <SchedulePage singleColumn />
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, color: '#767c83', fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Placeholder for {active} content
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SideBySideLayout({ protoId }: { protoId: ProtoId }) {
  return (
    <div style={{
      display: 'flex', height: '100vh',
      background: '#e5e7eb',
      padding: 20, gap: 20,
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <SideBySidePane variant="v1" label="Click to collapse / expand" protoId={protoId} />
      <SideBySidePane variant="v2" label="Hover to expand (overlay)" protoId={protoId} />
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
      <Route path="/prototype5" element={<SideBySideLayout protoId="p5" />} />
      <Route path="/prototype6" element={<SideBySideLayout protoId="p6" />} />
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

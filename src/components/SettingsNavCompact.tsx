import { useState } from 'react'
import { SETTINGS_SECTIONS } from './settings-data'
import { SettingsSearch } from './SettingsSearch'

const ICON_MINUS = '/icons/settings/minus.svg'

type Props = {
  activeItem: string
  onNavigate: (id: string) => void
  onBack: () => void
}

export function SettingsNavCompact({ activeItem, onNavigate, onBack }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(
    () => Object.fromEntries(SETTINGS_SECTIONS.map(s => [s.id, false]))
  )
  const [searchOpen, setSearchOpen] = useState(false)

  function toggleSection(id: string) {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      <div data-id="settings-nav-compact" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: 'rgba(248,249,250,0.4)',
        borderRight: '1px solid #dee2e6',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 8,
          flexShrink: 0,
          minHeight: 54,
        }}>
          <button
            data-id="settings-nav-back-btn"
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              height: 32, padding: '0 8px',
              border: 'none', borderRadius: 4,
              background: 'transparent',
              color: '#0a0a0a', fontSize: 14, fontWeight: 400,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>

          <button
            data-id="settings-nav-search-btn"
            onClick={() => setSearchOpen(true)}
            style={{
              width: 32, height: 32,
              border: 'none', borderRadius: 4,
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0, padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
        </div>

        {/* Scrollable sections */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
          {SETTINGS_SECTIONS.map(section => (
            <div key={section.id} data-id={`settings-nav-compact-section-${section.id}`} style={{ marginBottom: 4 }}>

              {/* Section header button */}
              <button
                data-id={`settings-nav-compact-section-${section.id}-toggle`}
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: 8,
                  height: 32, padding: 8,
                  border: 'none', borderRadius: 8,
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <img src={section.sectionIcon} alt="" style={{ width: 20, height: 16, flexShrink: 0, objectFit: 'contain' }} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#0a0a0a', textAlign: 'left', lineHeight: 1.5 }}>
                  {section.compactTitle}
                </span>
                {collapsed[section.id] ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.4)" strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                ) : (
                  <img src={ICON_MINUS} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
                )}
              </button>

              {/* Collapsible sub-items with grid animation */}
              <div style={{
                display: 'grid',
                gridTemplateRows: collapsed[section.id] ? '0fr' : '1fr',
                transition: 'grid-template-rows 0.25s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <div style={{ position: 'relative', paddingLeft: 27, paddingRight: 24, paddingTop: 2, paddingBottom: 2 }}>
                    {/* Vertical border line */}
                    <div style={{
                      position: 'absolute', left: 16, top: 0, bottom: 0, width: 1,
                      background: '#dee2e6',
                    }} />
                    {section.items.map(item => {
                      const active = activeItem === item.id
                      return (
                        <button
                          key={item.id}
                          data-id={`settings-nav-item-${item.id}`}
                          onClick={() => onNavigate(item.id)}
                          style={{
                            width: '100%',
                            display: 'flex', alignItems: 'center',
                            height: 28,
                            padding: '0 8px',
                            border: 'none', borderRadius: 8,
                            background: active ? 'rgba(241,243,245,0.8)' : 'transparent',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            textAlign: 'left',
                          }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(241,243,245,0.5)' }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? 'rgba(241,243,245,0.8)' : 'transparent' }}
                        >
                          <span style={{
                            fontSize: 14, fontWeight: 400, lineHeight: 1.5,
                            color: '#0a0a0a',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            width: '100%',
                          }}>
                            {item.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {searchOpen && (
        <SettingsSearch
          onNavigate={id => { onNavigate(id); setSearchOpen(false) }}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </>
  )
}

import { useState } from 'react'
import { getSettingsSections } from './settings-data'
import { SettingsSearch } from './SettingsSearch'
import { SettingsNavCompact } from './SettingsNavCompact'
import { useLang } from '../i18n'

const ICON_MINUS = '/icons/settings/minus.svg'

type Props = {
  activeItem: string
  onNavigate: (id: string) => void
  onBack: () => void
  compact?: boolean
}

export function SettingsNav({ activeItem, onNavigate, onBack, compact }: Props) {
  const { t } = useLang()
  const sections = getSettingsSections(t)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(
    () => Object.fromEntries(sections.map(s => [s.id, false]))
  )
  const [searchOpen, setSearchOpen] = useState(false)

  if (compact) {
    return <SettingsNavCompact activeItem={activeItem} onNavigate={onNavigate} onBack={onBack} />
  }

  function toggleSection(id: string) {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      <div data-id="settings-nav" style={{
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

        {/* Scrollable items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
          {sections.map(section => (
            <div key={section.id} data-id={`settings-nav-section-${section.id}`} style={{ marginBottom: 16 }}>

              {/* Section toggle header */}
              <button
                data-id={`settings-nav-section-${section.id}-toggle`}
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 4px 0 0',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  marginBottom: 8,
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: '#3f454c', lineHeight: 1.5 }}>
                  {section.title}
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

              {/* Section items — grid trick for smooth height animation */}
              <div style={{
                display: 'grid',
                gridTemplateRows: collapsed[section.id] ? '0fr' : '1fr',
                transition: 'grid-template-rows 0.25s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  {section.items.map(item => {
                    const active = activeItem === item.id
                    return (
                      <button
                        key={item.id}
                        data-id={`settings-nav-item-${item.id}`}
                        onClick={() => onNavigate(item.id)}
                        title={item.description}
                        style={{
                          width: '100%',
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: 8,
                          border: 'none', borderRadius: 4,
                          background: active ? '#f1f3f5' : 'transparent',
                          textAlign: 'left', cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(241,243,245,0.5)' }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? '#f1f3f5' : 'transparent' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                          <img src={item.icon} alt="" style={{ width: 20, height: 16, flexShrink: 0, objectFit: 'contain' }} />
                          <span style={{
                            fontSize: 14, fontWeight: 400, lineHeight: 1.5,
                            color: '#212529',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {item.label}
                          </span>
                        </div>
                        <div style={{ paddingLeft: 28, width: '100%' }}>
                          <span style={{
                            fontSize: 14, fontWeight: 400, lineHeight: 1.5,
                            color: 'rgba(63,69,76,0.5)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            display: 'block',
                          }}>
                            {item.description}
                          </span>
                        </div>
                      </button>
                    )
                  })}
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

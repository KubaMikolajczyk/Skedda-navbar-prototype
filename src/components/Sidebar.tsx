import { useRef, useState } from 'react'
import { useLang } from '../i18n'
import { useVenue } from '../venue'
import { UserPopover } from './UserPopover'
import { SettingsNav } from './SettingsNav'

const PANEL_ICON    = '/icons/sidebar/panel.svg'
const ICON_SCHEDULE = '/icons/sidebar/schedule.svg'
const ICON_VISITS   = '/icons/sidebar/visits.svg'
const ICON_USERS    = '/icons/sidebar/users.svg'
const ICON_INSIGHTS = '/icons/sidebar/insights.svg'
const ICON_BOOKING  = '/icons/sidebar/booking.svg'
const ICON_BILLING  = '/icons/sidebar/billing.svg'
const ICON_SETTINGS = '/icons/settings/gear.svg'
const AVATAR_JAMES  = '/avatars/avatar_test.png'

const SETTINGS_PANEL_WIDTH = 240

type Props = {
  activeItem: string
  onNavigate: (id: string) => void
  settingsCompact?: boolean
}

export function Sidebar({ activeItem, onNavigate, settingsCompact }: Props) {
  const { t } = useLang()
  const { venue } = useVenue()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [settingsMode, setSettingsMode] = useState(false)
  const userBtnRef = useRef<HTMLButtonElement>(null)
  const prevPageRef = useRef<string>('schedule')
  const prevCollapsedRef = useRef<boolean>(false)

  const navItems = [
    { id: 'schedule',         label: t.nav.schedule,         icon: ICON_SCHEDULE },
    { id: 'visits',           label: t.nav.visits,           icon: ICON_VISITS   },
    { id: 'users',            label: t.nav.users,            icon: ICON_USERS    },
    { id: 'insights',         label: t.nav.insights,         icon: ICON_INSIGHTS },
    { id: 'booking-requests', label: t.nav.bookingRequests,  icon: ICON_BOOKING  },
  ]

  const labelStyle = (extraStyle?: React.CSSProperties): React.CSSProperties => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    opacity: isCollapsed ? 0 : 1,
    maxWidth: isCollapsed ? 0 : 200,
    transition: 'opacity 0.2s ease, max-width 0.25s cubic-bezier(0.4,0,0.2,1)',
    ...extraStyle,
  })

  function openSettings() {
    prevPageRef.current = activeItem
    prevCollapsedRef.current = isCollapsed
    setIsCollapsed(false)
    setSettingsMode(true)
    onNavigate('settings-basics')
  }

  function closeSettings() {
    setSettingsMode(false)
    setIsCollapsed(prevCollapsedRef.current)
    onNavigate(prevPageRef.current)
  }

  return (
    <>
      <aside data-id="sidebar" style={{
        width: isCollapsed ? 60 : 240,
        minWidth: isCollapsed ? 60 : 240,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(248,249,250,0.4)',
        borderRight: '1px solid #dee2e6',
        fontFamily: "'IBM Plex Sans', sans-serif",
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.2,0,0,1)',
        opacity: settingsMode ? 0 : 1,
        pointerEvents: settingsMode ? 'none' : 'auto',
      }}>

        {/* ── Header: logo + toggle ── */}
        <div data-id="sidebar-header" style={{ padding: 8 }}>
          {isCollapsed ? (
            <div className="sidebar-header-collapsed">
              <div className="logo-layer" data-id="sidebar-logo" style={{
                width: 38, height: 38,
                background: 'var(--color-primary)',
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src={venue.logo} alt={venue.name} style={{ width: 28, height: 28, objectFit: 'contain' }} />
              </div>
              <button
                className="open-btn-layer"
                data-id="sidebar-collapse-btn"
                data-tooltip={t.sidebar.openSidebar}
                onClick={() => setIsCollapsed(false)}
                style={{
                  width: 38, height: 38,
                  background: '#fff',
                  border: '1px solid #dee2e6',
                  borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                }}
              >
                <img src={PANEL_ICON} alt="" style={{ width: 20, height: 16 }} />
              </button>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 8,
              borderRadius: 8,
            }}>
              <div data-id="sidebar-logo" style={{
                width: 38, height: 38,
                background: 'var(--color-primary)',
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <img src={venue.logo} alt={venue.name} style={{ width: 28, height: 28, objectFit: 'contain' }} />
              </div>
              <button
                data-id="sidebar-collapse-btn"
                data-tooltip={t.sidebar.closeSidebar}
                onClick={() => setIsCollapsed(true)}
                style={{
                  width: 38, height: 38,
                  background: '#fff',
                  border: '1px solid #dee2e6',
                  borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                }}
              >
                <img src={PANEL_ICON} alt="" style={{ width: 20, height: 16 }} />
              </button>
            </div>
          )}
        </div>

        {/* ── Nav items ── */}
        <nav data-id="sidebar-nav" style={{ padding: '0 8px', flex: 1 }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(item => {
              const active = activeItem === item.id
              return (
                <li key={item.id}>
                  <button
                    data-id={`nav-item-${item.id}`}
                    data-tooltip={isCollapsed ? item.label : undefined}
                    onClick={() => onNavigate(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      height: 32,
                      paddingLeft: isCollapsed ? 12 : 8,
                      paddingRight: 8,
                      border: 'none',
                      borderRadius: 4,
                      background: active ? 'rgba(241,243,245,0.8)' : 'transparent',
                      color: '#0a0a0a',
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: 1.5,
                      textAlign: 'left',
                      transition: 'background 0.1s, padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(241,243,245,0.5)' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                  >
                    <img src={item.icon} alt="" style={{ width: 20, height: 16, flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)' }} />
                    <span style={labelStyle({ textOverflow: 'ellipsis' })}>
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ── Footer ── */}
        <div data-id="sidebar-footer" style={{ padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>

          {/* Billing */}
          <button data-id="sidebar-billing-btn" data-tooltip={isCollapsed ? t.sidebar.billing : undefined} data-tooltip-top={!isCollapsed ? t.sidebar.trial : undefined} onClick={() => onNavigate('billing')} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            height: 32, paddingLeft: isCollapsed ? 12 : 8, paddingRight: 8, border: 'none', borderRadius: 8,
            background: activeItem === 'billing' ? 'rgba(241,243,245,0.8)' : 'transparent', color: '#0a0a0a', fontSize: 14, lineHeight: 1.5, textAlign: 'left',
            transition: 'padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(241,243,245,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = activeItem === 'billing' ? 'rgba(241,243,245,0.8)' : 'transparent'}
          >
            <img src={ICON_BILLING} alt="" style={{ width: 20, height: 16, flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)' }} />
            <span style={labelStyle()}>{t.sidebar.billing}</span>
            <span
              style={labelStyle({
                marginLeft: 'auto',
                display: 'inline-flex', alignItems: 'center',
                height: 20, padding: '0 8px',
                background: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary-border)',
                borderRadius: 4,
                fontSize: 12, fontWeight: 600, color: 'var(--color-primary-dark)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              })}>
              Trial
            </span>
          </button>

          {/* Settings */}
          <button data-id="sidebar-settings-btn" data-tooltip={isCollapsed ? t.sidebar.settings : undefined} onClick={openSettings} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            height: 32, paddingLeft: isCollapsed ? 12 : 8, paddingRight: 8, border: 'none', borderRadius: 8,
            background: settingsMode ? 'rgba(241,243,245,0.8)' : 'transparent', color: '#0a0a0a', fontSize: 14, lineHeight: 1.5, textAlign: 'left',
            transition: 'padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(241,243,245,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = settingsMode ? 'rgba(241,243,245,0.8)' : 'transparent'}
          >
            <img src={ICON_SETTINGS} alt="" style={{ width: 20, height: 16, flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)' }} />
            <span style={labelStyle()}>{t.sidebar.settings}</span>
          </button>

          {/* User */}
          <button
            ref={userBtnRef}
            data-id="sidebar-user-btn"
            data-tooltip={isCollapsed ? 'James White' : undefined}
            onClick={() => setPopoverOpen(o => !o)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              paddingTop: 8, paddingBottom: 8, paddingLeft: isCollapsed ? 12 : 8, paddingRight: 8,
              border: 'none', borderRadius: 8,
              background: popoverOpen ? 'rgba(241,243,245,0.8)' : 'transparent',
              color: '#0a0a0a', fontSize: 14, textAlign: 'left',
              transition: 'padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { if (!popoverOpen) e.currentTarget.style.background = 'rgba(241,243,245,0.8)' }}
            onMouseLeave={e => { if (!popoverOpen) e.currentTarget.style.background = 'transparent' }}
          >
            <img src={AVATAR_JAMES} alt="James White" style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)' }} />
            <span style={labelStyle({ flex: '1', display: 'flex', flexDirection: 'column', minWidth: 0 })}>
              <span style={{ fontWeight: 400, color: '#0a0a0a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                James White
              </span>
              <span style={{ fontSize: 14, color: 'var(--color-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {venue.name}
              </span>
            </span>
            <span style={labelStyle()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </button>

        </div>
      </aside>

      {/* Settings panel — fixed overlay, slides in from left viewport edge */}
      <div data-id="sidebar-settings-panel" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SETTINGS_PANEL_WIDTH,
        height: '100vh',
        transform: settingsMode ? 'translateX(0)' : `translateX(-${SETTINGS_PANEL_WIDTH}px)`,
        pointerEvents: settingsMode ? 'auto' : 'none',
        transition: 'transform 0.28s cubic-bezier(0.2,0,0,1)',
        zIndex: 50,
      }}>
        <SettingsNav activeItem={activeItem} onNavigate={onNavigate} onBack={closeSettings} compact={settingsCompact} />
      </div>

      {/* User popover */}
      {popoverOpen && userBtnRef.current && (
        <UserPopover
          anchorEl={userBtnRef.current}
          onClose={() => setPopoverOpen(false)}
          onNavigate={(id) => { setPopoverOpen(false); onNavigate(id) }}
        />
      )}
    </>
  )
}

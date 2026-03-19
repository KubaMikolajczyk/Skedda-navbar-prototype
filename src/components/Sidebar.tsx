import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { useLang } from '../i18n'
import { useVenue, venues } from '../venue'
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

function VenueSelectPopover({ anchorEl, onClose }: { anchorEl: HTMLElement; onClose: () => void }) {
  const { venue, setVenue } = useVenue()
  const ref = useRef<HTMLDivElement>(null)
  const badgeRect = anchorEl.getBoundingClientRect()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const popH = el.offsetHeight
    const rawTop = badgeRect.bottom - popH
    const top = Math.max(8, Math.min(rawTop, window.innerHeight - popH - 8))
    el.style.top = `${top}px`
    el.style.visibility = 'visible'
  }, [badgeRect.top, badgeRect.height])

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node
      if (ref.current?.contains(target) || anchorEl.contains(target)) return
      onClose()
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [anchorEl, onClose])

  return (
    <div data-id="venue-select-popover" ref={ref} style={{
      position: 'fixed',
      top: 0,
      left: badgeRect.right + 8,
      visibility: 'hidden',
      width: 'max-content',
      minWidth: 200,
      background: '#fff',
      border: '1px solid #dee2e6',
      borderRadius: 8,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      zIndex: 200,
      fontFamily: "'IBM Plex Sans', sans-serif",
      padding: 4,
    }}>
      {venues.map(v => {
        const active = venue.name === v.name
        return (
          <button
            key={v.name}
            data-id={`venue-select-option-${v.name.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => { setVenue(v); onClose() }}
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: 32, padding: '0 8px',
              border: 'none', borderRadius: 4,
              background: 'transparent',
              fontSize: 14, color: active ? 'var(--color-primary)' : '#0a0a0a',
              fontWeight: active ? 500 : 400,
              cursor: 'pointer',
              fontFamily: "'IBM Plex Sans', sans-serif",
              textAlign: 'left', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {v.name}
            {active && <span style={{ color: 'var(--color-primary)', marginLeft: 8 }}>✓</span>}
          </button>
        )
      })}
    </div>
  )
}

import type { Variant, ColorMode } from '../App'

type Props = {
  activeItem: string
  onNavigate: (id: string) => void
  settingsCompact?: boolean
  variant?: Variant
  onSettingsModeChange?: (open: boolean) => void
  colorMode?: ColorMode
  protoId?: string
}

export function Sidebar({ activeItem, onNavigate, settingsCompact, variant: _variant, onSettingsModeChange, colorMode = 'neutral', protoId }: Props) {
  const { t } = useLang()
  const { venue } = useVenue()
  const isV2 = _variant === 'v2'
  const isColor = colorMode === 'color'
  const isP34 = protoId === 'p3' || protoId === 'p4'
  const [isCollapsed, setIsCollapsed] = useState(isV2)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [settingsMode, setSettingsMode] = useState(false)
  const [venueBadgeOpen, setVenueBadgeOpen] = useState(false)
  const [venueBadgeTop, setVenueBadgeTop] = useState(0)
  const userBtnRef = useRef<HTMLButtonElement>(null)
  const venueBadgeRef = useRef<HTMLButtonElement>(null)
  const prevPageRef = useRef<string>('schedule')
  const prevCollapsedRef = useRef<boolean>(false)
  const mouseOverSidebarRef = useRef(false)

  // v2: collapse when popover closes if mouse has left the sidebar
  useEffect(() => {
    if (isV2 && !popoverOpen && !venueBadgeOpen && !mouseOverSidebarRef.current) {
      setIsCollapsed(true)
    }
  }, [isV2, popoverOpen, venueBadgeOpen])

  useLayoutEffect(() => {
    if (!userBtnRef.current) return
    const r = userBtnRef.current.getBoundingClientRect()
    // Venue name is the second line: ~8px padding + ~20px first line = 28px from button top, centered at +10
    setVenueBadgeTop(r.top + 38)
  }, [isCollapsed])

  const navItems = [
    { id: 'schedule',         label: t.nav.schedule,         icon: ICON_SCHEDULE },
    { id: 'visits',           label: t.nav.visits,           icon: ICON_VISITS   },
    ...(!isP34 ? [
      { id: 'users',            label: t.nav.users,            icon: ICON_USERS    },
      { id: 'insights',         label: t.nav.insights,         icon: ICON_INSIGHTS },
    ] : []),
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
    onSettingsModeChange?.(true)
  }

  function closeSettings() {
    setSettingsMode(false)
    setIsCollapsed(prevCollapsedRef.current)
    onNavigate(prevPageRef.current)
    onSettingsModeChange?.(false)
  }

  return (
    <>
      <aside data-id="sidebar" style={{
        width: isCollapsed ? 60 : 240,
        minWidth: isCollapsed ? 60 : 240,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: isColor ? 'var(--color-primary-dark)' : (isV2 ? '#fcfdfd' : 'rgba(248,249,250,0.4)'),
        borderRight: isColor ? '1px solid rgba(255,255,255,0.08)' : '1px solid #dee2e6',
        fontFamily: "'IBM Plex Sans', sans-serif",
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.2,0,0,1)',
        opacity: settingsMode ? 0 : 1,
        pointerEvents: settingsMode ? 'none' : 'auto',
        ...(isV2 ? { position: 'fixed' as const, top: 0, left: 0, zIndex: 100 } : {}),
      }}
      onMouseEnter={() => { if (isV2) { mouseOverSidebarRef.current = true; setIsCollapsed(false) } }}
      onMouseLeave={() => { if (isV2) { mouseOverSidebarRef.current = false; if (!popoverOpen && !venueBadgeOpen) setIsCollapsed(true) } }}
      >

        {/* ── Header: logo + toggle ── */}
        <div data-id="sidebar-header" style={{ padding: 8 }}>
          {isV2 ? (
            // v2: single static logo — no toggle, no conditional swap, no jump during width transition
            <div data-id="sidebar-logo" style={{
              width: 38, height: 38, margin: '8px 0 8px 3px',
              background: 'var(--color-primary)',
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={venue.logo} alt={venue.name} style={{ width: 28, height: 28, objectFit: 'contain' }} />
            </div>
          ) : isCollapsed ? (
            // v1 collapsed: logo ↔ toggle button CSS crossfade on hover
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
                data-id="sidebar-collapse-btn" data-color-mode={colorMode}
                data-tooltip={t.sidebar.openSidebar}
                onClick={() => { setIsCollapsed(false); setVenueBadgeOpen(false) }}
                style={{
                  width: 38, height: 38,
                  background: isColor ? 'rgba(255,255,255,0.15)' : '#fff',
                  border: isColor ? '1px solid rgba(255,255,255,0.25)' : '1px solid #dee2e6',
                  borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                }}
              >
                <img src={PANEL_ICON} alt="" style={{ width: 20, height: 16, filter: isColor ? 'brightness(0) invert(1)' : undefined }} />
              </button>
            </div>
          ) : (
            // v1 expanded: logo + collapse toggle button
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 8, borderRadius: 8,
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
                data-id="sidebar-collapse-btn" data-color-mode={colorMode}
                data-tooltip={t.sidebar.closeSidebar}
                onClick={() => setIsCollapsed(true)}
                style={{
                  width: 38, height: 38,
                  background: isColor ? 'rgba(255,255,255,0.15)' : '#fff',
                  border: isColor ? '1px solid rgba(255,255,255,0.25)' : '1px solid #dee2e6',
                  borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                }}
              >
                <img src={PANEL_ICON} alt="" style={{ width: 20, height: 16, filter: isColor ? 'brightness(0) invert(1)' : undefined }} />
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
                      background: active ? (isColor ? 'rgba(255,255,255,0.15)' : 'rgba(241,243,245,0.8)') : 'transparent',
                      color: isColor ? '#ffffff' : '#0a0a0a',
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: 1.5,
                      textAlign: 'left',
                      transition: 'background 0.1s, padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
                    }}
                    onMouseEnter={e => { if (!active && !(isV2 && isCollapsed)) e.currentTarget.style.background = isColor ? 'rgba(255,255,255,0.1)' : 'rgba(241,243,245,0.5)' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                  >
                    <img src={item.icon} alt="" style={{ width: 20, height: 16, flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)', filter: isColor ? 'brightness(0) invert(1)' : undefined }} />
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
          {!isP34 && <button data-id="sidebar-billing-btn" data-tooltip={isCollapsed ? t.sidebar.billing : undefined} data-tooltip-top={!isCollapsed ? t.sidebar.trial : undefined} onClick={() => onNavigate('billing')} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            height: 32, paddingLeft: isCollapsed ? 12 : 8, paddingRight: 8, border: 'none', borderRadius: 8,
            background: activeItem === 'billing' ? (isColor ? 'rgba(255,255,255,0.15)' : 'rgba(241,243,245,0.8)') : 'transparent', color: isColor ? '#ffffff' : '#0a0a0a', fontSize: 14, lineHeight: 1.5, textAlign: 'left',
            transition: 'padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
            onMouseEnter={e => { if (!(isV2 && isCollapsed)) e.currentTarget.style.background = isColor ? 'rgba(255,255,255,0.1)' : 'rgba(241,243,245,0.8)' }}
            onMouseLeave={e => e.currentTarget.style.background = activeItem === 'billing' ? (isColor ? 'rgba(255,255,255,0.15)' : 'rgba(241,243,245,0.8)') : 'transparent'}
          >
            <img src={ICON_BILLING} alt="" style={{ width: 20, height: 16, flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)', filter: isColor ? 'brightness(0) invert(1)' : undefined }} />
            <span style={labelStyle()}>{t.sidebar.billing}</span>
            <span
              style={labelStyle({
                marginLeft: 'auto',
                display: 'inline-flex', alignItems: 'center',
                height: 20, padding: '0 8px',
                background: isColor ? 'rgba(255,255,255,0.15)' : 'var(--color-primary-light)',
                border: isColor ? '1px solid rgba(255,255,255,0.25)' : '1px solid var(--color-primary-border)',
                borderRadius: 4,
                fontSize: 12, fontWeight: 600, color: isColor ? '#ffffff' : 'var(--color-primary-dark)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              })}>
              Trial
            </span>
          </button>}

          {/* Settings */}
          {!isP34 && <button data-id="sidebar-settings-btn" data-tooltip={isCollapsed ? t.sidebar.settings : undefined} onClick={openSettings} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            height: 32, paddingLeft: isCollapsed ? 12 : 8, paddingRight: 8, border: 'none', borderRadius: 8,
            background: settingsMode ? (isColor ? 'rgba(255,255,255,0.15)' : 'rgba(241,243,245,0.8)') : 'transparent', color: isColor ? '#ffffff' : '#0a0a0a', fontSize: 14, lineHeight: 1.5, textAlign: 'left',
            transition: 'padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
            onMouseEnter={e => { if (!(isV2 && isCollapsed)) e.currentTarget.style.background = isColor ? 'rgba(255,255,255,0.1)' : 'rgba(241,243,245,0.8)' }}
            onMouseLeave={e => e.currentTarget.style.background = settingsMode ? (isColor ? 'rgba(255,255,255,0.15)' : 'rgba(241,243,245,0.8)') : 'transparent'}
          >
            <img src={ICON_SETTINGS} alt="" style={{ width: 20, height: 16, flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)', filter: isColor ? 'brightness(0) invert(1)' : undefined }} />
            <span style={labelStyle()}>{t.sidebar.settings}</span>
          </button>}

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
              background: popoverOpen ? (isColor ? 'rgba(255,255,255,0.15)' : 'rgba(241,243,245,0.8)') : 'transparent',
              color: isColor ? '#ffffff' : '#0a0a0a', fontSize: 14, textAlign: 'left',
              transition: 'padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { if (!popoverOpen && !(isV2 && isCollapsed)) e.currentTarget.style.background = isColor ? 'rgba(255,255,255,0.1)' : 'rgba(241,243,245,0.8)' }}
            onMouseLeave={e => { if (!popoverOpen) e.currentTarget.style.background = 'transparent' }}
          >
            <img src={AVATAR_JAMES} alt="James White" style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginRight: isCollapsed ? 0 : 8, transition: 'margin-right 0.25s cubic-bezier(0.4,0,0.2,1)' }} />
            <span style={labelStyle({ flex: '1', display: 'flex', flexDirection: 'column', minWidth: 0 })}>
              <span style={{ fontWeight: 400, color: isColor ? '#ffffff' : '#0a0a0a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                James White
              </span>
              <span style={{ fontSize: 14, color: isColor ? 'var(--color-primary-light)' : 'var(--color-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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

      {/* Venue badge — visible only when collapsed */}
      {isCollapsed && !settingsMode && (
        <button
          ref={venueBadgeRef}
          data-id="venue-badge"
          onClick={() => setVenueBadgeOpen(o => !o)}
          style={{
            position: 'fixed',
            left: 68,
            top: venueBadgeTop,
            transform: 'translateY(-50%)',
            zIndex: 10,
            display: 'flex', alignItems: 'center',
            height: 20, padding: '0 8px',
            background: isColor ? 'var(--color-primary-dark)' : 'var(--color-primary-light)',
            border: isColor ? '1px solid var(--color-primary)' : '1px solid var(--color-primary-border)',
            borderRadius: 4,
            color: isColor ? '#ffffff' : 'var(--color-primary-dark)',
            fontSize: 12, fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {venue.name}
        </button>
      )}

      {/* Venue select popover — triggered from badge */}
      {venueBadgeOpen && venueBadgeRef.current && (
        <VenueSelectPopover
          anchorEl={venueBadgeRef.current}
          onClose={() => setVenueBadgeOpen(false)}
        />
      )}

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

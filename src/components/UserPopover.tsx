import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLang, langLabels, type Lang } from '../i18n'
import { useVenue, venues } from '../venue'

const AVATAR_JAMES = '/avatars/avatar_test.png'

const POPOVER_WIDTH = 280
const SUBPOPOVER_WIDTH = 260
const ROW_HEIGHT = 32


type Props = {
  anchorEl: HTMLElement
  onClose: () => void
  onNavigate: (id: string) => void
}

export function UserPopover({ anchorEl, onClose, onNavigate }: Props) {
  const { lang, setLang, t } = useLang()
  const { venue, setVenue } = useVenue()
  const [langOpen, setLangOpen] = useState(false)
  const [langRowTop, setLangRowTop] = useState(0)
  const [venueOpen, setVenueOpen] = useState(false)
  const [venueRowTop, setVenueRowTop] = useState(0)

  const popoverRef = useRef<HTMLDivElement>(null)
  const langSubRef = useRef<HTMLDivElement>(null)
  const venueSubRef = useRef<HTMLDivElement>(null)
  const langRowRef = useRef<HTMLButtonElement>(null)
  const venueRowRef = useRef<HTMLButtonElement>(null)

  const rect = anchorEl.getBoundingClientRect()
  const left = rect.right + 8

  // Measure actual popover height after render and clamp to viewport
  useLayoutEffect(() => {
    const el = popoverRef.current
    if (!el) return
    const popH = el.offsetHeight
    const rawTop = rect.bottom - popH
    const top = Math.max(8, Math.min(rawTop, window.innerHeight - popH - 8))
    el.style.top = `${top}px`
    el.style.visibility = 'visible'
  }, [rect.bottom])

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node
      if (
        popoverRef.current?.contains(target) ||
        langSubRef.current?.contains(target) ||
        venueSubRef.current?.contains(target) ||
        anchorEl.contains(target)
      ) return
      onClose()
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [anchorEl, onClose])

  function handleLangRowClick() {
    if (langRowRef.current) setLangRowTop(langRowRef.current.getBoundingClientRect().top)
    setLangOpen(o => !o)
    setVenueOpen(false)
  }

  function handleVenueRowClick() {
    if (venueRowRef.current) setVenueRowTop(venueRowRef.current.getBoundingClientRect().top)
    setVenueOpen(o => !o)
    setLangOpen(false)
  }

  function handleSelectLang(l: Lang) {
    setLang(l)
    setLangOpen(false)
  }

  function handleSelectVenue(v: typeof venues[number]) {
    setVenue(v)
    setVenueOpen(false)
  }

  const popoverStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left,
    visibility: 'hidden',
    width: POPOVER_WIDTH,
    background: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: 8,
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    zIndex: 200,
    fontFamily: "'IBM Plex Sans', sans-serif",
    overflow: 'hidden',
  }

  const divider: React.CSSProperties = {
    height: 1,
    background: '#dee2e6',
    margin: '4px 0',
  }

  const rowStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ROW_HEIGHT,
    padding: '0 8px',
    border: 'none',
    borderRadius: 4,
    background: 'transparent',
    fontSize: 14,
    lineHeight: 1.5,
    color: '#0a0a0a',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: "'IBM Plex Sans', sans-serif",
    ...extra,
  })

  const subPopoverStyle = (top: number): React.CSSProperties => ({
    position: 'fixed',
    top,
    left: left + POPOVER_WIDTH + 4,
    width: SUBPOPOVER_WIDTH,
    background: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: 8,
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    zIndex: 201,
    fontFamily: "'IBM Plex Sans', sans-serif",
    overflow: 'hidden',
    padding: '4px',
  })

  const subOptionStyle = (active: boolean): React.CSSProperties => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ROW_HEIGHT,
    padding: '0 8px',
    border: 'none',
    borderRadius: 4,
    background: 'transparent',
    fontSize: 14,
    lineHeight: 1.5,
    color: active ? 'var(--color-primary)' : '#0a0a0a',
    fontWeight: active ? 500 : 400,
    cursor: 'pointer',
    fontFamily: "'IBM Plex Sans', sans-serif",
    textAlign: 'left',
    whiteSpace: 'nowrap',
  })

  const chevronRight = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0, color: 'rgba(63,69,76,0.5)' }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )

  return (
    <>
      {/* Main popover */}
      <div data-id="user-popover" ref={popoverRef} style={popoverStyle}>

        {/* Header */}
        <div data-id="user-popover-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img data-id="user-popover-avatar" src={AVATAR_JAMES} alt="James White" style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0 }} />
            <span data-id="user-popover-name" style={{ fontSize: 14, fontWeight: 500, color: '#0a0a0a' }}>James White</span>
          </div>
          <button
            data-id="user-popover-edit-profile-btn"
            onClick={() => onNavigate('edit-profile')}
            style={{ border: 'none', background: 'none', fontSize: 14, color: 'rgba(63,69,76,0.6)', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0a0a0a')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(63,69,76,0.6)')}
          >
            {t.popover.editProfile}
          </button>
        </div>

        <div style={divider} />

        <div style={{ padding: '4px' }}>

          {/* Language row */}
          <button
            data-id="user-popover-language-row"
            ref={langRowRef}
            onClick={handleLangRowClick}
            style={rowStyle({ background: langOpen ? 'rgba(241,243,245,0.8)' : 'transparent' })}
            onMouseEnter={e => { if (!langOpen) e.currentTarget.style.background = 'rgba(241,243,245,0.8)' }}
            onMouseLeave={e => { if (!langOpen) e.currentTarget.style.background = 'transparent' }}
          >
            <span>
              <strong style={{ fontWeight: 600 }}>{t.popover.language}:</strong>{' '}
              <span style={{ color: 'rgba(63,69,76,0.7)' }}>{langLabels[lang]}</span>
            </span>
            {chevronRight}
          </button>

          {/* Venue row */}
          <button
            data-id="user-popover-venue-row"
            ref={venueRowRef}
            onClick={handleVenueRowClick}
            style={rowStyle({ background: venueOpen ? 'rgba(241,243,245,0.8)' : 'transparent' })}
            onMouseEnter={e => { if (!venueOpen) e.currentTarget.style.background = 'rgba(241,243,245,0.8)' }}
            onMouseLeave={e => { if (!venueOpen) e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0, flex: 1 }}>
              <strong style={{ fontWeight: 600 }}>{t.popover.venue}:</strong>{' '}
              <span style={{ color: 'rgba(63,69,76,0.7)' }}>{venue.name}</span>
            </span>
            <span style={{ flexShrink: 0, marginLeft: 8 }}>{chevronRight}</span>
          </button>

        </div>

        <div style={divider} />

        <div style={{ padding: '4px' }}>
          {([
            [t.popover.support,        'user-popover-support-btn',         'support'],
            [t.popover.platformStatus, 'user-popover-platform-status-btn', 'platform-status'],
            [t.popover.terms,          'user-popover-terms-btn',           'terms'],
            [t.popover.privacyPolicy,  'user-popover-privacy-btn',         'privacy-policy'],
            [t.popover.updates,        'user-popover-updates-btn',         'updates'],
          ] as [string, string, string][]).map(([label, id, route]) => (
            <button
              key={id}
              data-id={id}
              onClick={() => onNavigate(route)}
              style={rowStyle()}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={divider} />

        <div style={{ padding: '4px 4px 8px' }}>
          <button
            data-id="user-popover-logout-btn"
            style={rowStyle()}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {t.popover.logOut}
          </button>
        </div>

      </div>

      {/* Language sub-popover */}
      {langOpen && (
        <div data-id="lang-subpopover" ref={langSubRef} style={subPopoverStyle(langRowTop)}>
          {(Object.entries(langLabels) as [Lang, string][]).map(([code, label]) => {
            const active = lang === code
            return (
              <button
                key={code}
                data-id={`lang-option-${code}`}
                onClick={() => handleSelectLang(code)}
                style={subOptionStyle(active)}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {label}
                {active && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
              </button>
            )
          })}
        </div>
      )}

      {/* Venue sub-popover */}
      {venueOpen && (
        <div data-id="venue-subpopover" ref={venueSubRef} style={subPopoverStyle(venueRowTop)}>
          {venues.map(v => {
            const active = venue.name === v.name
            return (
              <button
                key={v.name}
                data-id={`venue-option-${v.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleSelectVenue(v)}
                style={subOptionStyle(active)}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,243,245,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {v.name}
                {active && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

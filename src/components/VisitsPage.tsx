import { useState, useRef } from 'react'
import { useVenue } from '../venue'

function ClipboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1" ry="1"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="16" x2="13" y2="16"/>
    </svg>
  )
}

const btnBase: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 5,
  height: 30, padding: '0 10px',
  border: '1px solid #dee2e6', borderRadius: 4,
  background: '#fff', cursor: 'pointer',
  fontSize: 13, color: '#3f454c',
  fontFamily: "'IBM Plex Sans', sans-serif",
  whiteSpace: 'nowrap',
}

export function VisitsPage() {
  const { venue } = useVenue()
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  function triggerToast() {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setShowToast(true)
    toastTimer.current = setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div data-id="visits-page" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff', position: 'relative' }}>

      {/* Top bar */}
      <div data-id="visits-topbar" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px', height: 68, flexShrink: 0,
        borderBottom: '1px solid #dee2e6',
        minWidth: 'max-content',
      }}>

        {/* Visits / Deliveries tabs */}
        <div data-id="visits-tabs" style={{
          display: 'flex',
          background: '#e4e7eb',
          borderRadius: 6,
          padding: 3,
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
        }}>
          {(['Visits', 'Deliveries'] as const).map(tab => (
            <button
              key={tab}
              data-id={`visits-tab-${tab.toLowerCase()}`}
              onClick={tab === 'Deliveries' ? triggerToast : undefined}
              style={{
                padding: '4px 12px',
                border: 'none',
                borderRadius: 4,
                background: tab === 'Visits' ? '#fff' : 'transparent',
                boxShadow: tab === 'Visits' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                color: '#3f454c',
                fontSize: 16, fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: "'IBM Plex Sans', sans-serif",
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* New visit button */}
        <button data-id="visits-new-btn" onClick={triggerToast} style={{
          height: 30, padding: '0 14px',
          border: 'none', borderRadius: 4,
          background: venue.primary, color: '#fff',
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          New visit
        </button>

        {/* Date range */}
        <div data-id="visits-date-range" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button data-id="visits-date-from" onClick={triggerToast} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a' }}>WEDNESDAY, MARCH 18, 2026</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <span style={{ fontSize: 13, color: '#767c83' }}>—</span>
          <button data-id="visits-date-to" onClick={triggerToast} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a' }}>THURSDAY, MAY 14, 2026</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Filter */}
        <button data-id="visits-filter-btn" onClick={triggerToast} style={btnBase}>
          <span>Filter</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {/* Export */}
        <button data-id="visits-export-btn" onClick={triggerToast} style={btnBase}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>Export</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {/* Empty state */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            border: '1px solid #dee2e6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#fff',
          }}>
            <ClipboardIcon />
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#0a0a0a' }}>No visits found</span>
          <span style={{ fontSize: 13, color: '#767c83' }}>Change the date range and the filters to search again.</span>
        </div>
      </div>

      {/* Placeholder toast */}
      {showToast && (
        <div data-id="visits-placeholder-toast" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 50,
        }}>
          <div style={{
            background: '#fff', borderRadius: 8, padding: '20px 24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', gap: 16,
            maxWidth: 420,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#767c83' }}>
                Placeholder for <em style={{ fontStyle: 'normal', color: 'rgba(63,69,76,0.7)' }}>Visits</em> content
              </span>
              <span style={{ fontSize: 13, color: '#767c83' }}>
                This is a navigation prototype — collapse, expand, and switch pages to explore how the sidebar behaves.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

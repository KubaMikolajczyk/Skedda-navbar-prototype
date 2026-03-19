import { useState, useRef } from 'react'

const BAYS = ['Board Room', 'Meeting Room A', 'Meeting Room B']
const HOUR_HEIGHT = 64
const START_HOUR  = 8
const END_HOUR    = 22
const GUTTER_W    = 80

const views = ['Day', 'Month', 'Grid', 'List', 'Map'] as const
type View = typeof views[number]

type Booking = { bay: number; start: number; end: number }

const BOOKINGS: Booking[] = [
  // Henderson Bay (0)
  { bay: 0, start: 10,   end: 11   },
  { bay: 0, start: 11,   end: 14   },
  { bay: 0, start: 15,   end: 16   },
  { bay: 0, start: 17,   end: 18   },
  { bay: 0, start: 18,   end: 21   },
  // Jones Bay (1)
  { bay: 1, start: 9,    end: 10   },
  { bay: 1, start: 10,   end: 11   },
  { bay: 1, start: 11,   end: 14   },
  { bay: 1, start: 14,   end: 16   },
  { bay: 1, start: 16,   end: 17.5 },
  { bay: 1, start: 18,   end: 20   },
  { bay: 1, start: 20,   end: 22   },
  // Hogan Bay (2)
  { bay: 2, start: 9,    end: 10.5 },
  { bay: 2, start: 11,   end: 14   },
  { bay: 2, start: 15.5, end: 18   },
  { bay: 2, start: 18,   end: 21   },
]

function formatHourLabel(h: number) {
  if (h === 12) return '12:00P.M.'
  return h > 12 ? `${h - 12}:00P.M.` : `${h}:00A.M.`
}

function formatTimeRange(start: number, end: number) {
  const fmt = (h: number) => {
    const hour = Math.floor(h)
    const min  = Math.round((h - hour) * 60)
    const suffix = hour >= 12 ? 'p.m.' : 'a.m.'
    const h12  = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return min === 0
      ? `${h12}:00${suffix}`
      : `${h12}:${min.toString().padStart(2, '0')}${suffix}`
  }
  return `${fmt(start)}–${fmt(end)}`
}

function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.4)" strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <circle cx="12" cy="16" r="0.5" fill="rgba(63,69,76,0.4)"/>
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#767c83" strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function DayView({ onBookingClick, bays }: { onBookingClick: () => void; bays: string[] }) {
  const hours  = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)
  const totalH = (END_HOUR - START_HOUR) * HOUR_HEIGHT
  const bayIndices = bays.map(b => BAYS.indexOf(b))

  return (
    <div data-id="day-view" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* Column headers */}
      <div data-id="day-view-column-headers" style={{
        display: 'flex', flexShrink: 0,
        borderBottom: '1px solid #dee2e6',
        background: '#fff',
      }}>
        <div style={{ width: GUTTER_W, flexShrink: 0 }} />
        {bays.map(bay => (
          <div key={bay} data-id={`day-view-col-${bay.toLowerCase().replace(/\s+/g, '-')}`} onClick={onBookingClick} style={{
            flex: 1, minWidth: 0,
            padding: '10px 12px',
            fontSize: 13, fontWeight: 500, color: '#3f454c',
            borderLeft: '1px solid #dee2e6',
            display: 'flex', alignItems: 'center', gap: 5,
            cursor: 'pointer',
          }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bay}</span>
            <InfoIcon />
          </div>
        ))}
      </div>

      {/* Scrollable grid */}
      <div data-id="day-view-grid" style={{ flex: 1, overflowY: 'auto', display: 'flex' }}>

        {/* Time gutter */}
        <div data-id="day-view-time-gutter" style={{ width: GUTTER_W, flexShrink: 0, background: '#fff' }}>
          {hours.map(h => (
            <div key={h} style={{
              height: HOUR_HEIGHT,
              padding: '4px 10px 0 0',
              fontSize: 11, color: '#767c83',
              textAlign: 'right', lineHeight: 1.3,
            }}>
              {formatHourLabel(h)}
            </div>
          ))}
        </div>

        {/* Bay columns + booking blocks */}
        <div style={{ flex: 1, position: 'relative', height: totalH }}>

          {/* Hour lines */}
          {hours.map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: i * HOUR_HEIGHT,
              left: 0, right: 0,
              borderTop: '1px solid #dee2e6',
              pointerEvents: 'none',
            }} />
          ))}

          {/* Columns + bookings */}
          {bays.map((bay, colIdx) => {
            const bi  = bayIndices[colIdx]
            const pct = 100 / bays.length
            return (
              <div key={bay} style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: `${colIdx * pct}%`,
                width: `${pct}%`,
                borderLeft: '1px solid #dee2e6',
              }}>
                {BOOKINGS.filter(b => b.bay === bi).map((b, i) => {
                  const top    = (b.start - START_HOUR) * HOUR_HEIGHT + 2
                  const height = (b.end - b.start) * HOUR_HEIGHT - 4
                  const label  = formatTimeRange(b.start, b.end)
                  return (
                    <div
                      key={i}
                      data-id={`booking-${bay.toLowerCase().replace(/\s+/g, '-')}-${i}`}
                      style={{
                        position: 'absolute',
                        top, left: 3, right: 3, height,
                        background: '#f4f5f6',
                        borderLeft: '3px solid #c8cdd2',
                        borderRadius: '0 2px 2px 0',
                        padding: '3px 6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={onBookingClick}
                      onMouseEnter={e => (e.currentTarget.style.background = '#eceef0')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#f4f5f6')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <PersonIcon />
                        <span style={{
                          fontSize: 11, color: '#3f454c',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FloorPlan() {
  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <svg viewBox="0 0 1148 580" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <polygon points="26,20 1120,20 1140,55 1140,530 1100,555 450,555 450,580 26,580 26,495 88,495 88,530 26,530" fill="#dde7f2" stroke="#9ab0c8" strokeWidth="2"/>
        <polygon points="36,30 1112,30 1130,60 1130,522 1093,544 455,544 455,570 36,570 36,486 96,486 96,522 36,522" fill="#e8f0f8" stroke="none"/>
        {[60,115,170,225,335,390,440].map(y => (<rect key={y} x={36} y={y} width={26} height={44} rx={2} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={0.8}/>))}
        {[30,85,140,195,260,320,380,440,490].map(y => (<rect key={y} x={1100} y={y} width={28} height={44} rx={2} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={0.8}/>))}
        <rect x={148} y={368} width={200} height={42} rx={4} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>
        <rect x={360} y={368} width={55}  height={42} rx={4} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>
        <rect x={700} y={175} width={120} height={55} rx={6} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>
        <rect x={700} y={175} width={120} height={12} rx={3} fill="#a8bdd4" stroke="none"/>
        <circle cx={108} cy={432} r={16} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>
        <text x={108} y={437} textAnchor="middle" fontSize={14} fill="#7a95b0">🍴</text>
      </svg>
    </div>
  )
}

export function SchedulePage({ singleColumn = false }: { singleColumn?: boolean }) {
  const [activeView] = useState<View>('Day')
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const activeBays = singleColumn ? BAYS.slice(0, 1) : BAYS

  function triggerToast() {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setShowToast(true)
    toastTimer.current = setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div data-id="schedule-page" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff', position: 'relative' }}>

      {/* Top bar */}
      <div data-id="schedule-topbar" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 68, flexShrink: 0,
        borderBottom: '1px solid #dee2e6',
        minWidth: 'max-content',
      }}>

        {/* Left group: tabs + arrows + date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* View tabs */}
          <div data-id="schedule-view-tabs" style={{
            display: 'flex',
            background: '#e4e7eb',
            borderRadius: 6,
            padding: 3,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
          }}>
            {views.map(v => (
              <button
                key={v}
                data-id={`schedule-view-tab-${v.toLowerCase()}`}
                onClick={triggerToast}
                style={{
                  padding: '4px 12px',
                  border: 'none',
                  borderRadius: 4,
                  background: activeView === v ? '#fff' : 'transparent',
                  boxShadow: activeView === v ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                  color: '#3f454c',
                  fontSize: 16, fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Prev / next arrows */}
          <div style={{ display: 'flex' }}>
            <button data-id="schedule-date-prev" onClick={triggerToast} style={{
              width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #dee2e6', borderRight: 'none',
              borderRadius: '4px 0 0 4px',
              background: '#fff', cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button data-id="schedule-date-next" onClick={triggerToast} style={{
              width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #dee2e6',
              borderRadius: '0 4px 4px 0',
              background: '#fff', cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {/* Date picker */}
          <button data-id="schedule-date-picker" onClick={triggerToast} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            border: 'none', background: 'transparent', cursor: 'pointer',
            padding: 0,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a' }}>
              WEDNESDAY, MARCH 18, 2026
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* Filters split button */}
        <div data-id="schedule-filters-btn" style={{ display: 'flex', borderRadius: 4, overflow: 'hidden', border: '1px solid #dee2e6' }}>
          <button onClick={triggerToast} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            height: 30, padding: '0 10px',
            border: 'none', borderRight: '1px solid #dee2e6',
            background: '#fff', cursor: 'pointer',
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <circle cx="9" cy="6" r="2" fill="#fff"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <circle cx="15" cy="12" r="2" fill="#fff"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
              <circle cx="11" cy="18" r="2" fill="#fff"/>
            </svg>
            <span style={{ fontSize: 13, color: '#3f454c' }}>Filters</span>
          </button>
          <button onClick={triggerToast} style={{
            width: 28, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', background: '#fff', cursor: 'pointer',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeView === 'Day' ? <DayView onBookingClick={triggerToast} bays={activeBays} /> : <FloorPlan />}

      {/* Placeholder toast */}
      {showToast && (
        <div data-id="schedule-placeholder-toast" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 50,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: '20px 24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', gap: 16,
            maxWidth: 420,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#767c83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#3f454c' }}>
                Placeholder for <em style={{ fontStyle: 'normal' }}>Schedule</em> content
              </span>
              <span style={{ fontSize: 13, color: '#3f454c' }}>
                This is a navigation prototype — collapse, expand, and switch pages to explore how the sidebar behaves.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

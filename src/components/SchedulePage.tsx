import { useState } from 'react'

// ── Asset URLs from Figma desktop MCP ──
const ICON_SCHEDULE_TITLE = 'http://localhost:3845/assets/492ac011245a13248e5cddd0ca00e40a3775d824.svg'
const ICON_PLUS           = 'http://localhost:3845/assets/af7fc3297f075b77b4e75d3062b6cbaf8b0c2c7d.svg'
const ICON_CHEVRON_LEFT   = 'http://localhost:3845/assets/2f4ae375c8e625447f6bcf1c6dbe2d51695a4e0e.svg'
const ICON_CHEVRON_RIGHT  = 'http://localhost:3845/assets/2c2cc79ac7180bfbc82ee5c384feb40b11a0d43d.svg'
const ICON_CALENDAR       = 'http://localhost:3845/assets/9228187cb93c1adf9b57846fe64e2fde8027448e.svg'
const ICON_CHEVRON_DOWN   = 'http://localhost:3845/assets/d489eb6abf8a7096a88607bc06cea4cc90a00edd.svg'
const ICON_SLIDERS        = 'http://localhost:3845/assets/7fa9f20408c2b2b74681c45ce09ed78917af91c5.svg'
const ICON_FILTER_CARET   = 'http://localhost:3845/assets/64fe3a715dccfb7aa30bf65d35b29b5f73559b9c.svg'

// ── Shared button styles ──
const dropdownBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 4,
  height: 38, padding: '6px 16px',
  border: '1px solid #dee2e6', borderRadius: 4,
  background: '#fff', color: '#3f454c',
  fontSize: 16, fontFamily: "'IBM Plex Sans', sans-serif",
  whiteSpace: 'nowrap', cursor: 'pointer',
}

const views = ['Day', 'Month', 'Grid', 'List', 'Map'] as const
type View = typeof views[number]

// ── Floor plan ──
function FloorPlan() {
  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1148 580"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        {/* Main floor polygon */}
        <polygon
          points="26,20 1120,20 1140,55 1140,530 1100,555 450,555 450,580 26,580 26,495 88,495 88,530 26,530"
          fill="#dde7f2" stroke="#9ab0c8" strokeWidth="2"
        />
        {/* Interior lighter fill */}
        <polygon
          points="36,30 1112,30 1130,60 1130,522 1093,544 455,544 455,570 36,570 36,486 96,486 96,522 36,522"
          fill="#e8f0f8" stroke="none"
        />

        {/* ── Left wall furniture ── */}
        {[60,115,170,225,335,390,440].map(y => (
          <rect key={y} x={36} y={y} width={26} height={44} rx={2} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={0.8}/>
        ))}

        {/* ── Right wall furniture ── */}
        {[30,85,140,195,260,320,380,440,490].map(y => (
          <rect key={y} x={1100} y={y} width={28} height={44} rx={2} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={0.8}/>
        ))}

        {/* ── Large conference tables (centre-left) ── */}
        <rect x={148} y={368} width={200} height={42} rx={4} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>
        <rect x={360} y={368} width={55}  height={42} rx={4} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>

        {/* Sofa / lounge (mid-right area) */}
        <rect x={700} y={175} width={120} height={55} rx={6} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>
        <rect x={700} y={175} width={120} height={12} rx={3} fill="#a8bdd4" stroke="none"/>

        {/* Kitchen icon */}
        <circle cx={108} cy={432} r={16} fill="#bfcfe3" stroke="#9ab0c8" strokeWidth={1}/>
        <text x={108} y={437} textAnchor="middle" fontSize={14} fill="#7a95b0">🍴</text>

        {/* ── Desk clusters: upper section ── */}
        {/* Each cluster: a pair of 2×2 desks with avatar circles on them */}
        {[
          // [clusterX, clusterY, cols, rows]
          [200, 42,  2, 3],
          [270, 42,  2, 4],
          [370, 42,  2, 2],
          [440, 42,  2, 3],
          [510, 42,  2, 2],
          [610, 42,  2, 2],
          [750, 42,  2, 4],
          [820, 42,  2, 3],
          [920, 42,  2, 3],
          [990, 42,  2, 2],
          [1060,42,  2, 3],
        ].map(([cx, cy, cols, rows], gi) => {
          const cells = []
          const colors = ['#6610f2','#ef4444','#f97316','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f59e0b','#10b981']
          let ci = gi * 3
          for (let r = 0; r < (rows as number); r++) {
            for (let c = 0; c < (cols as number); c++) {
              const x = (cx as number) + c * 28
              const y = (cy as number) + r * 32
              cells.push(
                <g key={`${gi}-${r}-${c}`}>
                  <rect x={x - 11} y={y - 11} width={22} height={22} rx={2} fill="#d4dde9" stroke="#9ab0c8" strokeWidth={0.8}/>
                  <circle cx={x} cy={y} r={9} fill={colors[(ci + r*(cols as number)+c) % colors.length]} stroke="white" strokeWidth={1.5}/>
                </g>
              )
            }
          }
          return <g key={gi}>{cells}</g>
        })}

        {/* Single desk with avatar (left middle) */}
        <rect x={80} y={289} width={22} height={22} rx={2} fill="#d4dde9" stroke="#9ab0c8" strokeWidth={0.8}/>
        <circle cx={91} cy={300} r={9} fill="#8b5cf6" stroke="white" strokeWidth={1.5}/>

        {/* ── Open desk zone: green dots + some avatars ── */}
        {[
          [490, 250, false], [518, 250, false],
          [490, 282, false], [518, 282, true],
          [490, 314, true],  [518, 314, false],
          [490, 346, false], [518, 346, false],

          [560, 250, false], [588, 250, false],
          [560, 282, false], [588, 282, false],
          [560, 314, true],  [588, 314, false],
          [560, 346, false], [588, 346, true],

          [630, 250, false], [658, 250, false],
          [630, 282, true],  [658, 282, false],
          [630, 314, false], [658, 314, false],
          [630, 346, false], [658, 346, false],

          [700, 250, false], [728, 250, false],
          [700, 282, false], [728, 282, false],
          [700, 314, false], [728, 314, false],
          [700, 346, false], [728, 346, false],

          [840, 250, false], [868, 250, false],
          [840, 282, false], [868, 282, false],
          [840, 314, false], [868, 314, false],

          [910, 250, false], [938, 250, true],
          [910, 282, false], [938, 282, false],
          [910, 314, false], [938, 314, false],

          [980, 250, false], [1008,250, false],
          [980, 282, false], [1008,282, false],

          [1050,250, false], [1078,250, false],
          [1050,282, false], [1078,282, false],
        ].map(([x, y, hasAvatar], i) => (
          <g key={i}>
            <rect x={(x as number) - 12} y={(y as number) - 12} width={24} height={24} rx={2} fill="#d4dde9" stroke="#9ab0c8" strokeWidth={0.8}/>
            {hasAvatar
              ? <circle cx={x as number} cy={y as number} r={9} fill={['#6610f2','#ef4444','#14b8a6'][i % 3]} stroke="white" strokeWidth={1.5}/>
              : <circle cx={x as number} cy={y as number} r={9} fill="#22c55e" stroke="white" strokeWidth={1.5}/>
            }
          </g>
        ))}

        {/* ── Meeting rooms ── */}
        {[
          { x: 455,  label: 'VANCOUVER', avColor: '#6610f2', available: false },
          { x: 570,  label: 'DUBLIN',    avColor: '#ec4899', available: true  },
          { x: 680,  label: 'MELBOURNE', avColor: '#3b82f6', available: true  },
          { x: 790,  label: 'CAPE TOWN', avColor: '#22c55e', available: false },
          { x: 900,  label: 'VIENNA',    avColor: '#22c55e', available: false },
        ].map(({ x, label, avColor, available }) => (
          <g key={label}>
            <rect x={x} y={460} width={100} height={80} rx={2}
              fill="none" stroke="#9ab0c8" strokeWidth={1} strokeDasharray="5 3"/>
            <text x={x + 50} y={474} textAnchor="middle"
              fontSize={7} fill="#7a95b0" fontFamily="IBM Plex Sans, sans-serif"
              letterSpacing={1.2} fontWeight={700}>
              {label}
            </text>
            {/* Table */}
            <rect x={x + 18} y={482} width={64} height={28} rx={3} fill="#d4dde9" stroke="#9ab0c8" strokeWidth={0.8}/>
            {/* Avatar */}
            <circle cx={x + 50} cy={496} r={11}
              fill={available ? '#22c55e' : avColor}
              stroke="white" strokeWidth={2}/>
          </g>
        ))}

        {/* ── ENTRY labels ── */}
        <g transform="translate(73,530) rotate(-90)">
          <text fontSize={8} fill="#7a95b0" fontFamily="IBM Plex Sans,sans-serif" letterSpacing={2} fontWeight={700}>ENTRY</text>
        </g>
        <g transform="translate(444,572) rotate(-90)">
          <text fontSize={8} fill="#7a95b0" fontFamily="IBM Plex Sans,sans-serif" letterSpacing={2} fontWeight={700}>ENTRY</text>
        </g>
      </svg>

      {/* OWNER MODE badge */}
      <div style={{
        position: 'absolute', bottom: 16, right: 24,
        background: '#6610f2', color: '#fff',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        padding: '4px 10px', borderRadius: 4,
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}>
        OWNER MODE
      </div>
    </div>
  )
}

// ── Main Schedule page ──
export function SchedulePage() {
  const [activeView, setActiveView] = useState<View>('Map')
  const [sliderVal, setSliderVal] = useState(30)

  return (
    <div data-id="schedule-page" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>

      {/* ── Top bar ── */}
      <div data-id="schedule-topbar" style={{
        padding: '16px 16px 0',
        borderBottom: '1px solid #dee2e6',
        display: 'flex', flexDirection: 'column', gap: 8,
        paddingBottom: 16,
      }}>

        {/* Row 1: Title + Actions */}
        <div data-id="schedule-topbar-row1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={ICON_SCHEDULE_TITLE} alt="" style={{ width: 24, height: 19 }} />
            <span style={{ fontSize: 20, fontWeight: 500, color: '#000', lineHeight: 1.2 }}>Schedule</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button data-id="schedule-user-search-btn" style={{
              ...dropdownBtn,
              border: '1px solid rgba(102,16,242,0.2)',
              color: '#6610f2',
            }}>
              User search
            </button>
            <button data-id="schedule-new-booking-btn" style={{
              ...dropdownBtn,
              background: '#6610f2', border: '1px solid #6610f2',
              color: '#fff', gap: 8,
            }}>
              <img src={ICON_PLUS} alt="" style={{ width: 20, height: 16 }}/>
              New booking
            </button>
          </div>
        </div>

        {/* Row 2: Segmented control + controls */}
        <div data-id="schedule-topbar-row2" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

          {/* Segmented tabs */}
          <div data-id="schedule-view-tabs" style={{
            display: 'flex', alignItems: 'center',
            background: '#e4e7eb',
            borderRadius: 6, padding: 3, height: 38,
            position: 'relative',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
          }}>
            {views.map(v => (
              <button key={v} data-id={`view-tab-${v.toLowerCase()}`} onClick={() => setActiveView(v)} style={{
                height: '100%', padding: '4px 12px',
                border: 'none', borderRadius: 4,
                background: activeView === v ? '#fff' : 'transparent',
                boxShadow: activeView === v ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                color: '#3f454c', fontSize: 16, lineHeight: 1.5,
                fontFamily: "'IBM Plex Sans', sans-serif",
                transition: 'background 0.15s, box-shadow 0.15s',
              }}>
                {v}
              </button>
            ))}
          </div>

          {/* Arrow nav */}
          <div data-id="schedule-date-nav" style={{ display: 'flex' }}>
            {[ICON_CHEVRON_LEFT, ICON_CHEVRON_RIGHT].map((icon, i) => (
              <button key={i} style={{
                width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#fff', border: '1px solid #dee2e6',
                borderRadius: i === 0 ? '4px 0 0 4px' : '0 4px 4px 0',
                marginRight: i === 0 ? -1 : 0, padding: 0, position: 'relative',
              }}>
                <img src={icon} alt="" style={{ width: 16, height: 16 }}/>
              </button>
            ))}
          </div>

          {/* Date picker */}
          <button data-id="schedule-date-picker" style={dropdownBtn}>
            <img src={ICON_CALENDAR} alt="" style={{ width: 20, height: 16 }}/>
            Fri, Jan 23, 2026
            <img src={ICON_CHEVRON_DOWN} alt="" style={{ width: 20, height: 16 }}/>
          </button>

          {/* Level */}
          <button data-id="schedule-level-picker" style={dropdownBtn}>
            Level 1
            <img src={ICON_CHEVRON_DOWN} alt="" style={{ width: 20, height: 16 }}/>
          </button>

          {/* Time + slider */}
          <button data-id="schedule-time-picker" style={dropdownBtn}>
            9:00
            <img src={ICON_CHEVRON_DOWN} alt="" style={{ width: 20, height: 16 }}/>
          </button>

          <div data-id="schedule-time-slider-wrap" style={{ flex: 1, padding: '0 16px', display: 'flex', alignItems: 'center' }}>
            <input
              data-id="schedule-time-slider"
              type="range" min={0} max={100} value={sliderVal}
              onChange={e => setSliderVal(+e.target.value)}
            />
          </div>

          {/* Filters split button */}
          <div data-id="schedule-filters-btn-group" style={{ display: 'flex', marginLeft: 'auto' }}>
            <button data-id="schedule-filters-btn" style={{
              ...dropdownBtn,
              borderRight: 'none', borderRadius: '4px 0 0 4px',
              gap: 8,
            }}>
              <img src={ICON_SLIDERS} alt="" style={{ width: 16, height: 16 }}/>
              Filters
            </button>
            <button data-id="schedule-filters-caret-btn" style={{
              ...dropdownBtn,
              padding: '6px 8px', borderRadius: '0 4px 4px 0',
            }}>
              <img src={ICON_FILTER_CARET} alt="" style={{ width: 16, height: 16 }}/>
            </button>
          </div>
        </div>
      </div>

      {/* ── Floor plan ── */}
      <FloorPlan />
    </div>
  )
}

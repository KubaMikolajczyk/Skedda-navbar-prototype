import { useState, useRef } from 'react'
import { useVenue } from '../venue'

const USERS = [
  { initials: 'AA', color: '#8b9ab5', firstName: 'asdasd',  lastName: 'asdasdas',   org: '',                          email: 'asdasdas@asdasd.com',    phone: '', tags: [] },
  { initials: 'KE', color: '#3b82f6', firstName: 'Kuba',    lastName: 'ES',          org: '',                          email: 'kuba@skedda.es',         phone: '', tags: [] },
  { initials: 'SF', color: '#10b981', firstName: 'Skedda',  lastName: 'Fred',        org: 'Your test user - Try me!',  email: '211819@skedda.test',     phone: '', tags: [] },
  { initials: 'KM', color: '#6610f2', firstName: 'Kuba',    lastName: 'Mikołajczyk', org: '',                          email: 'qba600@gmail.com',       phone: '', tags: ['System Admin'] },
  { initials: 'FU', color: '#ef4444', firstName: 'Fake',    lastName: 'User',        org: '',                          email: 'fakefake@email.com',     phone: '', tags: [] },
]

const colStyle: React.CSSProperties = {
  fontSize: 13, color: '#3f454c',
  fontFamily: "'IBM Plex Sans', sans-serif",
  padding: '0 12px', display: 'flex', alignItems: 'center',
}

function SortIcon({ sorted }: { sorted?: 'asc' | 'desc' | 'none' }) {
  if (sorted === 'asc') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  )
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8cdd2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 9 12 5 16 9"/><polyline points="8 15 12 19 16 15"/>
    </svg>
  )
}

const btnOutline: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 5,
  height: 30, padding: '0 10px',
  border: '1px solid #dee2e6', borderRadius: 4,
  background: '#fff', cursor: 'pointer',
  fontSize: 13, color: '#3f454c',
  fontFamily: "'IBM Plex Sans', sans-serif",
  whiteSpace: 'nowrap',
}

export function UsersPage() {
  const { venue } = useVenue()
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  function triggerToast() {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setShowToast(true)
    toastTimer.current = setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div data-id="users-page" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff', position: 'relative' }}>

      {/* Top bar */}
      <div data-id="users-topbar" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px', height: 68, flexShrink: 0,
        borderBottom: '1px solid #dee2e6',
        minWidth: 'max-content',
      }}>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 4 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#3f454c', letterSpacing: '0.06em', fontFamily: "'IBM Plex Sans', sans-serif" }}>
            USERS
          </span>
        </div>

        {/* Send invite link */}
        <button data-id="users-invite-btn" onClick={triggerToast} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          height: 30, padding: '0 12px',
          border: 'none', borderRadius: 4,
          background: venue.primary, color: '#fff',
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          fontFamily: "'IBM Plex Sans', sans-serif",
          whiteSpace: 'nowrap',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          Send invite link
        </button>

        {/* Add a user */}
        <button data-id="users-add-btn" onClick={triggerToast} style={btnOutline}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          Add a user
        </button>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8cdd2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            data-id="users-search"
            placeholder="Search..."
            onClick={triggerToast}
            readOnly
            style={{
              height: 30, width: 200, paddingLeft: 28, paddingRight: 8,
              border: '1px solid #dee2e6', borderRadius: 4,
              fontSize: 13, color: '#3f454c', background: '#fff',
              fontFamily: "'IBM Plex Sans', sans-serif",
              outline: 'none', cursor: 'pointer',
            }}
          />
        </div>

        <div style={{ flex: 1 }} />

        {/* Manage tags */}
        <button data-id="users-manage-tags-btn" onClick={triggerToast} style={btnOutline}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          Manage tags
        </button>

        {/* Export */}
        <button data-id="users-export-btn" onClick={triggerToast} style={btnOutline}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Export
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f454c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {/* Table */}
      <div data-id="users-table" style={{ flex: 1, overflowY: 'auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center',
          height: 36, background: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          position: 'sticky', top: 0, zIndex: 1,
        }}>
          {[
            { label: 'First Name',   sorted: 'none', width: 180 },
            { label: 'Last Name',    sorted: 'asc',  width: 220 },
            { label: 'Organization', sorted: 'none', width: 280 },
            { label: 'Email',        sorted: 'none', width: 280 },
            { label: 'Phone',        sorted: undefined, width: 160 },
            { label: 'Roles & tags', sorted: undefined, flex: 1 },
          ].map(col => (
            <div
              key={col.label}
              onClick={col.sorted !== undefined ? triggerToast : undefined}
              style={{
                ...colStyle,
                width: col.width, flex: (col as {flex?: number}).flex,
                gap: 5, flexShrink: 0,
                fontSize: 12, fontWeight: 500, color: '#767c83',
                cursor: col.sorted !== undefined ? 'pointer' : 'default',
              }}
            >
              {col.label}
              {col.sorted !== undefined && <SortIcon sorted={col.sorted as 'asc' | 'none'} />}
            </div>
          ))}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>

        {/* Rows */}
        {USERS.map((user, i) => (
          <div
            key={i}
            data-id={`users-row-${i}`}
            onClick={triggerToast}
            style={{
              display: 'flex', alignItems: 'center',
              height: 48, borderBottom: '1px solid #dee2e6',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >
            {/* First Name with avatar */}
            <div style={{ ...colStyle, width: 180, flexShrink: 0, gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: user.color, color: '#fff',
                fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontFamily: "'IBM Plex Sans', sans-serif",
              }}>
                {user.initials}
              </div>
              <span>{user.firstName}</span>
            </div>

            {/* Last Name */}
            <div style={{ ...colStyle, width: 220, flexShrink: 0 }}>{user.lastName}</div>

            {/* Organization */}
            <div style={{ ...colStyle, width: 280, flexShrink: 0 }}>
              {user.org
                ? <span style={{ color: '#2563eb', cursor: 'pointer' }}>{user.org}</span>
                : null}
            </div>

            {/* Email */}
            <div style={{ ...colStyle, width: 280, flexShrink: 0 }}>
              <span style={{ color: '#2563eb' }}>{user.email}</span>
            </div>

            {/* Phone */}
            <div style={{ ...colStyle, width: 160, flexShrink: 0 }}>{user.phone}</div>

            {/* Roles & tags */}
            <div style={{ ...colStyle, flex: 1, gap: 4 }}>
              {user.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 12, color: '#3f454c',
                  border: '1px solid #dee2e6', borderRadius: 4,
                  padding: '2px 8px', whiteSpace: 'nowrap',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Chevron */}
            <div style={{ width: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8cdd2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder toast */}
      {showToast && (
        <div data-id="users-placeholder-toast" style={{
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
                Placeholder for <em style={{ fontStyle: 'normal', color: 'rgba(63,69,76,0.7)' }}>Users</em> content
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

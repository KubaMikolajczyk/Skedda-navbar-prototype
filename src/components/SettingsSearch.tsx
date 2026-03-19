import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { getSettingsSections } from './settings-data'
import type { SettingsItem } from './settings-data'
import { useLang } from '../i18n'

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: '#fff3cd', padding: '0 1px', borderRadius: 2, fontStyle: 'inherit' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

type GroupedResult = {
  sectionTitle: string
  items: SettingsItem[]
}

type Props = {
  onNavigate: (id: string) => void
  onClose: () => void
}

export function SettingsSearch({ onNavigate, onClose }: Props) {
  const { t } = useLang()
  const sections = getSettingsSections(t)
  const st = t.settings.search

  const SUGGESTED = useMemo<SettingsItem[]>(() => [
    sections.find(s => s.id === 'rules')!.items.find(i => i.id === 'settings-pricing')!,
    sections.find(s => s.id === 'core-booking-setup')!.items.find(i => i.id === 'settings-bookable-spaces')!,
  ], [sections])

  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const grouped = useMemo<GroupedResult[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const out: GroupedResult[] = []
    for (const section of sections) {
      const matched = section.items.filter(item =>
        item.label.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      )
      if (matched.length) out.push({ sectionTitle: section.title, items: matched })
    }
    return out
  }, [query, sections])

  const hasQuery = query.trim().length > 0
  const hasResults = grouped.length > 0

  const rowStyle: React.CSSProperties = {
    width: '100%', display: 'flex', alignItems: 'flex-start', gap: 10,
    padding: '8px 8px', border: 'none', borderRadius: 6,
    background: 'transparent', cursor: 'pointer',
    textAlign: 'left', fontFamily: 'inherit',
  }

  return createPortal(
    <>
      {/* Overlay */}
      <div
        data-id="settings-search-overlay"
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 }}
      />

      {/* Dialog */}
      <div data-id="settings-search-dialog" style={{
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 460,
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        zIndex: 201,
        fontFamily: "'IBM Plex Sans', sans-serif",
        overflow: 'hidden',
      }}>

        {/* Input row */}
        <div data-id="settings-search-input-row" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 16px', borderBottom: '1px solid #dee2e6', height: 54,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            ref={inputRef}
            data-id="settings-search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={st.placeholder}
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: 15, color: '#0a0a0a',
              background: 'transparent', fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              data-id="settings-search-clear-btn"
              onClick={() => setQuery('')}
              style={{
                border: 'none', background: 'transparent',
                cursor: 'pointer', color: 'rgba(63,69,76,0.4)',
                padding: 4, borderRadius: 4, flexShrink: 0, display: 'flex',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div data-id="settings-search-body" style={{ maxHeight: 440, overflowY: 'auto' }}>

          {/* Empty state — suggested searches */}
          {!hasQuery && (
            <div style={{ padding: '12px 8px 8px' }}>
              <p style={{ fontSize: 13, color: '#767c83', margin: '0 8px 16px' }}>
                {st.scope}
              </p>
              <p data-id="settings-search-suggested-label" style={{
                fontSize: 13, fontWeight: 700, color: '#3f454c', margin: '0 8px 4px',
              }}>
                {st.suggestedLabel}
              </p>
              {SUGGESTED.map(item => (
                <button
                  key={item.id}
                  data-id={`settings-search-suggested-${item.id}`}
                  onClick={() => { onNavigate(item.id); onClose() }}
                  style={rowStyle}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <img src={item.icon} alt="" style={{ width: 20, height: 16, flexShrink: 0, objectFit: 'contain', marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 14, color: '#212529', lineHeight: 1.5 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#767c83', lineHeight: 1.4 }}>{item.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {hasQuery && !hasResults && (
            <>
              <div style={{
                padding: '36px 16px 28px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.22)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
                <p style={{ margin: 0, fontSize: 14, color: '#212529', textAlign: 'center' }}>
                  {st.noResultsFor.replace('{query}', query.trim())}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: '#767c83', textAlign: 'center' }}>
                  {st.noResultsHint}
                </p>
              </div>
              <div style={{ borderTop: '1px solid #dee2e6', padding: '12px 16px' }}>
                <a
                  data-id="settings-search-kb-link"
                  href="#"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 14, color: '#0a66c2', textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  {st.knowledgeBase}
                </a>
              </div>
            </>
          )}

          {/* Results */}
          {hasQuery && hasResults && (
            <div style={{ padding: '4px 8px 0' }}>
              {grouped.map(({ sectionTitle, items }) => (
                <div key={sectionTitle} data-id={`settings-search-group-${sectionTitle}`}>
                  <p style={{ margin: '8px 8px 2px', fontSize: 12, fontWeight: 700, color: '#767c83', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {sectionTitle}
                  </p>
                  {items.map(item => (
                    <button
                      key={item.id}
                      data-id={`settings-search-result-${item.id}`}
                      onClick={() => { onNavigate(item.id); onClose() }}
                      style={rowStyle}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <img src={item.icon} alt="" style={{ width: 20, height: 16, flexShrink: 0, objectFit: 'contain', marginTop: 3 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, color: '#212529', lineHeight: 1.5 }}>
                          <Highlight text={item.label} query={query.trim()} />
                        </div>
                        <div style={{ fontSize: 13, color: '#767c83', lineHeight: 1.4 }}>
                          <Highlight text={item.description} query={query.trim()} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
              <div style={{ borderTop: '1px solid #dee2e6', padding: '10px 8px 12px', marginTop: 4 }}>
                <p style={{ margin: 0, fontSize: 12, color: '#767c83' }}>
                  {st.someMatches}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>,
    document.body
  )
}

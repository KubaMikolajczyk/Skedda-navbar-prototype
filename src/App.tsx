import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { LangProvider, useLang } from './i18n'
import { VenueProvider } from './venue'
import './index.css'

function AppContent() {
  const { t } = useLang()
  const [active, setActive] = useState('schedule')

  const pageTitles: Record<string, string> = {
    schedule:           t.nav.schedule,
    visits:             t.nav.visits,
    users:              t.nav.users,
    insights:           t.nav.insights,
    'booking-requests': t.nav.bookingRequests,
    billing:            t.sidebar.billing,
    settings:           t.sidebar.settings,
    'edit-profile':     t.popover.editProfile,
    support:            t.popover.support,
    'platform-status':  t.popover.platformStatus,
    terms:              t.popover.terms,
    'privacy-policy':   t.popover.privacyPolicy,
    updates:            t.popover.updates,
    // Settings pages
    'settings-basics':             'Basics',
    'settings-bookable-spaces':    'Bookable spaces',
    'settings-hours':              'Hours of availability',
    'settings-floor-plans':        'Floor plans & maps',
    'settings-data-retention':     'Data retention',
    'settings-tablet-displays':    'Tablet displays',
    'settings-visitor-management': 'Visitor management',
    'settings-occupancy-tracking': 'Occupancy tracking',
    'settings-admin-roles':        'Admin roles & permissions',
    'settings-support-requests':   'Support requests',
    'settings-access':             'Access & visibility',
    'settings-lock-in':            'Lock-in & repetition',
    'settings-coloring':           'Coloring',
    'settings-custom-fields':      'Custom fields',
    'settings-custom-info':        'Custom information',
    'settings-space-sharing':      'Space sharing',
    'settings-online-payments':    'Online payments',
    'settings-check-in':           'Check-in',
    'settings-conditions':         'Conditions',
    'settings-pricing':            'Pricing',
    'settings-quotas':             'Quotas',
    'settings-buffer-time':        'Buffer time',
    'settings-booking-window':     'Booking window',
    'settings-booking-requests':   'Booking requests',
    'settings-notifications':      'Notifications',
    'settings-integrations':       'Integrations',
    'settings-sso':                'SSO / SAML 2.0 / SCIM',
    'settings-microsoft-google':   'Microsoft 365 / Google Workspace',
  }

  const title = pageTitles[active] ?? active

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeItem={active} onNavigate={setActive} />

      {/* Page placeholder */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          padding: '0 24px', height: 70,
          display: 'flex', alignItems: 'center',
          borderBottom: '1px solid #dee2e6',
        }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: '#000' }}>{title}</span>
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 12, userSelect: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(63,69,76,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(63,69,76,0.5)' }}>
                Placeholder for <em style={{ fontStyle: 'normal', color: 'rgba(63,69,76,0.7)' }}>{title}</em> content
              </span>
              <span style={{ fontSize: 13, color: 'rgba(63,69,76,0.35)', maxWidth: 340 }}>
                {t.placeholder.body}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <VenueProvider>
      <LangProvider>
        <AppContent />
      </LangProvider>
    </VenueProvider>
  )
}

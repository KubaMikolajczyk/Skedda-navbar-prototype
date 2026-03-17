export type SettingsItem = {
  id: string
  label: string
  description: string
  icon: string
}

export type SettingsSection = {
  id: string
  title: string
  compactTitle: string
  sectionIcon: string
  items: SettingsItem[]
}

const ICON_HOUSE             = '/icons/settings/house.svg'
const ICON_GRIP              = '/icons/settings/grip.svg'
const ICON_BELLS             = '/icons/settings/bells.svg'
const ICON_MAP_LOCATION      = '/icons/settings/map-location.svg'
const ICON_HOURGLASS         = '/icons/settings/hourglass.svg'
const ICON_TABLET            = '/icons/settings/tablet.svg'
const ICON_CLIPBOARD         = '/icons/settings/clipboard.svg'
const ICON_SATELLITE         = '/icons/settings/satellite.svg'
const ICON_LOCK              = '/icons/settings/lock.svg'
const ICON_FLAG              = '/icons/settings/flag.svg'
const ICON_USER_LOCK         = '/icons/settings/user-lock.svg'
const ICON_CLOCK_ROTATE      = '/icons/settings/clock-rotate.svg'
const ICON_PALETTE           = '/icons/settings/palette.svg'
const ICON_BALLOT_CHECK      = '/icons/settings/ballot-check.svg'
const ICON_SQUARE_INFO       = '/icons/settings/square-info.svg'
const ICON_SITEMAP           = '/icons/settings/sitemap.svg'
const ICON_CREDIT_CARD       = '/icons/settings/credit-card.svg'
const ICON_LOCATION_CHECK    = '/icons/settings/location-check.svg'
const ICON_BADGE_CHECK       = '/icons/settings/badge-check.svg'
const ICON_MONEY_BILL        = '/icons/settings/money-bill.svg'
const ICON_STOPWATCH         = '/icons/settings/stopwatch.svg'
const ICON_DIRECTION         = '/icons/settings/direction.svg'
const ICON_ARROW_RIGHT_LINE  = '/icons/settings/arrow-right-line.svg'
const ICON_CALENDAR_CHECK    = '/icons/settings/calendar-check.svg'
const ICON_ENVELOPE          = '/icons/settings/envelope.svg'
const ICON_PLUG              = '/icons/settings/plug.svg'
const ICON_GEAR              = '/icons/settings/gear.svg'
const ICON_CALENDAR_DAYS     = '/icons/settings/calendar-days.svg'
const ICON_SECTION_VENUE     = '/icons/settings/house.svg'
const ICON_SECTION_BOOKINGS  = '/icons/settings/calendar-check.svg'
const ICON_SECTION_RULES     = '/icons/settings/gavel.svg'
const ICON_SECTION_COMMS     = '/icons/settings/messages.svg'

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'core-booking-setup',
    title: 'Core booking setup',
    compactTitle: 'Your venue',
    sectionIcon: ICON_SECTION_VENUE,
    items: [
      { id: 'settings-basics',             label: 'Basics',                    description: 'Contact, culture, time, branding, subdomain',              icon: ICON_HOUSE },
      { id: 'settings-bookable-spaces',    label: 'Bookable spaces',           description: 'Bookable rooms, studios, courts...',                       icon: ICON_GRIP },
      { id: 'settings-hours',              label: 'Hours of availability',     description: 'Your broad "opening hours"',                               icon: ICON_BELLS },
      { id: 'settings-floor-plans',        label: 'Floor plans & maps',        description: 'Beautiful and interactive layouts of your spaces',          icon: ICON_MAP_LOCATION },
      { id: 'settings-data-retention',     label: 'Data retention',            description: 'How long should old bookings/visits/users be kept?',        icon: ICON_HOURGLASS },
      { id: 'settings-tablet-displays',    label: 'Tablet displays',           description: 'Set up dedicated displays for your spaces',                 icon: ICON_TABLET },
      { id: 'settings-visitor-management', label: 'Visitor management',        description: 'Streamline your visitor tracking and security',             icon: ICON_CLIPBOARD },
      { id: 'settings-occupancy-tracking', label: 'Occupancy tracking',        description: 'Track when your users are on-site',                        icon: ICON_SATELLITE },
      { id: 'settings-admin-roles',        label: 'Admin roles & permissions', description: 'Define roles and permissions for your team',               icon: ICON_LOCK },
      { id: 'settings-support-requests',   label: 'Support requests',          description: 'Define roles and permissions for your team',               icon: ICON_FLAG },
    ],
  },
  {
    id: 'booking-settings',
    title: 'Booking settings',
    compactTitle: 'Bookings',
    sectionIcon: ICON_SECTION_BOOKINGS,
    items: [
      { id: 'settings-access',          label: 'Access & visibility',  description: 'Who can look, who can book, and what do they see?',      icon: ICON_USER_LOCK },
      { id: 'settings-lock-in',         label: 'Lock-in & repetition', description: 'Policies for self-service cancel, change and repeat',    icon: ICON_CLOCK_ROTATE },
      { id: 'settings-coloring',        label: 'Coloring',             description: 'Your stylish color scheme for bookings',                  icon: ICON_PALETTE },
      { id: 'settings-custom-fields',   label: 'Custom fields',        description: 'Flexibly collect additional booking info',                icon: ICON_BALLOT_CHECK },
      { id: 'settings-custom-info',     label: 'Custom information',   description: 'Additional instructions shown to users',                  icon: ICON_SQUARE_INFO },
      { id: 'settings-space-sharing',   label: 'Space sharing',        description: 'Manage dependencies between your spaces',                 icon: ICON_SITEMAP },
      { id: 'settings-online-payments', label: 'Online payments',      description: 'Easily and securely collect booking fees',                icon: ICON_CREDIT_CARD },
      { id: 'settings-check-in',        label: 'Check-in',             description: "Automatically free spaces if users don't show up",       icon: ICON_LOCATION_CHECK },
    ],
  },
  {
    id: 'rules',
    title: 'Rules',
    compactTitle: 'Rules',
    sectionIcon: ICON_SECTION_RULES,
    items: [
      { id: 'settings-conditions',       label: 'Conditions',       description: 'Rules on a per-booking basis',                          icon: ICON_BADGE_CHECK },
      { id: 'settings-pricing',          label: 'Pricing',          description: 'Your pricing structure for bookings',                   icon: ICON_MONEY_BILL },
      { id: 'settings-quotas',           label: 'Quotas',           description: 'Rules to enforce overall booking allowances',           icon: ICON_STOPWATCH },
      { id: 'settings-buffer-time',      label: 'Buffer time',      description: 'Rules to enforce gaps between bookings',               icon: ICON_DIRECTION },
      { id: 'settings-booking-window',   label: 'Booking window',   description: 'Rules to define how far in advance users can book',    icon: ICON_ARROW_RIGHT_LINE },
      { id: 'settings-booking-requests', label: 'Booking requests', description: 'Rules to define which spaces require approval',        icon: ICON_CALENDAR_CHECK },
    ],
  },
  {
    id: 'communicating',
    title: 'Communicating',
    compactTitle: 'Communicating',
    sectionIcon: ICON_SECTION_COMMS,
    items: [
      { id: 'settings-notifications',    label: 'Notifications',                     description: 'User- and venue-directed emails',               icon: ICON_ENVELOPE },
      { id: 'settings-integrations',     label: 'Integrations',                      description: 'Embedding, external calendars, invoicing…',     icon: ICON_PLUG },
      { id: 'settings-sso',              label: 'SSO / SAML 2.0 / SCIM',            description: 'Single sign-on configuration',                  icon: ICON_GEAR },
      { id: 'settings-microsoft-google', label: 'Microsoft 365 / Google Workspace', description: 'Calendar sync, attendees and conferencing',     icon: ICON_CALENDAR_DAYS },
    ],
  },
]

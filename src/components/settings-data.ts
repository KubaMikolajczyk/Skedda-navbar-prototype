import type { Translations } from '../i18n'

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

export function getSettingsSections(t: Translations): SettingsSection[] {
  const s = t.settings
  return [
    {
      id: 'core-booking-setup',
      title: s.sections.coreBookingSetup,
      compactTitle: s.sections.yourVenue,
      sectionIcon: ICON_SECTION_VENUE,
      items: [
        { id: 'settings-basics',             icon: ICON_HOUSE,          ...s.items.basics },
        { id: 'settings-bookable-spaces',    icon: ICON_GRIP,           ...s.items.bookableSpaces },
        { id: 'settings-hours',              icon: ICON_BELLS,          ...s.items.hours },
        { id: 'settings-floor-plans',        icon: ICON_MAP_LOCATION,   ...s.items.floorPlans },
        { id: 'settings-data-retention',     icon: ICON_HOURGLASS,      ...s.items.dataRetention },
        { id: 'settings-tablet-displays',    icon: ICON_TABLET,         ...s.items.tabletDisplays },
        { id: 'settings-visitor-management', icon: ICON_CLIPBOARD,      ...s.items.visitorManagement },
        { id: 'settings-occupancy-tracking', icon: ICON_SATELLITE,      ...s.items.occupancyTracking },
        { id: 'settings-admin-roles',        icon: ICON_LOCK,           ...s.items.adminRoles },
        { id: 'settings-support-requests',   icon: ICON_FLAG,           ...s.items.supportRequests },
      ],
    },
    {
      id: 'booking-settings',
      title: s.sections.bookingSettings,
      compactTitle: s.sections.bookings,
      sectionIcon: ICON_SECTION_BOOKINGS,
      items: [
        { id: 'settings-access',          icon: ICON_USER_LOCK,      ...s.items.access },
        { id: 'settings-lock-in',         icon: ICON_CLOCK_ROTATE,   ...s.items.lockIn },
        { id: 'settings-coloring',        icon: ICON_PALETTE,        ...s.items.coloring },
        { id: 'settings-custom-fields',   icon: ICON_BALLOT_CHECK,   ...s.items.customFields },
        { id: 'settings-custom-info',     icon: ICON_SQUARE_INFO,    ...s.items.customInfo },
        { id: 'settings-space-sharing',   icon: ICON_SITEMAP,        ...s.items.spaceSharing },
        { id: 'settings-online-payments', icon: ICON_CREDIT_CARD,    ...s.items.onlinePayments },
        { id: 'settings-check-in',        icon: ICON_LOCATION_CHECK, ...s.items.checkIn },
      ],
    },
    {
      id: 'rules',
      title: s.sections.rules,
      compactTitle: s.sections.rules,
      sectionIcon: ICON_SECTION_RULES,
      items: [
        { id: 'settings-conditions',       icon: ICON_BADGE_CHECK,      ...s.items.conditions },
        { id: 'settings-pricing',          icon: ICON_MONEY_BILL,       ...s.items.pricing },
        { id: 'settings-quotas',           icon: ICON_STOPWATCH,        ...s.items.quotas },
        { id: 'settings-buffer-time',      icon: ICON_DIRECTION,        ...s.items.bufferTime },
        { id: 'settings-booking-window',   icon: ICON_ARROW_RIGHT_LINE, ...s.items.bookingWindow },
        { id: 'settings-booking-requests', icon: ICON_CALENDAR_CHECK,   ...s.items.bookingRequests },
      ],
    },
    {
      id: 'communicating',
      title: s.sections.communicating,
      compactTitle: s.sections.communicating,
      sectionIcon: ICON_SECTION_COMMS,
      items: [
        { id: 'settings-notifications',    icon: ICON_ENVELOPE,      ...s.items.notifications },
        { id: 'settings-integrations',     icon: ICON_PLUG,          ...s.items.integrations },
        { id: 'settings-sso',              icon: ICON_GEAR,          ...s.items.sso },
        { id: 'settings-microsoft-google', icon: ICON_CALENDAR_DAYS, ...s.items.microsoftGoogle },
      ],
    },
  ]
}

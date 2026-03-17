import { createContext, useContext, useState } from 'react'

export type Lang = 'en' | 'fr' | 'de' | 'es'

export const langLabels: Record<Lang, string> = {
  en: 'English (US)',
  fr: 'Français (FR)',
  de: 'Deutsch (DE)',
  es: 'Español (ES)',
}

type ItemTrans = { label: string; description: string }

export type Translations = {
  nav: {
    schedule: string
    visits: string
    users: string
    insights: string
    bookingRequests: string
  }
  sidebar: {
    billing: string
    trial: string
    daysLeft: string
    settings: string
    openSidebar: string
    closeSidebar: string
  }
  popover: {
    editProfile: string
    language: string
    venue: string
    support: string
    platformStatus: string
    terms: string
    privacyPolicy: string
    updates: string
    logOut: string
  }
  placeholder: {
    title: string
    body: string
  }
  settings: {
    withDescriptions: string
    withoutDescriptions: string
    search: {
      placeholder: string
      suggestedLabel: string
      scope: string
      noResultsFor: string   // use {query} as placeholder
      noResultsHint: string
      knowledgeBase: string
      someMatches: string
    }
    sections: {
      coreBookingSetup: string
      bookingSettings: string
      rules: string
      communicating: string
      yourVenue: string
      bookings: string
    }
    items: {
      basics: ItemTrans
      bookableSpaces: ItemTrans
      hours: ItemTrans
      floorPlans: ItemTrans
      dataRetention: ItemTrans
      tabletDisplays: ItemTrans
      visitorManagement: ItemTrans
      occupancyTracking: ItemTrans
      adminRoles: ItemTrans
      supportRequests: ItemTrans
      access: ItemTrans
      lockIn: ItemTrans
      coloring: ItemTrans
      customFields: ItemTrans
      customInfo: ItemTrans
      spaceSharing: ItemTrans
      onlinePayments: ItemTrans
      checkIn: ItemTrans
      conditions: ItemTrans
      pricing: ItemTrans
      quotas: ItemTrans
      bufferTime: ItemTrans
      bookingWindow: ItemTrans
      bookingRequests: ItemTrans
      notifications: ItemTrans
      integrations: ItemTrans
      sso: ItemTrans
      microsoftGoogle: ItemTrans
    }
  }
}

const dict: Record<Lang, Translations> = {
  en: {
    nav: {
      schedule: 'Schedule',
      visits: 'Visit & Deliveries',
      users: 'Users',
      insights: 'Insights',
      bookingRequests: 'Booking requests',
    },
    sidebar: {
      billing: 'Billing',
      trial: 'Trial - 14 days left',
      daysLeft: 'days left',
      settings: 'Settings',
      openSidebar: 'Open sidebar',
      closeSidebar: 'Close sidebar',
    },
    popover: {
      editProfile: 'Edit profile',
      language: 'Language',
      venue: 'Venue',
      support: 'Support',
      platformStatus: 'Platform status',
      terms: 'Terms',
      privacyPolicy: 'Privacy policy',
      updates: 'Updates',
      logOut: 'Log out',
    },
    placeholder: {
      title: 'Placeholder for {title} content',
      body: 'This is a navigation prototype — collapse, expand, and switch pages to explore how the sidebar behaves.',
    },
    settings: {
      withDescriptions: 'With descriptions',
      withoutDescriptions: 'Without descriptions',
      search: {
        placeholder: 'Search within settings',
        suggestedLabel: 'Suggested searches',
        scope: "Search within Settings only. It won't search bookings or any other data.",
        noResultsFor: "No settings found for '{query}'.",
        noResultsHint: 'Check your spelling or try a different term',
        knowledgeBase: 'Knowledge base',
        someMatches: 'Some matches may be found within the descriptions',
      },
      sections: {
        coreBookingSetup: 'Core booking setup',
        bookingSettings: 'Booking settings',
        rules: 'Rules',
        communicating: 'Communicating',
        yourVenue: 'Your venue',
        bookings: 'Bookings',
      },
      items: {
        basics:             { label: 'Basics',                    description: 'Contact, culture, time, branding, subdomain' },
        bookableSpaces:     { label: 'Bookable spaces',           description: 'Bookable rooms, studios, courts...' },
        hours:              { label: 'Hours of availability',     description: 'Your broad "opening hours"' },
        floorPlans:         { label: 'Floor plans & maps',        description: 'Beautiful and interactive layouts of your spaces' },
        dataRetention:      { label: 'Data retention',            description: 'How long should old bookings/visits/users be kept?' },
        tabletDisplays:     { label: 'Tablet displays',           description: 'Set up dedicated displays for your spaces' },
        visitorManagement:  { label: 'Visitor management',        description: 'Streamline your visitor tracking and security' },
        occupancyTracking:  { label: 'Occupancy tracking',        description: 'Track when your users are on-site' },
        adminRoles:         { label: 'Admin roles & permissions', description: 'Define roles and permissions for your team' },
        supportRequests:    { label: 'Support requests',          description: 'Define roles and permissions for your team' },
        access:             { label: 'Access & visibility',       description: 'Who can look, who can book, and what do they see?' },
        lockIn:             { label: 'Lock-in & repetition',      description: 'Policies for self-service cancel, change and repeat' },
        coloring:           { label: 'Coloring',                  description: 'Your stylish color scheme for bookings' },
        customFields:       { label: 'Custom fields',             description: 'Flexibly collect additional booking info' },
        customInfo:         { label: 'Custom information',        description: 'Additional instructions shown to users' },
        spaceSharing:       { label: 'Space sharing',             description: 'Manage dependencies between your spaces' },
        onlinePayments:     { label: 'Online payments',           description: 'Easily and securely collect booking fees' },
        checkIn:            { label: 'Check-in',                  description: "Automatically free spaces if users don't show up" },
        conditions:         { label: 'Conditions',                description: 'Rules on a per-booking basis' },
        pricing:            { label: 'Pricing',                   description: 'Your pricing structure for bookings' },
        quotas:             { label: 'Quotas',                    description: 'Rules to enforce overall booking allowances' },
        bufferTime:         { label: 'Buffer time',               description: 'Rules to enforce gaps between bookings' },
        bookingWindow:      { label: 'Booking window',            description: 'Rules to define how far in advance users can book' },
        bookingRequests:    { label: 'Booking requests',          description: 'Rules to define which spaces require approval' },
        notifications:      { label: 'Notifications',             description: 'User- and venue-directed emails' },
        integrations:       { label: 'Integrations',              description: 'Embedding, external calendars, invoicing…' },
        sso:                { label: 'SSO / SAML 2.0 / SCIM',    description: 'Single sign-on configuration' },
        microsoftGoogle:    { label: 'Microsoft 365 / Google Workspace', description: 'Calendar sync, attendees and conferencing' },
      },
    },
  },

  fr: {
    nav: {
      schedule: 'Planning',
      visits: 'Visites & Livraisons',
      users: 'Utilisateurs',
      insights: 'Statistiques',
      bookingRequests: 'Demandes de réservation',
    },
    sidebar: {
      billing: 'Facturation',
      trial: 'Essai - 14 jours restants',
      daysLeft: 'jours restants',
      settings: 'Paramètres',
      openSidebar: 'Ouvrir le menu',
      closeSidebar: 'Fermer le menu',
    },
    popover: {
      editProfile: 'Modifier le profil',
      language: 'Langue',
      venue: 'Lieu',
      support: 'Assistance',
      platformStatus: 'État de la plateforme',
      terms: 'Conditions',
      privacyPolicy: 'Politique de confidentialité',
      updates: 'Mises à jour',
      logOut: 'Se déconnecter',
    },
    placeholder: {
      title: 'Espace réservé pour le contenu {title}',
      body: "Ceci est un prototype de navigation — réduisez, développez et changez de page pour explorer le comportement de la barre latérale.",
    },
    settings: {
      withDescriptions: 'Avec descriptions',
      withoutDescriptions: 'Sans descriptions',
      search: {
        placeholder: 'Rechercher dans les paramètres',
        suggestedLabel: 'Recherches suggérées',
        scope: "Recherche uniquement dans Paramètres. Ne recherche pas les réservations ni d'autres données.",
        noResultsFor: "Aucun paramètre trouvé pour « {query} ».",
        noResultsHint: "Vérifiez l'orthographe ou essayez un autre terme",
        knowledgeBase: 'Base de connaissances',
        someMatches: 'Des correspondances peuvent être trouvées dans les descriptions',
      },
      sections: {
        coreBookingSetup: 'Configuration de base',
        bookingSettings: 'Paramètres de réservation',
        rules: 'Règles',
        communicating: 'Communication',
        yourVenue: 'Votre lieu',
        bookings: 'Réservations',
      },
      items: {
        basics:             { label: 'Paramètres généraux',           description: 'Contact, culture, fuseau horaire, marque, sous-domaine' },
        bookableSpaces:     { label: 'Espaces réservables',           description: 'Salles, studios, terrains réservables...' },
        hours:              { label: "Heures d'ouverture",            description: 'Vos « horaires d\'ouverture » généraux' },
        floorPlans:         { label: 'Plans d\'étage et cartes',      description: 'Dispositions belles et interactives de vos espaces' },
        dataRetention:      { label: 'Conservation des données',      description: 'Combien de temps conserver les anciennes réservations/visites/utilisateurs ?' },
        tabletDisplays:     { label: 'Affichages tablette',           description: 'Configurer des affichages dédiés pour vos espaces' },
        visitorManagement:  { label: 'Gestion des visiteurs',         description: 'Simplifiez le suivi et la sécurité de vos visiteurs' },
        occupancyTracking:  { label: "Suivi d'occupation",            description: 'Suivez la présence de vos utilisateurs sur site' },
        adminRoles:         { label: 'Rôles et permissions admin',    description: 'Définir les rôles et permissions pour votre équipe' },
        supportRequests:    { label: 'Demandes de support',           description: 'Définir les rôles et permissions pour votre équipe' },
        access:             { label: 'Accès et visibilité',           description: 'Qui peut voir, qui peut réserver, et que voient-ils ?' },
        lockIn:             { label: 'Verrouillage et répétition',    description: 'Politiques d\'annulation, modification et répétition en libre-service' },
        coloring:           { label: 'Couleurs',                      description: 'Votre schéma de couleurs pour les réservations' },
        customFields:       { label: 'Champs personnalisés',          description: 'Collectez des informations supplémentaires sur les réservations' },
        customInfo:         { label: 'Informations personnalisées',   description: 'Instructions supplémentaires affichées aux utilisateurs' },
        spaceSharing:       { label: 'Partage d\'espaces',            description: 'Gérer les dépendances entre vos espaces' },
        onlinePayments:     { label: 'Paiements en ligne',            description: 'Collectez facilement et en toute sécurité les frais de réservation' },
        checkIn:            { label: 'Enregistrement',                description: 'Libérez automatiquement les espaces si les utilisateurs ne se présentent pas' },
        conditions:         { label: 'Conditions',                    description: 'Règles par réservation' },
        pricing:            { label: 'Tarification',                  description: 'Votre structure tarifaire pour les réservations' },
        quotas:             { label: 'Quotas',                        description: 'Règles pour limiter les allocations globales de réservation' },
        bufferTime:         { label: 'Temps tampon',                  description: 'Règles pour imposer des délais entre les réservations' },
        bookingWindow:      { label: 'Fenêtre de réservation',        description: 'Règles définissant à l\'avance les réservations possibles' },
        bookingRequests:    { label: 'Demandes de réservation',       description: 'Règles définissant quels espaces nécessitent une approbation' },
        notifications:      { label: 'Notifications',                 description: 'E-mails destinés aux utilisateurs et aux lieux' },
        integrations:       { label: 'Intégrations',                  description: 'Intégration, calendriers externes, facturation…' },
        sso:                { label: 'SSO / SAML 2.0 / SCIM',        description: "Configuration de l'authentification unique" },
        microsoftGoogle:    { label: 'Microsoft 365 / Google Workspace', description: 'Synchronisation calendrier, participants et conférences' },
      },
    },
  },

  de: {
    nav: {
      schedule: 'Zeitplan',
      visits: 'Besuche & Lieferungen',
      users: 'Benutzer',
      insights: 'Einblicke',
      bookingRequests: 'Buchungsanfragen',
    },
    sidebar: {
      billing: 'Abrechnung',
      trial: 'Testversion - noch 14 Tage',
      daysLeft: 'Tage übrig',
      settings: 'Einstellungen',
      openSidebar: 'Seitenleiste öffnen',
      closeSidebar: 'Seitenleiste schließen',
    },
    popover: {
      editProfile: 'Profil bearbeiten',
      language: 'Sprache',
      venue: 'Veranstaltungsort',
      support: 'Support',
      platformStatus: 'Plattformstatus',
      terms: 'Nutzungsbedingungen',
      privacyPolicy: 'Datenschutzrichtlinie',
      updates: 'Aktualisierungen',
      logOut: 'Abmelden',
    },
    placeholder: {
      title: 'Platzhalter für {title}-Inhalt',
      body: 'Dies ist ein Navigationsprototyp — reduzieren, erweitern und zwischen Seiten wechseln, um das Verhalten der Seitenleiste zu erkunden.',
    },
    settings: {
      withDescriptions: 'Mit Beschreibungen',
      withoutDescriptions: 'Ohne Beschreibungen',
      search: {
        placeholder: 'In Einstellungen suchen',
        suggestedLabel: 'Vorgeschlagene Suchen',
        scope: 'Sucht nur in Einstellungen. Buchungen oder andere Daten werden nicht durchsucht.',
        noResultsFor: 'Keine Einstellungen gefunden für \u201e{query}\u201c.',
        noResultsHint: 'Überprüfen Sie die Schreibweise oder versuchen Sie einen anderen Begriff',
        knowledgeBase: 'Wissensdatenbank',
        someMatches: 'Einige Treffer können in den Beschreibungen gefunden werden',
      },
      sections: {
        coreBookingSetup: 'Grundlegende Buchungseinrichtung',
        bookingSettings: 'Buchungseinstellungen',
        rules: 'Regeln',
        communicating: 'Kommunikation',
        yourVenue: 'Ihr Veranstaltungsort',
        bookings: 'Buchungen',
      },
      items: {
        basics:             { label: 'Grundeinstellungen',            description: 'Kontakt, Kultur, Zeit, Branding, Subdomain' },
        bookableSpaces:     { label: 'Buchbare Räume',                description: 'Buchbare Zimmer, Studios, Plätze...' },
        hours:              { label: 'Verfügbarkeitszeiten',          description: 'Ihre allgemeinen „Öffnungszeiten"' },
        floorPlans:         { label: 'Grundrisse & Karten',           description: 'Schöne und interaktive Layouts Ihrer Räume' },
        dataRetention:      { label: 'Datenspeicherung',              description: 'Wie lange sollen alte Buchungen/Besuche/Nutzer aufbewahrt werden?' },
        tabletDisplays:     { label: 'Tablet-Displays',               description: 'Dedizierte Displays für Ihre Räume einrichten' },
        visitorManagement:  { label: 'Besucherverwaltung',            description: 'Optimieren Sie Ihr Besucher-Tracking und Ihre Sicherheit' },
        occupancyTracking:  { label: 'Belegungsverfolgung',           description: 'Verfolgen Sie, wann Ihre Nutzer vor Ort sind' },
        adminRoles:         { label: 'Adminrollen & Berechtigungen',  description: 'Rollen und Berechtigungen für Ihr Team festlegen' },
        supportRequests:    { label: 'Support-Anfragen',              description: 'Rollen und Berechtigungen für Ihr Team festlegen' },
        access:             { label: 'Zugang & Sichtbarkeit',         description: 'Wer kann schauen, wer kann buchen, und was sehen sie?' },
        lockIn:             { label: 'Festlegung & Wiederholung',     description: 'Richtlinien für Self-Service-Stornierung, Änderung und Wiederholung' },
        coloring:           { label: 'Farbgebung',                    description: 'Ihr stilvolles Farbschema für Buchungen' },
        customFields:       { label: 'Benutzerdefinierte Felder',     description: 'Flexibel zusätzliche Buchungsinformationen sammeln' },
        customInfo:         { label: 'Benutzerdefinierte Informationen', description: 'Zusätzliche Anweisungen für Nutzer' },
        spaceSharing:       { label: 'Raumteilung',                   description: 'Abhängigkeiten zwischen Ihren Räumen verwalten' },
        onlinePayments:     { label: 'Online-Zahlungen',              description: 'Buchungsgebühren einfach und sicher einziehen' },
        checkIn:            { label: 'Check-in',                      description: 'Räume automatisch freigeben, wenn Nutzer nicht erscheinen' },
        conditions:         { label: 'Bedingungen',                   description: 'Regeln auf Buchungsbasis' },
        pricing:            { label: 'Preisgestaltung',               description: 'Ihre Preisstruktur für Buchungen' },
        quotas:             { label: 'Kontingente',                   description: 'Regeln zur Durchsetzung von Buchungskontingenten' },
        bufferTime:         { label: 'Pufferzeit',                    description: 'Regeln zur Durchsetzung von Lücken zwischen Buchungen' },
        bookingWindow:      { label: 'Buchungsfenster',               description: 'Regeln für den Buchungsvorlauf' },
        bookingRequests:    { label: 'Buchungsanfragen',              description: 'Regeln für genehmigungspflichtige Räume' },
        notifications:      { label: 'Benachrichtigungen',            description: 'Nutzer- und ortsbezogene E-Mails' },
        integrations:       { label: 'Integrationen',                 description: 'Einbettung, externe Kalender, Rechnungsstellung…' },
        sso:                { label: 'SSO / SAML 2.0 / SCIM',        description: 'Single-Sign-On-Konfiguration' },
        microsoftGoogle:    { label: 'Microsoft 365 / Google Workspace', description: 'Kalendersynchronisation, Teilnehmer und Konferenzen' },
      },
    },
  },

  es: {
    nav: {
      schedule: 'Calendario',
      visits: 'Visitas y Entregas',
      users: 'Usuarios',
      insights: 'Estadísticas',
      bookingRequests: 'Solicitudes de reserva',
    },
    sidebar: {
      billing: 'Facturación',
      trial: 'Prueba - 14 días restantes',
      daysLeft: 'días restantes',
      settings: 'Configuración',
      openSidebar: 'Abrir barra lateral',
      closeSidebar: 'Cerrar barra lateral',
    },
    popover: {
      editProfile: 'Editar perfil',
      language: 'Idioma',
      venue: 'Lugar',
      support: 'Soporte',
      platformStatus: 'Estado de la plataforma',
      terms: 'Términos',
      privacyPolicy: 'Política de privacidad',
      updates: 'Actualizaciones',
      logOut: 'Cerrar sesión',
    },
    placeholder: {
      title: 'Marcador de posición para el contenido de {title}',
      body: 'Este es un prototipo de navegación — colapsa, expande y cambia de página para explorar el comportamiento de la barra lateral.',
    },
    settings: {
      withDescriptions: 'Con descripciones',
      withoutDescriptions: 'Sin descripciones',
      search: {
        placeholder: 'Buscar en configuración',
        suggestedLabel: 'Búsquedas sugeridas',
        scope: 'Busca solo en Configuración. No buscará reservas ni ningún otro dato.',
        noResultsFor: "No se encontraron configuraciones para «{query}».",
        noResultsHint: 'Revise la ortografía o intente con un término diferente',
        knowledgeBase: 'Base de conocimientos',
        someMatches: 'Algunas coincidencias pueden encontrarse en las descripciones',
      },
      sections: {
        coreBookingSetup: 'Configuración básica de reservas',
        bookingSettings: 'Ajustes de reserva',
        rules: 'Reglas',
        communicating: 'Comunicación',
        yourVenue: 'Su lugar',
        bookings: 'Reservas',
      },
      items: {
        basics:             { label: 'Configuración básica',          description: 'Contacto, cultura, zona horaria, marca, subdominio' },
        bookableSpaces:     { label: 'Espacios reservables',          description: 'Salas, estudios, canchas reservables...' },
        hours:              { label: 'Horario de disponibilidad',     description: 'Sus "horarios de apertura" generales' },
        floorPlans:         { label: 'Planos y mapas',                description: 'Diseños hermosos e interactivos de sus espacios' },
        dataRetention:      { label: 'Retención de datos',            description: '¿Cuánto tiempo conservar reservas/visitas/usuarios antiguos?' },
        tabletDisplays:     { label: 'Pantallas de tableta',          description: 'Configurar pantallas dedicadas para sus espacios' },
        visitorManagement:  { label: 'Gestión de visitantes',         description: 'Optimice el seguimiento y la seguridad de sus visitantes' },
        occupancyTracking:  { label: 'Seguimiento de ocupación',      description: 'Rastree cuándo sus usuarios están en el lugar' },
        adminRoles:         { label: 'Roles y permisos de administrador', description: 'Definir roles y permisos para su equipo' },
        supportRequests:    { label: 'Solicitudes de soporte',        description: 'Definir roles y permisos para su equipo' },
        access:             { label: 'Acceso y visibilidad',          description: '¿Quién puede ver, quién puede reservar y qué ven?' },
        lockIn:             { label: 'Bloqueo y repetición',          description: 'Políticas de cancelación, cambio y repetición de autoservicio' },
        coloring:           { label: 'Colores',                       description: 'Su esquema de colores para las reservas' },
        customFields:       { label: 'Campos personalizados',         description: 'Recopilar información adicional de reservas de forma flexible' },
        customInfo:         { label: 'Información personalizada',     description: 'Instrucciones adicionales mostradas a los usuarios' },
        spaceSharing:       { label: 'Uso compartido de espacios',    description: 'Gestionar dependencias entre sus espacios' },
        onlinePayments:     { label: 'Pagos en línea',                description: 'Recaude tarifas de reserva de forma fácil y segura' },
        checkIn:            { label: 'Check-in',                      description: 'Liberar automáticamente espacios si los usuarios no aparecen' },
        conditions:         { label: 'Condiciones',                   description: 'Reglas por reserva' },
        pricing:            { label: 'Precios',                       description: 'Su estructura de precios para reservas' },
        quotas:             { label: 'Cuotas',                        description: 'Reglas para aplicar asignaciones globales de reserva' },
        bufferTime:         { label: 'Tiempo de margen',              description: 'Reglas para imponer intervalos entre reservas' },
        bookingWindow:      { label: 'Ventana de reserva',            description: 'Reglas para definir con cuánta anticipación pueden reservar los usuarios' },
        bookingRequests:    { label: 'Solicitudes de reserva',        description: 'Reglas para definir qué espacios requieren aprobación' },
        notifications:      { label: 'Notificaciones',                description: 'Correos dirigidos a usuarios y al lugar' },
        integrations:       { label: 'Integraciones',                 description: 'Incrustación, calendarios externos, facturación…' },
        sso:                { label: 'SSO / SAML 2.0 / SCIM',        description: 'Configuración de inicio de sesión único' },
        microsoftGoogle:    { label: 'Microsoft 365 / Google Workspace', description: 'Sincronización de calendarios, asistentes y conferencias' },
      },
    },
  },
}

type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextType>(null!)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

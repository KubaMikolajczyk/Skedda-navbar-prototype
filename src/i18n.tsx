import { createContext, useContext, useState } from 'react'

export type Lang = 'en' | 'fr' | 'de' | 'es'

export const langLabels: Record<Lang, string> = {
  en: 'English (US)',
  fr: 'Français (FR)',
  de: 'Deutsch (DE)',
  es: 'Español (ES)',
}

type Translations = {
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

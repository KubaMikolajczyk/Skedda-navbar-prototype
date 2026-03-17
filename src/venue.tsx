import { createContext, useContext, useEffect, useState } from 'react'

export type VenueConfig = {
  name: string
  logo: string
  primary: string
  primaryLight: string
  primaryBorder: string
  primaryDark: string
}

export const venues: VenueConfig[] = [
  {
    name: "Fred's Playground",
    logo: '/logos/Logo 1.png',
    primary: '#6610F2',
    primaryLight: '#e9dcff',
    primaryBorder: '#b38df1',
    primaryDark: '#260064',
  },
  {
    name: 'Maplewood Community Center',
    logo: '/logos/Logo 2.png',
    primary: '#06996C',
    primaryLight: '#d4f0e8',
    primaryBorder: '#7ecfb2',
    primaryDark: '#034d36',
  },
  {
    name: 'Riverside Sports Hall',
    logo: '/logos/Logo 3.png',
    primary: '#DB6900',
    primaryLight: '#fde8cc',
    primaryBorder: '#f0aa66',
    primaryDark: '#6e3400',
  },
]

type VenueContextType = {
  venue: VenueConfig
  setVenue: (v: VenueConfig) => void
}

const VenueContext = createContext<VenueContextType>(null!)

function applyVenueCssVars(v: VenueConfig) {
  const root = document.documentElement
  root.style.setProperty('--color-primary', v.primary)
  root.style.setProperty('--color-primary-light', v.primaryLight)
  root.style.setProperty('--color-primary-border', v.primaryBorder)
  root.style.setProperty('--color-primary-dark', v.primaryDark)
}

export function VenueProvider({ children }: { children: React.ReactNode }) {
  const [venue, setVenueState] = useState(venues[0])

  useEffect(() => { applyVenueCssVars(venues[0]) }, [])

  function setVenue(v: VenueConfig) {
    setVenueState(v)
    applyVenueCssVars(v)
  }

  return (
    <VenueContext.Provider value={{ venue, setVenue }}>
      {children}
    </VenueContext.Provider>
  )
}

export function useVenue() {
  return useContext(VenueContext)
}

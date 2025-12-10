'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

interface ModalState {
  menu: boolean
}

interface AppContextValue {
  menuState: boolean
  activateMenu: () => void
  deactivateMenu: () => void
}

interface AppProviderProps {
  children: ReactNode
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContext')
  }

  return context
}

export function AppContextProvider({ children }: AppProviderProps) {
  const [modal, setModal] = useState<ModalState>({ menu: false })

  const activateMenu = () => {
    setModal((prev) => ({ ...prev, menu: true }))
  }

  const deactivateMenu = () => {
    setModal((prev) => ({ ...prev, menu: false }))
  }

  const value: AppContextValue = {
    menuState: modal.menu,
    activateMenu,
    deactivateMenu,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

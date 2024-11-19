import React, { createContext, useContext, useState, ReactNode } from 'react'
import { BusinessCard } from '../types/card'

interface CardContextType {
  card: BusinessCard | undefined
  setCard: React.Dispatch<React.SetStateAction<BusinessCard | undefined>>
  updateProfile: (key: keyof BusinessCard['profile'], value: string) => void
  updateLink: (
    index: number,
    key: keyof BusinessCard['fields'][number],
    value: string | boolean
  ) => void
  updateThemeColor: (color: string) => void
}

const CardContext = createContext<CardContextType | undefined>(undefined)

export const CardProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [card, setCard] = useState<BusinessCard | undefined>(undefined)

  const updateThemeColor = (color: string) => {
    setCard(prevCard => ({
      ...prevCard,
      themeColor: color
    }))
  }

  return (
    <CardContext.Provider
      value={{ card, setCard, updateProfile, updateLink, updateThemeColor }}
    >
      {children}
    </CardContext.Provider>
  )
}

export const useCard = () => {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('useCard must be used within a CardProvider')
  }
  return context
}

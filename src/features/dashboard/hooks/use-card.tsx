import { useContext } from 'react'
import { CardContext } from '../contexts/card-context'

export const useCard = () => {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('useCard must be used within a CardProvider')
  }
  return context
}

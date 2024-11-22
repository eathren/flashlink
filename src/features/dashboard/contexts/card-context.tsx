import React, { createContext, useState, useEffect, ReactNode } from 'react'
import {
  BusinessCard,
  CardInformation,
  CardAffiliation,
  CardLink
} from '../types/card'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams } from '@tanstack/react-router'
import { auth } from '@/firebase'
import toast from 'react-hot-toast'

interface CardContextType {
  card: BusinessCard | undefined
  setCard: React.Dispatch<React.SetStateAction<BusinessCard | undefined>>
  getProfile: () => CardInformation | undefined
  setProfile: (profile: CardInformation) => void
  updateProfileField: (key: keyof CardInformation, value: string) => void
  getAffiliation: () => CardAffiliation | undefined
  setAffiliation: (affiliation: CardAffiliation) => void
  getThemeColor: () => string | undefined
  setThemeColor: (color: string) => void
  getLinks: () => CardLink[] | undefined
  setLinks: (links: CardLink[]) => void
  updateLink: (
    index: number,
    key: keyof CardLink,
    value: string | boolean
  ) => void
  submitCard: () => Promise<void>
  loading: boolean
}

export const CardContext = createContext<CardContextType | undefined>(undefined)

export const CardProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const { cId } = useParams({ from: '/_auth/c/$cId/edit' })
  const [card, setCard] = useState<BusinessCard | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCardData = async () => {
      setLoading(true)
      try {
        const user = auth.currentUser
        if (!user) {
          throw new Error('User not authenticated')
        }

        const firestore = getFirestore()
        const cardDocRef = doc(firestore, 'businessCards', cId)
        const cardDoc = await getDoc(cardDocRef)
        if (cardDoc.exists()) {
          const cardData = cardDoc.data() as BusinessCard
          if (cardData.userId !== user.uid) {
            throw new Error('Access denied: You do not own this card')
          }
          setCard(cardData)
        } else {
          throw new Error('Card not found')
        }
      } catch (error) {
        console.error(error)
        toast.error(
          error instanceof Error ? error.message : 'An unknown error occurred'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCardData()
  }, [cId])

  const getProfile = () => card?.profile

  const setProfile = (profile: CardInformation) => {
    setCard(prevCard => (prevCard ? { ...prevCard, profile } : prevCard))
  }

  const updateProfileField = (key: keyof CardInformation, value: string) => {
    setCard(prevCard => {
      if (!prevCard || !prevCard.profile) return prevCard
      return {
        ...prevCard,
        profile: {
          ...prevCard.profile,
          [key]: value
        }
      }
    })
  }

  const getAffiliation = () => card?.affiliation

  const setAffiliation = (affiliation: CardAffiliation) => {
    setCard(prevCard => (prevCard ? { ...prevCard, affiliation } : prevCard))
  }

  const getThemeColor = () => card?.themeColor

  const setThemeColor = (color: string) => {
    setCard(prevCard =>
      prevCard ? { ...prevCard, themeColor: color } : prevCard
    )
  }

  const getLinks = () => card?.links

  const setLinks = (links: CardLink[]) => {
    setCard(prevCard => (prevCard ? { ...prevCard, links } : prevCard))
  }

  const updateLink = (
    index: number,
    key: keyof CardLink,
    value: string | boolean
  ) => {
    setCard(prevCard => {
      if (!prevCard || !prevCard.links) return prevCard
      const updatedLinks = [...prevCard.links]
      updatedLinks[index] = {
        ...updatedLinks[index],
        [key]: value
      }
      return {
        ...prevCard,
        links: updatedLinks
      }
    })
  }

  const submitCard = async () => {
    if (!card) return
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('User not authenticated')
      }

      const filteredFormValues = Object.fromEntries(
        Object.entries(card).filter(([, v]) => v !== undefined)
      )

      const cardDocRef = doc(getFirestore(), 'businessCards', cId)
      await updateDoc(cardDocRef, filteredFormValues)
      toast.success('Business card updated successfully')
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    }
  }

  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
        getProfile,
        setProfile,
        updateProfileField,
        getAffiliation,
        setAffiliation,
        getThemeColor,
        setThemeColor,
        getLinks,
        setLinks,
        updateLink,
        submitCard,
        loading
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </CardContext.Provider>
  )
}

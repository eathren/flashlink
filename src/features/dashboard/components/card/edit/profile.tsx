import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BusinessCard } from '@/features/dashboard/types/card'
import { auth } from '@/firebase'
import { useParams } from '@tanstack/react-router'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { InputForProfile } from './input-for-profile'
import { Button } from '@/components/ui/button'
import { Check } from 'tabler-icons-react'
import { Spinner } from '@/components/ui/spinner'
import { LinksDialog } from './links-dialog'

const firestore = getFirestore()

const presetColors = [
  '#D3D3D3', // Grey
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FF33A5', // Pink
  '#33FFA5', // Mint
  '#FFA533', // Orange
  '#8E33FF', // Purple
  '#FF3380', // Magenta
  '#33FFD7', // Aqua
  '#FFDA33', // Yellow
  '#33A5FF', // Sky Blue
  '#848884' // Red
]

export const EditCardProfile = () => {
  const { cId } = useParams({ from: '/_auth/c/$cId/edit' })
  const [card, setCard] = useState<BusinessCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true)
      try {
        const user = auth.currentUser
        if (!user) {
          throw new Error('User not authenticated')
        }

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

    fetchCard()
  }, [cId])

  const handleProfileChange = (key: string, value: string) => {
    if (!card) return
    setCard({
      ...card,
      profile: {
        ...card.profile,
        [key]: value
      }
    })
  }

  const handleColorChange = (color: string) => {
    setCard(prevValues =>
      prevValues
        ? {
            ...prevValues,
            themeColor: color
          }
        : prevValues
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('User not authenticated')
      }
      if (!card) {
        throw new Error('Form values are not defined')
      }

      const filteredFormValues = Object.fromEntries(
        Object.entries(card).filter(([, v]) => v !== undefined)
      )

      const cardDocRef = doc(firestore, 'businessCards', cId)
      await updateDoc(cardDocRef, filteredFormValues)
      toast.success('Business card updated successfully')
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-xl m-auto mt-10">
        <Spinner />
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold"> About </h1>
      {card && card.profile && (
        <InputForProfile
          name={card.profile.name || ''}
          location={card.profile.location || ''}
          jobTitle={card.profile.jobTitle || ''}
          pronouns={card.profile.pronouns || ''}
          bio={card.profile.bio || ''}
          onProfileChange={handleProfileChange}
        />
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {presetColors.map(color => (
          <Button
            type="button"
            key={color}
            style={{ backgroundColor: color }}
            className="h-8 w-8 p-0 border border-gray-300"
            onClick={() => handleColorChange(color)}
          >
            {card?.themeColor === color && (
              <Check className="text-white w-4 h-4 absolute" />
            )}
          </Button>
        ))}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}

export default EditCardProfile

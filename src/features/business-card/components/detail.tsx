import React, { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useParams } from '@tanstack/react-router'
import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { BusinessCard } from '../types/card'

const firestore = getFirestore()

const CardDetail = () => {
  const { cId } = useParams({ from: '/c/$cId' })
  const [card, setCard] = useState<BusinessCard | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchCardData = async () => {
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

    fetchCardData()
  }, [cId, setCard])

  if (loading) {
    return (
      <div className="w-full max-w-lg m-auto min-h-screen shadow-xl border border-gray-200 ">
        <Skeleton className="h-full w-full " />
      </div>
    )
  }

  return (
    <Card className="w-full max-w-lg m-auto min-h-screen rounded-none shadow-xl border border-gray-200 ">
      <CardHeader
        style={{ backgroundColor: card?.themeColor }}
        className="h-10 mb-10 "
      >
        <CardTitle
          hidden={true}
          className="text-2xl font-semibold text-center mb-4"
        >
          {card?.profile?.firstName || 'Card Details'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Profile</h2>
            <p>
              Name: {card?.profile?.firstName} {card?.profile?.lastName}
            </p>
            <p>Job Title: {card?.profile?.jobTitle}</p>
            <p>Company: {card?.profile?.company}</p>
            <p>Location: {card?.profile?.location}</p>
            <p>Bio: {card?.profile?.bio}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Links</h2>
            {card?.links?.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>{link.title}:</span>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {link.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardDetail

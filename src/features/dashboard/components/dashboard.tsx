import { useEffect, useState } from 'react'
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  Timestamp
} from 'firebase/firestore'
import { auth } from '@/firebase'
import CreateBusinessCard from './create-business-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { BusinessCard } from '../types/card'
const firestore = getFirestore()

const Dashboard = () => {
  const [businessCards, setBusinessCards] = useState<BusinessCard[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const user = auth.currentUser
  useEffect(() => {
    if (!user) {
      console.error('User not authenticated')
      setLoading(false)
      return
    }

    const businessCardsCollectionRef = collection(firestore, 'businessCards')
    const q = query(businessCardsCollectionRef, where('userId', '==', user.uid))

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const cards = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            name: data.name,
            createdAt:
              data.createdAt instanceof Timestamp
                ? data.createdAt
                : Timestamp.now(),
            themeColor: data.themeColor
          }
        })

        setBusinessCards(cards)
        setLoading(false)
      },
      error => {
        console.error('Error fetching business cards:', error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const rgbaThemeColor = (color?: string) => {
    if (!color) return 'rgba(255, 255, 255, 1)'
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, 0.1)`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
          {businessCards?.length === 0 ? (
            <p className="text-center text-gray-700 col-span-full">
              No business cards found.
            </p>
          ) : (
            businessCards?.map(card => (
              <Card
                key={card.id}
                style={{ backgroundColor: rgbaThemeColor(card.themeColor) }}
                className="shadow-lg rounded-lg hover:shadow-xl transition duration-300"
              >
                <CardHeader className="border-gray-600 border-b-2 h-[50%]">
                  <CardTitle className="text-center">
                    <p className="text-lg font-semibold">{card.name}</p>
                    <p className="text-sm ">
                      {card.title ? card.title : 'Business Card'}
                    </p>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center pt-10 ">
                  <div className="mt-auto flex justify-between w-full">
                    <Link to={`/c/${card.id}/edit`} className="w-full">
                      <Button className="w-full">Edit Card</Button>
                    </Link>
                    <Link to={`/c/${card.id}`} className="ml-2 w-full">
                      <Button className="w-full">Share Card</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          <CreateBusinessCard />
        </div>
      )}
    </div>
  )
}

export default Dashboard

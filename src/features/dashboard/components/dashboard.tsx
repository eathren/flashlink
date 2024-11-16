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
import CreateBusinessCard from './card/create'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { BusinessCard } from '../types/card'
import { Skeleton } from '@/components/ui/skeleton'

const firestore = getFirestore()

const Dashboard = () => {
  const [businessCards, setBusinessCards] = useState<BusinessCard[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = auth.currentUser
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
            jobTitle: data.jobTitle,
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
    return `rgba(${r}, ${g}, ${b}, 0.2)`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {loading ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
          <Skeleton className="h-64 w-64 rounded-xl" />
          <Skeleton className="h-64 w-64 rounded-xl" />
          <Skeleton className="h-64 w-64 rounded-xl" />
          <Skeleton className="h-64 w-64 rounded-xl" />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-4 overflow-auto">
          {businessCards?.length === 0 ? (
            <p className="text-center text-gray-700 col-span-full">
              No business cards found.
            </p>
          ) : (
            businessCards
              ?.sort(
                (a, b) =>
                  (a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0)
              )
              .map(card => (
                <Card
                  key={card.id}
                  className="shadow-2xl rounded-lg hover:shadow-4xl transition duration-300 flex flex-col min-h-64"
                >
                  <CardHeader className=" relative flex-1 flex items-center justify-center border-b-2 border-gray-200 rounded-t-lg">
                    <CardTitle className="text-center">
                      <h2 className="text-xl font-semibold">
                        {card.name || 'New Card'}
                      </h2>
                      <p className="text-sm text-gray-500">{card.jobTitle}</p>
                    </CardTitle>
                  </CardHeader>

                  <CardContent
                    className="flex-1 flex flex-col items-center justify-center rounded-b-lg"
                    style={{
                      backgroundColor: `${card.themeColor || '#ffffff'} `,
                      opacity: 0.8,
                      backgroundImage: `radial-gradient(${card.themeColor} 0.5px, transparent 0.5px), radial-gradient(${card.themeColor} 0.5px,  ${rgbaThemeColor(card.themeColor)} 0.5px)`,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 10px 10px'
                    }}
                  >
                    <div className="mt-auto  flex justify-between w-full">
                      <Link
                        to={`/c/${card.id}/edit`}
                        className="w-full"
                        aria-label="edit card"
                      >
                        <Button variant="outline" className="w-full">
                          Edit
                        </Button>
                      </Link>
                      <Link
                        to={`/c/${card.id}`}
                        className="ml-2 w-full"
                        aria-label="share card"
                      >
                        <Button variant="outline" className="w-full">
                          Preview
                        </Button>
                      </Link>
                      <Link
                        to={`/c/${card.id}`}
                        className="ml-2 w-full"
                        aria-label="share card"
                        search={{
                          share: true
                        }}
                      >
                        <Button variant="outline" className="w-full">
                          Share
                        </Button>
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

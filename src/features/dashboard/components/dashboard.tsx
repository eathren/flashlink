import { useEffect, useState } from 'react'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { auth } from '@/firebase'
import CreateBusinessCard from './create-business-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Link } from '@tanstack/react-router'

const firestore = getFirestore()

interface BusinessCard {
  id: string
  title?: string
  createdAt: Date
}

const Dashboard = () => {
  const [businessCards, setBusinessCards] = useState<BusinessCard[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBusinessCards = async () => {
      setLoading(true)
      try {
        const user = auth.currentUser
        if (!user) {
          throw new Error('User not authenticated')
        }

        const businessCardsCollectionRef = collection(
          firestore,
          'businessCards'
        )
        const q = query(
          businessCardsCollectionRef,
          where('userId', '==', user.uid)
        )
        const querySnapshot = await getDocs(q)

        const cards = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            createdAt: data.createdAt.toDate() // assuming createdAt is a Firestore Timestamp
          }
        })

        setBusinessCards(cards)
      } catch (error) {
        console.error('Error fetching business cards:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinessCards()
  }, [])

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
              <Link
                to={`/u/${auth.currentUser?.uid}/c/${card.id}/edit`}
                key={card.id}
              >
                <Card className="w-full p-6">
                  <CardHeader>
                    <CardTitle>
                      {card.title ? card.title : 'Business Card'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Created at: {card.createdAt.toLocaleDateString()}{' '}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
          <CreateBusinessCard />
        </div>
      )}
    </div>
  )
}

export default Dashboard

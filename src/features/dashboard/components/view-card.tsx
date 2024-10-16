import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { BusinessCard } from '../types/card'

const firestore = getFirestore()

const ViewCard = () => {
  const { cId } = useParams({ from: '/c/$cId' })
  const [loading, setLoading] = useState(true)
  const [businessCard, setBusinessCard] = useState<BusinessCard | undefined>()

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cardDocRef = doc(firestore, 'businessCards', cId)
        const cardDoc = await getDoc(cardDocRef)
        if (cardDoc.exists()) {
          setBusinessCard(cardDoc.data() as BusinessCard)
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

  if (loading) {
    return <Spinner />
  }

  if (!businessCard) {
    return <div>No business card found.</div>
  }

  return (
    <Card className="w-full max-w-md p-6 m-auto mt-20">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Business Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <h2>Personal</h2>
          <p>
            <strong>Name:</strong> {businessCard.name}
          </p>
          <p>
            <strong>Job Title:</strong> {businessCard.jobTitle}
          </p>
          <p>
            <strong>Department:</strong> {businessCard.department}
          </p>
          <p>
            <strong>Company Name:</strong> {businessCard.companyName}
          </p>
          <p>
            <strong>Accreditations:</strong> {businessCard.accreditations}
          </p>
          <p>
            <strong>Headline:</strong> {businessCard.headline}
          </p>

          <h2>General</h2>
          <p>
            <strong>Email:</strong> {businessCard.email}
          </p>
          <p>
            <strong>Phone:</strong> {businessCard.phone}
          </p>
          <p>
            <strong>Company URL:</strong> {businessCard.companyUrl}
          </p>
          <p>
            <strong>Address:</strong> {businessCard.address}
          </p>

          <h2>Social Links</h2>
          <p>
            <strong>X:</strong> {businessCard.links?.x}
          </p>
          <p>
            <strong>Instagram:</strong> {businessCard.links?.instagram}
          </p>
          <p>
            <strong>Threads:</strong> {businessCard.links?.threads}
          </p>
          <p>
            <strong>LinkedIn:</strong> {businessCard.links?.linkedIn}
          </p>
          <p>
            <strong>Facebook:</strong> {businessCard.links?.facebook}
          </p>
          <p>
            <strong>YouTube:</strong> {businessCard.links?.youtube}
          </p>
          <p>
            <strong>Snapchat:</strong> {businessCard.links?.snapchat}
          </p>
          <p>
            <strong>TikTok:</strong> {businessCard.links?.tiktok}
          </p>
          <p>
            <strong>Twitch:</strong> {businessCard.links?.twitch}
          </p>
          <p>
            <strong>Yelp:</strong> {businessCard.links?.yelp}
          </p>

          <h2>Messaging</h2>
          <p>
            <strong>WhatsApp:</strong> {businessCard.links?.whatsapp}
          </p>
          <p>
            <strong>Signal:</strong> {businessCard.links?.signal}
          </p>
          <p>
            <strong>Discord:</strong> {businessCard.links?.discord}
          </p>
          <p>
            <strong>Skype:</strong> {businessCard.links?.skype}
          </p>
          <p>
            <strong>Telegram:</strong> {businessCard.links?.telegram}
          </p>

          <h2>Business Links</h2>
          <p>
            <strong>GitHub:</strong> {businessCard.links?.github}
          </p>
          <p>
            <strong>Calendly:</strong> {businessCard.links?.calendly}
          </p>

          <h2>Payment Links</h2>
          <p>
            <strong>PayPal:</strong> {businessCard.links?.paypal}
          </p>
          <p>
            <strong>Venmo:</strong> {businessCard.links?.venmo}
          </p>
          <p>
            <strong>Cash App:</strong> {businessCard.links?.cashapp}
          </p>

          <h2>Theme Color</h2>
          <p>
            <strong>Theme Color:</strong> {businessCard.themeColor}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ViewCard

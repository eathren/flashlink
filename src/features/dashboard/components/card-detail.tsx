import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth } from '@/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { BusinessCard } from '../types/card'

const firestore = getFirestore()

const CardDetail = () => {
  const { cId } = useParams({ from: '/c/$cId' })
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState<BusinessCard | undefined>()

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true)
      try {
        const cardDocRef = doc(firestore, 'businessCards', cId)
        const cardDoc = await getDoc(cardDocRef)
        if (cardDoc.exists()) {
          const cardData = cardDoc.data() as BusinessCard
          setFormValues(cardData)
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

  if (loading) return <Loader />

  const renderField = (label: string, value: string | undefined) => {
    return value ? (
      <div key={label}>
        <strong>{label}:</strong> {value}
      </div>
    ) : null
  }

  return (
    <Card
      className="w-full max-w-md p-6 m-auto mt-20"
      style={{ backgroundColor: formValues?.themeColor }}
    >
      <CardHeader>
        <CardTitle hidden={true} className="text-2xl font-semibold text-center">
          Card Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formValues ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Personal</h2>
            {renderField('Name', formValues.name)}
            {renderField('Job Title', formValues.jobTitle)}
            {renderField('Department', formValues.department)}
            {renderField('Company Name', formValues.companyName)}
            {renderField('Accreditations', formValues.accreditations)}
            {renderField('Headline', formValues.headline)}

            <h2 className="text-lg font-semibold">General</h2>
            {renderField('Email', formValues.email)}
            {renderField('Phone', formValues.phone)}
            {renderField('Company URL', formValues.companyUrl)}
            {renderField('Address', formValues.address)}

            <h2 className="text-lg font-semibold">Social Links</h2>
            {renderField('X', formValues.links?.x)}
            {renderField('Instagram', formValues.links?.instagram)}
            {renderField('Threads', formValues.links?.threads)}
            {renderField('LinkedIn', formValues.links?.linkedIn)}
            {renderField('Facebook', formValues.links?.facebook)}
            {renderField('YouTube', formValues.links?.youtube)}
            {renderField('Snapchat', formValues.links?.snapchat)}
            {renderField('TikTok', formValues.links?.tiktok)}
            {renderField('Twitch', formValues.links?.twitch)}
            {renderField('Yelp', formValues.links?.yelp)}

            <h2 className="text-lg font-semibold">Messaging</h2>
            {renderField('WhatsApp', formValues.links?.whatsapp)}
            {renderField('Signal', formValues.links?.signal)}
            {renderField('Discord', formValues.links?.discord)}
            {renderField('Skype', formValues.links?.skype)}
            {renderField('Telegram', formValues.links?.telegram)}

            <h2 className="text-lg font-semibold">Business</h2>
            {renderField('GitHub', formValues.links?.github)}
            {renderField('Calendly', formValues.links?.calendly)}

            <h2 className="text-lg font-semibold">Payment</h2>
            {renderField('PayPal', formValues.links?.paypal)}
            {renderField('Venmo', formValues.links?.venmo)}
            {renderField('Cash App', formValues.links?.cashapp)}
          </div>
        ) : (
          <p>No card details available.</p>
        )}
      </CardContent>
    </Card>
  )
}

export default CardDetail

import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { BusinessCard } from '../types/card'
import { QRCodeSVG } from 'qrcode.react'

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

  const renderField = (
    label: string,
    value: string | undefined,
    strong?: boolean
  ) => {
    return value ? (
      <div
        key={label}
        className="flex justify-between py-2 border-b border-black border-opacity-10"
      >
        <span className="text-sm font-medium">{label}:</span>
        <span className={strong ? 'font-semibold' : 'text-gray-700'}>
          {value}
        </span>
      </div>
    ) : null
  }

  return (
    <Card
      className="w-full max-w-md p-6 m-auto mt-10 shadow-xl rounded-lg border border-gray-200"
      style={{ backgroundColor: formValues?.themeColor || '#ffffff' }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center mb-4">
          {formValues?.name || 'Card Details'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formValues ? (
          <div className="space-y-4">
            <div className="text-center">
              <QRCodeSVG
                bgColor={formValues.themeColor}
                value={`https://flashlink.io/c/${cId}`}
                size={128}
                className="mx-auto mb-4"
              />
            </div>
            {renderField('Name', formValues.name, true)}
            {renderField('Company Name', formValues.companyName)}
            {renderField('Department', formValues.department)}
            {renderField('Job Title', formValues.jobTitle)}
            {renderField('Accreditations', formValues.accreditations)}
            {renderField('Headline', formValues.headline)}

            {renderField('Email', formValues.email)}
            {renderField('Phone', formValues.phone)}
            {renderField('Company URL', formValues.companyUrl)}
            {renderField('Address', formValues.address)}

            <div className="mt-4">
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
            </div>

            <div className="mt-4">
              {renderField('WhatsApp', formValues.links?.whatsapp)}
              {renderField('Signal', formValues.links?.signal)}
              {renderField('Discord', formValues.links?.discord)}
              {renderField('Skype', formValues.links?.skype)}
              {renderField('Telegram', formValues.links?.telegram)}
            </div>

            <div className="mt-4">
              {renderField('GitHub', formValues.links?.github)}
              {renderField('Calendly', formValues.links?.calendly)}
            </div>

            <div className="mt-4">
              {renderField('PayPal', formValues.links?.paypal)}
              {renderField('Venmo', formValues.links?.venmo)}
              {renderField('Cash App', formValues.links?.cashapp)}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No card details available.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default CardDetail

import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { BusinessCard } from '../types/card'
import { QRCodeSVG } from 'qrcode.react'
import { Skeleton } from '@/components/ui/skeleton'

const firestore = getFirestore()

const CardShare = () => {
  const { sId } = useParams({ from: '/s/$sId' })
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState<BusinessCard | undefined>()

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true)
      try {
        const cardDocRef = doc(firestore, 'businessCards', sId)
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
  }, [sId])

  if (loading) {
    return (
      <div className="w-full max-w-lg m-auto  min-h-screen shadow-xl border border-gray-200 rounded-xl">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    )
  }

  return (
    <Card
      style={{
        border: formValues?.themeColor
          ? `8px solid ${formValues?.themeColor}`
          : ''
      }}
      className="w-full max-w-md m-auto rounded-none  min-h-screen shadow-xl border border-gray-200 "
    >
      <CardHeader className="p-4 ">
        <CardTitle className="text-2xl font-semibold text-center text-white">
          <QRCodeSVG
            value={`https://flashlink.io/c/${sId}`}
            size={200}
            className="mb-4 mx-auto"
          />
        </CardTitle>
      </CardHeader>
      <CardContent
        className="p-6 "
        style={{
          borderTop: formValues?.themeColor
            ? `20px solid ${formValues?.themeColor}`
            : ''
        }}
      >
        <div className=" "></div>
      </CardContent>
    </Card>
  )
}

export default CardShare

import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { BusinessCard } from '../../types/card'
import { QRCodeSVG } from 'qrcode.react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  IconMail,
  IconPhone,
  IconLink,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandSnapchat,
  IconBrandTiktok,
  IconBrandTwitch,
  IconBrandWhatsapp,
  IconBrandDiscord,
  IconBrandSkype,
  IconBrandTelegram,
  IconBrandGithub,
  IconBrandPaypal,
  IconCash
} from '@tabler/icons-react'
import FieldWithIcon from '../field-with-icon'

const firestore = getFirestore()

const CardShare = () => {
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

  if (loading) {
    return (
      <div className="w-full max-w-2xl m-auto mt-10 shadow-xl border border-gray-200 rounded-xl">
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
      className="w-full max-w-md m-auto mt-10 shadow-xl border border-gray-200 rounded-xl"
    >
      <CardHeader className="p-4 rounded-t-xl">
        <CardTitle className="text-2xl font-semibold text-center text-white">
          <QRCodeSVG
            value={`https://flashlink.io/c/${cId}`}
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
        <div className=" ">
          <div>
            <h1 className="text-2xl font-bold"> {formValues?.name} </h1>
            <h2 className="text-xl font-semibold">{formValues?.companyName}</h2>
            <h2 className="text-xl font-semibold">{formValues?.jobTitle}</h2>
          </div>
          <div className="mt-4 space-y-2">
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconMail />}
              text={formValues?.email}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconPhone />}
              text={formValues?.phone}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconLink />}
              text={formValues?.companyUrl}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconMapPin />}
              text={formValues?.address}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandLinkedin />}
              text={formValues?.links?.linkedIn}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandInstagram />}
              text={formValues?.links?.instagram}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandFacebook />}
              text={formValues?.links?.facebook}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandYoutube />}
              text={formValues?.links?.youtube}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandSnapchat />}
              text={formValues?.links?.snapchat}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandTiktok />}
              text={formValues?.links?.tiktok}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandTwitch />}
              text={formValues?.links?.twitch}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandWhatsapp />}
              text={formValues?.links?.whatsapp}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandDiscord />}
              text={formValues?.links?.discord}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandSkype />}
              text={formValues?.links?.skype}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandTelegram />}
              text={formValues?.links?.telegram}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandGithub />}
              text={formValues?.links?.github}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconBrandPaypal />}
              text={formValues?.links?.paypal}
            />
            <FieldWithIcon
              themeColor={formValues?.themeColor}
              icon={<IconCash />}
              text={formValues?.links?.cashapp}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardShare

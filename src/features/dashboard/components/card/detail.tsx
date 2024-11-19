import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { BusinessCard } from '../../types/card'

import { Skeleton } from '@/components/ui/skeleton'

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
        style={{ backgroundColor: formValues?.themeColor }}
        className="h-10 mb-10 "
      >
        <CardTitle
          hidden={true}
          className="text-2xl font-semibold text-center mb-4"
        >
          {/* {formValues?.name || 'Card Details'} */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formValues ? (
          <div className="space-y-4">
            <div className="grid  gap-4">
              <div>
                {/* <h1 className="text-2xl font-bold"> {formValues.name} </h1> */}
                <h2 className="text-xl font-semibold">
                  {/* {formValues.companyName} */}
                </h2>
                {/* <h2 className="text-xl font-semibold">{formValues.jobTitle}</h2> */}
              </div>
            </div>
            {/* <div>
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconMail />}
                text={formValues.email}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconPhone />}
                text={formValues.phone}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconLink />}
                text={formValues.companyUrl}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconMapPin />}
                text={formValues.address}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandLinkedin />}
                text={formValues.links?.linkedIn}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandInstagram />}
                text={formValues.links?.instagram}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandFacebook />}
                text={formValues.links?.facebook}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandYoutube />}
                text={formValues.links?.youtube}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandSnapchat />}
                text={formValues.links?.snapchat}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandTiktok />}
                text={formValues.links?.tiktok}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandTwitch />}
                text={formValues.links?.twitch}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandWhatsapp />}
                text={formValues.links?.whatsapp}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandDiscord />}
                text={formValues.links?.discord}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandSkype />}
                text={formValues.links?.skype}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandTelegram />}
                text={formValues.links?.telegram}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandGithub />}
                text={formValues.links?.github}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconBrandPaypal />}
                text={formValues.links?.paypal}
              />
              <FieldWithIcon
                themeColor={formValues.themeColor}
                icon={<IconCash />}
                text={formValues.links?.cashapp}
            </div>
              /> */}
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

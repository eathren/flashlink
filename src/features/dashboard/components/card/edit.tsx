import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth } from '@/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { BusinessCard } from '../../types/card'
import { Check, DeviceMobileMessage } from 'tabler-icons-react'
import CardDelete from './delete'
import { Skeleton } from '@/components/ui/skeleton'
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandPaypal,
  IconBrandSkype,
  IconBrandSnapchat,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandTwitch,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconCash,
  IconLink,
  IconMail,
  IconMapPin,
  IconPhone
} from '@tabler/icons-react'
import InputWithIcon from '../input-with-icon'

const firestore = getFirestore()
const presetColors = [
  '#FFFFFF', // White
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FF33A5', // Pink
  '#33FFA5', // Mint
  '#FFA533', // Orange
  '#8E33FF', // Purple
  '#FF3380', // Magenta
  '#33FFD7', // Aqua
  '#FFDA33', // Yellow
  '#33A5FF' // Sky Blue
]

const EditCard = () => {
  const { cId } = useParams({ from: '/_auth/c/$cId/edit' })
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState<BusinessCard | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCard = async () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prevValues => ({
      ...prevValues,
      links: {
        ...prevValues?.links,
        [name]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('User not authenticated')
      }
      if (!formValues) {
        throw new Error('Form values are not defined')
      }

      const filteredFormValues = Object.fromEntries(
        Object.entries(formValues).filter(([, v]) => v !== undefined)
      )

      const cardDocRef = doc(firestore, 'businessCards', cId)
      await updateDoc(cardDocRef, filteredFormValues)
      toast.success('Business card updated successfully')
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleColorChange = (color: string) => {
    setFormValues(prevValues => ({
      ...prevValues,
      themeColor: color
    }))
  }

  if (loading) {
    return (
      <div className="w-full max-w-md p-6 m-auto mt-10 ">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    )
  }
  return (
    <Card
      className="w-full max-w-xl p-6 m-auto mt-10 "
      style={{
        border: formValues?.themeColor
          ? `2px solid ${formValues?.themeColor}`
          : ''
      }}
    >
      <CardHeader>
        <CardTitle hidden={true} className="text-2xl font-semibold text-center">
          Edit Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <h2 className="font-bold text-xl">Personal</h2>
            <InputWithIcon
              icon={<IconMail />}
              id="name"
              name="name"
              value={formValues?.name}
              onChange={handleChange}
              placeholder="Name"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconPhone />}
              id="jobTitle"
              name="jobTitle"
              value={formValues?.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconLink />}
              id="companyName"
              name="companyName"
              value={formValues?.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconMapPin />}
              id="accreditations"
              name="accreditations"
              value={formValues?.accreditations}
              onChange={handleChange}
              placeholder="Accreditations"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<DeviceMobileMessage />}
              id="headline"
              name="headline"
              value={formValues?.headline}
              onChange={handleChange}
              placeholder="Headline"
              themeColor={formValues?.themeColor}
            />

            <h2 className="font-bold text-xl">General</h2>
            <InputWithIcon
              icon={<IconMail />}
              id="email"
              name="email"
              value={formValues?.email}
              onChange={handleChange}
              placeholder="Email"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconPhone />}
              id="phone"
              name="phone"
              value={formValues?.phone}
              onChange={handleChange}
              placeholder="Phone"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconLink />}
              id="companyUrl"
              name="companyUrl"
              value={formValues?.companyUrl}
              onChange={handleChange}
              placeholder="Company URL"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconMapPin />}
              id="address"
              name="address"
              value={formValues?.address}
              onChange={handleChange}
              placeholder="Address"
              themeColor={formValues?.themeColor}
            />

            <h2 className="font-bold text-xl">Social</h2>
            <InputWithIcon
              icon={<IconBrandLinkedin />}
              id="x"
              name="x"
              value={formValues?.links?.x}
              onChange={handleLinkChange}
              placeholder="X"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandInstagram />}
              id="instagram"
              name="instagram"
              value={formValues?.links?.instagram}
              onChange={handleLinkChange}
              placeholder="Instagram"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandFacebook />}
              id="threads"
              name="threads"
              value={formValues?.links?.threads}
              onChange={handleLinkChange}
              placeholder="Threads"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandYoutube />}
              id="linkedIn"
              name="linkedIn"
              value={formValues?.links?.linkedIn}
              onChange={handleLinkChange}
              placeholder="LinkedIn"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandSnapchat />}
              id="facebook"
              name="facebook"
              value={formValues?.links?.facebook}
              onChange={handleLinkChange}
              placeholder="Facebook"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandTiktok />}
              id="youtube"
              name="youtube"
              value={formValues?.links?.youtube}
              onChange={handleLinkChange}
              placeholder="YouTube"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandTwitch />}
              id="snapchat"
              name="snapchat"
              value={formValues?.links?.snapchat}
              onChange={handleLinkChange}
              placeholder="Snapchat"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandWhatsapp />}
              id="tiktok"
              name="tiktok"
              value={formValues?.links?.tiktok}
              onChange={handleLinkChange}
              placeholder="TikTok"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandDiscord />}
              id="twitch"
              name="twitch"
              value={formValues?.links?.twitch}
              onChange={handleLinkChange}
              placeholder="Twitch"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandSkype />}
              id="yelp"
              name="yelp"
              value={formValues?.links?.yelp}
              onChange={handleLinkChange}
              placeholder="Yelp"
              themeColor={formValues?.themeColor}
            />

            <h2 className="font-bold text-xl">Messaging</h2>
            <InputWithIcon
              icon={<IconBrandWhatsapp />}
              id="whatsapp"
              name="whatsapp"
              value={formValues?.links?.whatsapp}
              onChange={handleLinkChange}
              placeholder="WhatsApp"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={null}
              id="signal"
              name="signal"
              value={formValues?.links?.signal}
              onChange={handleLinkChange}
              placeholder="Signal"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandDiscord />}
              id="discord"
              name="discord"
              value={formValues?.links?.discord}
              onChange={handleLinkChange}
              placeholder="Discord"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandSkype />}
              id="skype"
              name="skype"
              value={formValues?.links?.skype}
              onChange={handleLinkChange}
              placeholder="Skype"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconBrandTelegram />}
              id="telegram"
              name="telegram"
              value={formValues?.links?.telegram}
              onChange={handleLinkChange}
              placeholder="Telegram"
              themeColor={formValues?.themeColor}
            />

            <h2 className="font-bold text-xl">Business</h2>
            <InputWithIcon
              icon={<IconBrandGithub />}
              id="github"
              name="github"
              value={formValues?.links?.github}
              onChange={handleLinkChange}
              placeholder="GitHub"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={null}
              id="calendly"
              name="calendly"
              value={formValues?.links?.calendly}
              onChange={handleLinkChange}
              placeholder="Calendly"
              themeColor={formValues?.themeColor}
            />

            <h2 className="font-bold text-xl">Payment</h2>
            <InputWithIcon
              icon={<IconBrandPaypal />}
              id="paypal"
              name="paypal"
              value={formValues?.links?.paypal}
              onChange={handleLinkChange}
              placeholder="PayPal"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconCash />}
              id="venmo"
              name="venmo"
              value={formValues?.links?.venmo}
              onChange={handleLinkChange}
              placeholder="Venmo"
              themeColor={formValues?.themeColor}
            />
            <InputWithIcon
              icon={<IconCash />}
              id="cashapp"
              name="cashapp"
              value={formValues?.links?.cashapp}
              onChange={handleLinkChange}
              placeholder="Cash App"
              themeColor={formValues?.themeColor}
            />

            <h2 className="font-bold text-xl">Theme</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {presetColors.map(color => (
                <Button
                  type="button"
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-8 w-8 p-0 border border-gray-300"
                  onClick={() => handleColorChange(color)}
                >
                  {formValues?.themeColor === color && (
                    <Check className="text-white w-4 h-4 absolute" />
                  )}
                </Button>
              ))}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </div>
      </CardContent>
      <CardDelete />
    </Card>
  )
}

export default EditCard

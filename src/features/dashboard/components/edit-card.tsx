import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth } from '@/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { BusinessCard } from '../types/card'
import { Check } from 'tabler-icons-react'
import CardDelete from './delete-card'

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
  '#FF5733', // Coral
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
    return <Loader />
  }
  return (
    <Card className="w-full max-w-md p-6 m-auto mt-10 ">
      <CardHeader>
        <CardTitle hidden={true} className="text-2xl font-semibold text-center">
          Edit Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <h2>Personal</h2>
            <Input
              type="text"
              id="name"
              name="name"
              value={formValues?.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <Input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formValues?.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
            />

            <Input
              type="text"
              id="companyName"
              name="companyName"
              value={formValues?.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
            <Input
              type="text"
              id="accreditations"
              name="accreditations"
              value={formValues?.accreditations}
              onChange={handleChange}
              placeholder="Accreditations"
            />
            <Input
              type="text"
              id="headline"
              name="headline"
              value={formValues?.headline}
              onChange={handleChange}
              placeholder="Headline"
            />

            <h2>General</h2>
            <Input
              type="email"
              id="email"
              name="email"
              value={formValues?.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formValues?.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <Input
              type="text"
              id="companyUrl"
              name="companyUrl"
              value={formValues?.companyUrl}
              onChange={handleChange}
              placeholder="Company URL"
            />
            <Input
              type="text"
              id="address"
              name="address"
              value={formValues?.address}
              onChange={handleChange}
              placeholder="Address"
            />

            <h2>Social</h2>
            <Input
              type="text"
              id="x"
              name="x"
              value={formValues?.links?.x}
              onChange={handleLinkChange}
              placeholder="X"
            />
            <Input
              type="text"
              id="instagram"
              name="instagram"
              value={formValues?.links?.instagram}
              onChange={handleLinkChange}
              placeholder="Instagram"
            />
            <Input
              type="text"
              id="threads"
              name="threads"
              value={formValues?.links?.threads}
              onChange={handleLinkChange}
              placeholder="Threads"
            />
            <Input
              type="text"
              id="linkedIn"
              name="linkedIn"
              value={formValues?.links?.linkedIn}
              onChange={handleLinkChange}
              placeholder="LinkedIn"
            />
            <Input
              type="text"
              id="facebook"
              name="facebook"
              value={formValues?.links?.facebook}
              onChange={handleLinkChange}
              placeholder="Facebook"
            />
            <Input
              type="text"
              id="youtube"
              name="youtube"
              value={formValues?.links?.youtube}
              onChange={handleLinkChange}
              placeholder="YouTube"
            />
            <Input
              type="text"
              id="snapchat"
              name="snapchat"
              value={formValues?.links?.snapchat}
              onChange={handleLinkChange}
              placeholder="Snapchat"
            />
            <Input
              type="text"
              id="tiktok"
              name="tiktok"
              value={formValues?.links?.tiktok}
              onChange={handleLinkChange}
              placeholder="TikTok"
            />
            <Input
              type="text"
              id="twitch"
              name="twitch"
              value={formValues?.links?.twitch}
              onChange={handleLinkChange}
              placeholder="Twitch"
            />
            <Input
              type="text"
              id="yelp"
              name="yelp"
              value={formValues?.links?.yelp}
              onChange={handleLinkChange}
              placeholder="Yelp"
            />

            <h2>Messaging</h2>
            <Input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={formValues?.links?.whatsapp}
              onChange={handleLinkChange}
              placeholder="WhatsApp"
            />
            <Input
              type="text"
              id="signal"
              name="signal"
              value={formValues?.links?.signal}
              onChange={handleLinkChange}
              placeholder="Signal"
            />
            <Input
              type="text"
              id="discord"
              name="discord"
              value={formValues?.links?.discord}
              onChange={handleLinkChange}
              placeholder="Discord"
            />
            <Input
              type="text"
              id="skype"
              name="skype"
              value={formValues?.links?.skype}
              onChange={handleLinkChange}
              placeholder="Skype"
            />
            <Input
              type="text"
              id="telegram"
              name="telegram"
              value={formValues?.links?.telegram}
              onChange={handleLinkChange}
              placeholder="Telegram"
            />

            <h2>Business</h2>
            <Input
              type="text"
              id="github"
              name="github"
              value={formValues?.links?.github}
              onChange={handleLinkChange}
              placeholder="GitHub"
            />
            <Input
              type="text"
              id="calendly"
              name="calendly"
              value={formValues?.links?.calendly}
              onChange={handleLinkChange}
              placeholder="Calendly"
            />

            <h2>Payment</h2>
            <Input
              type="text"
              id="paypal"
              name="paypal"
              value={formValues?.links?.paypal}
              onChange={handleLinkChange}
              placeholder="PayPal"
            />
            <Input
              type="text"
              id="venmo"
              name="venmo"
              value={formValues?.links?.venmo}
              onChange={handleLinkChange}
              placeholder="Venmo"
            />
            <Input
              type="text"
              id="cashapp"
              name="cashapp"
              value={formValues?.links?.cashapp}
              onChange={handleLinkChange}
              placeholder="Cash App"
            />

            <h2>Theme</h2>
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

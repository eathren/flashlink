import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth } from '@/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { BusinessCard } from '../types/card'

const firestore = getFirestore()

const EditCard = () => {
  const { cId } = useParams({ from: '/_auth/c/$cId' })
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState<BusinessCard | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const user = auth.currentUser
        if (!user) {
          throw new Error('User not authenticated')
        }

        const cardDocRef = doc(
          firestore,
          'users',
          user.uid,
          'businessCards',
          cId
        )
        const cardDoc = await getDoc(cardDocRef)
        if (cardDoc.exists()) {
          setFormValues(cardDoc.data() as BusinessCard)
        } else {
          throw new Error('Card not found')
        }
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unknown error occurred')
        }
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

      // Filter out undefined values
      const filteredFormValues = Object.fromEntries(
        Object.entries(formValues).filter(([, v]) => v !== undefined)
      )

      const cardDocRef = doc(firestore, 'users', user.uid, 'businessCards', cId)
      await updateDoc(cardDocRef, filteredFormValues)
      toast.success('Business card updated successfully')
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <Card className="w-full max-w-md p-6 m-auto mt-20">
      <CardHeader>
        <CardTitle hidden={true} className="text-2xl font-semibold text-center">
          Edit Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              type="text"
              id="title"
              name="title"
              value={formValues?.title}
              onChange={handleChange}
              placeholder="Title"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              id="name"
              name="name"
              value={formValues?.name}
              onChange={handleChange}
              placeholder="Name"
              className="mt-1 block w-full"
            />
            <Input
              type="email"
              id="email"
              name="email"
              value={formValues?.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              id="address"
              name="address"
              value={formValues?.address}
              onChange={handleChange}
              placeholder="Address"
              className="mt-1 block w-full"
            />
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formValues?.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              id="company"
              name="company"
              value={formValues?.company}
              onChange={handleChange}
              placeholder="Company"
              className="mt-1 block w-full"
            />
            <h1> Links</h1>
            <Input
              type="text"
              id="linkedIn"
              name="linkedIn"
              value={formValues?.links?.linkedIn}
              onChange={handleLinkChange}
              placeholder="LinkedIn"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              id="discord"
              name="discord"
              value={formValues?.links?.discord}
              onChange={handleLinkChange}
              placeholder="Discord"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              id="twitter"
              name="twitter"
              value={formValues?.links?.twitter}
              onChange={handleLinkChange}
              placeholder="Twitter"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              id="facebook"
              name="facebook"
              value={formValues?.links?.facebook}
              onChange={handleLinkChange}
              placeholder="Facebook"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              id="instagram"
              name="instagram"
              value={formValues?.links?.instagram}
              onChange={handleLinkChange}
              placeholder="Instagram"
              className="mt-1 block w-full"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner height={25} width={25} /> : 'Save'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default EditCard

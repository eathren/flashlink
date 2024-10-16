import { useState } from 'react'
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore'
import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CirclePlus } from 'tabler-icons-react'
import { Spinner } from '@/components/ui/spinner'

const firestore = getFirestore()

const CreateBusinessCard = () => {
  const [loading, setLoading] = useState(false)

  const handleCreateCard = async () => {
    setLoading(true)
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('User not authenticated')
      }

      const businessCardsCollectionRef = collection(
        firestore,
        'users',
        user.uid,
        'businessCards'
      )
      const cardDocRef = doc(businessCardsCollectionRef)
      await setDoc(cardDocRef, {
        createdAt: new Date()
      })

      toast.success('Business card created successfully')
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

  return (
    <Card
      className="w-full max-w-xs p-6 hover:bg-gray-50 hover:cursor-pointer"
      onClick={handleCreateCard}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Create Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="  flex items-center justify-center">
            {loading ? <Spinner /> : <CirclePlus className="w-16 h-16" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreateBusinessCard

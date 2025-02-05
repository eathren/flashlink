import { createFileRoute } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth } from '@/firebase'
import EditCard from '@/features/dashboard/components/card/edit'

const firestore = getFirestore()

export const Route = createFileRoute('/_auth/c/$cId/edit')({
  loader: async ({ params: { cId } }) => {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const cardDocRef = doc(firestore, 'businessCards', cId)
    const cardDoc = await getDoc(cardDocRef)
    if (!cardDoc.exists()) {
      throw new Error('Card not found')
    }

    const cardData = cardDoc.data()
    if (cardData.userId !== user.uid) {
      throw new Error('Access denied: You do not own this card')
    }

    return {
      card: cardData
    }
  },
  component: EditCardPage
})

function EditCardPage() {
  return <EditCard />
}

export default EditCardPage

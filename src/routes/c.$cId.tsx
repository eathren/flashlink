import { createFileRoute } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import ViewCard from '@/features/dashboard/components/view-card'

const firestore = getFirestore()

export const Route = createFileRoute('/c/$cId')({
  loader: async ({ params }: { params: { cId: string } }) => {
    const cardDocRef = doc(firestore, 'businessCards', params.cId)
    const cardDoc = await getDoc(cardDocRef)

    if (!cardDoc.exists()) {
      throw new Error('Card not found')
    }

    return {
      card: {
        id: cardDoc.id,
        ...cardDoc.data() // Include the card ID and the rest of the data
      }
    }
  },
  component: ViewCardPage
})

function ViewCardPage() {
  return <ViewCard />
}

export default ViewCardPage

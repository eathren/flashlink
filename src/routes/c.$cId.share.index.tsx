import CardShare from '@/features/dashboard/components/card/share'
import { createFileRoute } from '@tanstack/react-router'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
const firestore = getFirestore()

export const Route = createFileRoute('/c/$cId/share/')({
  loader: async ({ params: { cId } }) => {
    const cardDocRef = doc(firestore, 'businessCards', cId)
    const cardDoc = await getDoc(cardDocRef)
    if (!cardDoc.exists()) {
      throw new Error('Card not found')
    }

    const cardData = cardDoc.data()

    return {
      card: cardData,
    }
  },
  component: CardShare,
})

import { createFileRoute } from '@tanstack/react-router'
import CardShare from '@/features/business-card/components/share'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
const firestore = getFirestore()

export const Route = createFileRoute('/s/$sId')({
  loader: async ({ params: { sId } }) => {
    const cardDocRef = doc(firestore, 'businessCards', sId)
    const cardDoc = await getDoc(cardDocRef)
    if (!cardDoc.exists()) {
      throw new Error('Card not found')
    }

    const cardData = cardDoc.data()

    return {
      card: cardData
    }
  },
  component: CardShare
})

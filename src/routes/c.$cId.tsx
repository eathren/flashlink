import { createFileRoute } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import CardDetail from '@/features/dashboard/components/card-detail'

const firestore = getFirestore()

export const Route = createFileRoute('/c/$cId')({
  loader: async ({ params: { cId } }) => {
    const cardDocRef = doc(firestore, 'businessCards', cId)
    const cardDoc = await getDoc(cardDocRef)
    if (!cardDoc.exists()) {
      throw new Error('Card not found')
    }

    const cardData = cardDoc.data()

    return {
      card: cardData
    }
  },
  component: CardDetailPage
})

function CardDetailPage() {
  return <CardDetail />
}

export default CardDetailPage

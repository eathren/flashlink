import { createFileRoute } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import CardDetail from '@/features/dashboard/components/card/detail'
import CardShare from '@/features/dashboard/components/card/share'

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
  validateSearch: search => {
    return {
      share:
        search.share === true || search.share === false
          ? search.share
          : undefined
    }
  },
  component: CardDetailPage
})

function CardDetailPage() {
  const searchParams = Route.useSearch<{ share?: boolean }>()
  const share = searchParams.share === true
  return share ? <CardShare /> : <CardDetail />
}

export default CardDetailPage

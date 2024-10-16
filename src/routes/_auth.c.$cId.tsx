import { createFileRoute } from '@tanstack/react-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth } from '@/firebase'
import EditCard from '@/features/dashboard/components/edit-card'

const firestore = getFirestore()

export const Route = createFileRoute('/_auth/c/$cId')({
  loader: async ({ params }: { params: { cId: string } }) => {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const cardDocRef = doc(firestore, 'users', user.uid, 'businessCards', cId)
    const cardDoc = await getDoc(cardDocRef)
    if (!cardDoc.exists()) {
      throw new Error('Card not found')
    }

    return {
      card: cardDoc.data()
    }
  },
  component: InvoicePage
})

function InvoicePage() {
  return <EditCard />
}

export default InvoicePage

import { BusinessCard } from '@/features/business-card/types/card'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  Timestamp,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'
import { auth } from '@/firebase'

const firestore = getFirestore()

export const readAllUserCards = (
  userId: string,
  callback: (cards: BusinessCard[]) => void
) => {
  const businessCardsCollectionRef = collection(firestore, 'businessCards')
  const q = query(
    businessCardsCollectionRef,
    where('userId', '==', userId),
    where('isDeleted', '==', false)
  )
  return onSnapshot(q, querySnapshot => {
    const cards = querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        userId: data.userId,
        profile: data?.profile,
        themeColor: data.themeColor,
        isDeleted: data.isDeleted,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt
            : Timestamp.now(),
        fields: data.fields
      } as BusinessCard
    })
    callback(cards)
  })
}

export const checkAndCreateUserDoc = async (user: any) => {
  const userDocRef = doc(firestore, 'users', user.uid)
  const userDoc = await getDoc(userDocRef)

  // Check if user document exists, if not, create it
  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email
    })
  }
}

export const createNewBusinessCard = async (
  user: any
): Promise<BusinessCard> => {
  const businessCardsCollectionRef = collection(firestore, 'businessCards')
  const cardDocRef = doc(businessCardsCollectionRef)
  const newCard: BusinessCard = {
    id: cardDocRef.id,
    userId: user.uid,
    profile: {},
    links: [],
    isDeleted: false,
    themeColor: '#D3D3D3',
    createdAt: Timestamp.now()
  }
  await setDoc(cardDocRef, newCard)
  return newCard
}

export const createCard = async (): Promise<BusinessCard> => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User not authenticated')
  }

  await checkAndCreateUserDoc(user)
  return await createNewBusinessCard(user)
}

export const deleteSingleCard = async (cId: string) => {
  const cardDocRef = doc(firestore, 'businessCards', cId)
  await updateDoc(cardDocRef, { isDeleted: true })
}

import { BusinessCard } from '@/features/business-card/types/card'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  Timestamp
} from 'firebase/firestore'
import { auth } from '@/firebase'

const firestore = getFirestore()

const checkAndCreateUserDoc = async (user: any) => {
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

const createNewBusinessCard = async (user: any): Promise<BusinessCard> => {
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

export const readSingleCard = async (
  cId: string
): Promise<BusinessCard | undefined> => {
  const cardDocRef = doc(firestore, 'businessCards', cId)
  const cardDoc = await getDoc(cardDocRef)
  if (cardDoc.exists()) {
    return cardDoc.data() as BusinessCard
  }
  return undefined
}

export const updateSingleCard = async (
  cId: string,
  data: Partial<BusinessCard>
) => {
  const cardDocRef = doc(firestore, 'businessCards', cId)
  await updateDoc(cardDocRef, data)
}

export const deleteSingleCard = async (cId: string) => {
  const cardDocRef = doc(firestore, 'businessCards', cId)
  await updateDoc(cardDocRef, { isDeleted: true })
}

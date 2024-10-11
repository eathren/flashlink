// src/hooks/useFirestore.js
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"

export const useFirestoreCollection = (collectionName: string) => {
  return useQuery({
    queryKey: [collectionName],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, collectionName))
      return querySnapshot.docs.map((doc) => doc.data())
    },
  })
}

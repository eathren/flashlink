// src/hooks/useAuth.js
import { useQuery } from '@tanstack/react-query'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuth = () => {
  const auth = getAuth()
  return useQuery({
    queryKey: ['authUser'],
    queryFn: () => {
      return new Promise(resolve => {
        const unsubscribe = onAuthStateChanged(auth, user => {
          unsubscribe()
          resolve(user)
        })
      })
    }
  })
}

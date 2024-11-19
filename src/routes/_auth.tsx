import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const auth = getAuth()
    return new Promise<void>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async user => {
        if (user) {
          try {
            await user.getIdToken(true) // Force refresh the token
            context.user = user
            resolve()
          } catch {
            reject(new Error('Not authenticated'))
          }
        } else {
          reject(new Error('Not authenticated'))
        }
        unsubscribe()
      })
    })
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  }
})

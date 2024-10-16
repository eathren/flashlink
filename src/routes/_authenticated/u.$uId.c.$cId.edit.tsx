import { createFileRoute, useParams, redirect } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/contexts/auth-context'
import EditCard from '@/features/dashboard/components/edit-card'

interface Params {
  uId: string
  cId: string
}

export const Route = createFileRoute('/_authenticated/u/$uId/c/$cId/edit')({
  beforeLoad: async ({ context }: { context: any }) => {
    const { user, loading } = context.auth

    if (loading) {
      return new Promise<void>((resolve) => {
        const unsubscribe = context.auth.onAuthStateChanged((user) => {
          if (user) {
            unsubscribe()
            resolve()
          } else {
            unsubscribe()
            resolve(redirect({ to: '/login' }))
          }
        })
      })
    }

    if (!user) {
      return redirect({ to: '/login' })
    }
  },
  component: EditCard,
})

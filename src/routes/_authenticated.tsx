import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const currentUser = context.auth.currentUser
    if (!currentUser) {
      return redirect({ to: '/login' })
    }
  }
})

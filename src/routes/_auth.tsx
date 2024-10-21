import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const { user: contextUser } = context
    if (!contextUser) {
      if (!context.user) {
        throw new Error('Not authenticated')
      }
    }
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

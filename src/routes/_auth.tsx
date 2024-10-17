import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location, context }) => {
    const { user: contextUser } = context
    if (!contextUser) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  }
})

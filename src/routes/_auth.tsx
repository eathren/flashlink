import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuth } from '@/features/auth/contexts/auth-context'
import { Loader } from '@/components/ui/spinner'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout
})

function AuthLayout() {
  const { user, loading } = useAuth()
  const navigate = Route.useNavigate()

  useEffect(() => {
    if (!loading) {
      if (user) {
        const searchParams = new URLSearchParams(window.location.search)
        const redirectUrl = searchParams.get('redirect') || `/u/${user.uid}`
        navigate({ to: redirectUrl })
      } else {
        navigate({ to: '/login' })
      }
    }
  }, [user, loading, navigate])

  if (loading) {
    return <Loader />
  }

  return <Outlet />
}

export default AuthLayout

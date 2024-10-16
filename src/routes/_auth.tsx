import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Loader } from '@/components/ui/spinner'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location }) => {
    const user = auth.currentUser
    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: AuthLayout
})

function AuthLayout() {
  const navigate = Route.useNavigate()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true)
        const searchParams = new URLSearchParams(window.location.search)
        const redirectUrl = searchParams.get('redirect')
        if (redirectUrl) {
          navigate({ to: redirectUrl })
        }
      } else {
        navigate({ to: '/login' })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return null
  }

  return <Outlet />
}

export default AuthLayout

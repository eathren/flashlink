import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/ui/spinner'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    if (!auth) {
      return redirect({ to: '/login' })
    }
    const user = auth.currentUser

    if (!user) {
      return new Promise<void>(resolve => {
        const unsubscribe = onAuthStateChanged(auth, user => {
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
  },
  component: AuthLayout
})

function AuthLayout() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = Route.useNavigate()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

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

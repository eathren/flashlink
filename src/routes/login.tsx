import {
  createFileRoute,
  redirect,
  useNavigate,
  useSearch
} from '@tanstack/react-router'
import { auth } from '@/firebase'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    return new Promise<void>((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          unsubscribe()
          reject(
            redirect({
              to: '/'
            })
          )
        } else {
          unsubscribe()
          resolve()
        }
      })
    })
  },
  component: LoginPage
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const search = useSearch({ from: '/login' })
  const navigate = useNavigate({ from: '/login' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully')
      console.log(search, search.redirect)
      const redirectUrl = search.redirect || '/'
      navigate({ to: redirectUrl })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message)
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 block w-full"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <Spinner height={25} width={25} /> : 'Login'}
            </Button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

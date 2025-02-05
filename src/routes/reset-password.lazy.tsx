import { createLazyFileRoute } from '@tanstack/react-router'
import { auth } from '@/firebase'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { sendPasswordResetEmail } from 'firebase/auth'

export const Route = createLazyFileRoute('/reset-password')({
  component: ResetPasswordPage
})

function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email sent!')
      setSuccess(true)
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
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm">
                Check your email for instructions to reset your password.
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <Spinner height={25} width={25} />
              ) : (
                'Send Reset Email'
              )}
            </Button>
          </form>
          <p className="mt-4 text-center">
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

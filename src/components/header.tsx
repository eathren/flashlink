import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import toast from 'react-hot-toast'

const Header = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const authInstance = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, currentUser => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [authInstance])

  const handleLogout = async () => {
    try {
      await signOut(authInstance)
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Error signing out')
      console.error('Error signing out:', error)
    }
  }

  const handleLogoClick = () => {
    console.log('User:', user)
    navigate(user ? `/u/${user.uid}` : '/')
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div
          className="text-xl font-semibold text-blue-600 cursor-pointer hover:text-blue-500 transition-colors"
          onClick={handleLogoClick}
        >
          FlashLink
        </div>
        <nav className="flex gap-4">
          <Link
            to="/pricing"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            Pricing
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/sign-up"
                className="text-gray-700 hover:text-blue-500 transition-colors"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-500 transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

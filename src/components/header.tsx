import { Link } from '@tanstack/react-router'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { auth } from '@/firebase'

const Header = () => {
  const currentUser = auth.currentUser
  console.log('currentUser', currentUser)
  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Error signing out')
      console.error('Error signing out:', error)
    }
  }

  const headerLink = auth.currentUser ? `/u/${auth.currentUser.uid}` : '/'

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to={headerLink}>
          <div className="text-xl font-semibold text-blue-600 cursor-pointer hover:text-blue-500 transition-colors">
            FlashLink
          </div>
        </Link>
        <nav className="flex gap-4">
          <Link
            to="/pricing"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            Pricing
          </Link>
          {auth.currentUser ? (
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

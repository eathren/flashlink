import { Link, useNavigate } from '@tanstack/react-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './dropdown-menu'
import { UserCircle } from 'tabler-icons-react'

const Header = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate({ to: '/login' })
      toast.success('Logged out')
    } catch (error) {
      toast.error('Error signing out')
      console.error('Error signing out:', error)
    }
  }

  const getAvatarContent = () => {
    if (user?.photoURL) {
      return <AvatarImage src={user.photoURL} alt="Avatar" />
    } else if (user?.email) {
      return (
        <AvatarFallback>{user.email.slice(0, 1).toUpperCase()}</AvatarFallback>
      )
    }
    return <AvatarFallback></AvatarFallback>
  }

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-blue-600">
          <Link to="/" className="hover:text-blue-500 transition-colors">
            FlashLink
          </Link>
        </div>
        <nav className="flex gap-4 items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar>{getAvatarContent()}</Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <UserCircle /> Account
                </DropdownMenuItem>
              </DropdownMenuContent>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-blue-500 transition-colors"
              >
                Pricing
              </Link>
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
    </div>
  )
}

export default Header

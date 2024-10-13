import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/firebase"
import toast from "react-hot-toast"
const Header = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Error signing out")
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-blue-600">
          <Link to="/" className="hover:text-blue-500 transition-colors">
            FlashLink
          </Link>
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
    </div>
  )
}

export default Header

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const authInstance = getAuth()
  console.log('authInstance:', authInstance)
  console.log('user:', user)
  useEffect(() => {
    const unsubscribe: () => void = onAuthStateChanged(
      authInstance,
      (currentUser: User | null) => {
        setUser(currentUser)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [authInstance])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

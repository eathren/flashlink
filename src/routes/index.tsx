import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { auth } from '@/firebase'
import { User, onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect, Suspense } from 'react'
import { Loader } from '@/components/ui/spinner'
import Dashboard from '@/features/dashboard/components/dashboard'
import Feature from '@/components/ui/feature'

const Index = () => {
  return (
    <div className="flex flex-col bg-red-200 min-h-screen">
      {/* Header Section */}
      <header className=" text-center py-20">
        <div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400   to-purple-600 text-5xl">
            Digital Business Cards Made in a Flash
          </span>
        </div>
        <Link to="create-free">
          <Button variant="default" className="mt-6 h-20 rounded-xl text-2xl  ">
            Try it for Free
          </Button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="flex-1 bg-red-200 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              header="Share Anywhere"
              body="Create business cards and have them sharable with a single scan or create links."
            />
            <Feature
              header="Easy Creation"
              body="Quickly create your digital business card in minutes with an intuitive interface."
            />
            <Feature
              header="Contacts Downloads"
              body="Easily download and manage your contacts from your digital business card."
            />
            <Feature
              header="Secure Storage"
              body="Your information is securely stored and easily accessible."
            />
            <Feature
              header="Customization Options"
              body="Personalize your card with different themes and layouts."
            />
            <Feature
              header="Analytics"
              body="Track how many times your card has been viewed and shared."
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-red-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} FlashLink. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

const Root = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <Loader />
  }

  return user ? <Dashboard /> : <Index />
}

export const Route = createFileRoute('/')({
  component: () => (
    <Suspense fallback={<Loader />}>
      <Root />
    </Suspense>
  )
})

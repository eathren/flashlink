import { Button } from "@/components/ui/button"
import { createFileRoute, Link } from "@tanstack/react-router"

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold">Welcome to FlashLink</h1>
        <p className="mt-4 text-lg">
          Your digital QR code business card solution.
        </p>
        <Link to="create-free">
          <Button className="mt-6 bg-white text-blue-600 hover:bg-gray-200">
            Get Started
          </Button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="flex-1 bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Easy Creation</h3>
              <p className="mt-2">
                Quickly create your digital business card in minutes with an
                intuitive interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Custom QR Codes</h3>
              <p className="mt-2">
                Generate personalized QR codes that link to your digital card.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Share Anywhere</h3>
              <p className="mt-2">
                Easily share your business card via email, social media, or
                text.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Analytics</h3>
              <p className="mt-2">
                Track how many times your card has been viewed and shared.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Secure Storage</h3>
              <p className="mt-2">
                Your information is securely stored and easily accessible.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Customization Options</h3>
              <p className="mt-2">
                Personalize your card with different themes and layouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} FlashLink. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export const Route = createFileRoute("/")({
  component: Index,
})

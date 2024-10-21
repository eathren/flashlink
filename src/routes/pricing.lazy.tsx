import { Button } from '@/components/ui/button'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/pricing')({
  component: Pricing
})

function Pricing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold"></h1>
        <h2 className="text-2xl">Two weeks free for your teams to try.</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-bold">Free Features</h3>
          <p className="mb-4 text-gray-700">
            Download personalized card for free
          </p>
          <Link to="/create-free">
            <Button className="mb-2 w-full rounded px-4 py-2" variant="outline">
              Create Free Card Now
            </Button>
          </Link>
          <ul className="mb-4 list-inside list-disc"></ul>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-bold">Personal Plan</h3>
          <p className="mb-4 text-gray-700">$3 / month per user</p>
          <Button className="mb-2 w-full rounded px-4 py-2 text-white">
            Get Started
          </Button>
          <b>
            <p className="mb-2 text-gray-700">
              Offline app access and personalized QR codes for sharing to your
              profile, site, or business
            </p>
          </b>
          <ul className="mb-4 list-inside list-disc">
            <li>
              {' '}
              Up to 5 different business cards that all include a QR link
            </li>
            <li> Personalized Profiles </li>
            <li>Track your QR code performance</li>
          </ul>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-bold">Teams Plan</h3>
          <p className="mb-4 text-gray-700">$3 / month per user</p>
          <Button className="mb-2 w-full rounded px-4 py-2 text-white">
            Get Started
          </Button>
          <b>
            <p className="mb-2 text-gray-700">
              + Everything included in the Personal plan
            </p>
          </b>
          <ul className="mb-4 list-inside list-disc">
            <li>Collaborate with team members</li>
            <li>Share QR code analytics</li>
          </ul>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-bold">Pro Plan</h3>
          <p className="mb-4 text-gray-700">$8 / month</p>
          <Button className="mb-2 w-full rounded px-4 py-2 text-white">
            Get Started
          </Button>
          <b>
            <p className="mb-2 text-gray-700">
              + Everything included in the Teams plan
            </p>
          </b>
          <ul className="mb-4 list-inside list-disc">
            <li>Enhanced analytics and reporting</li>
            <li>Priority customer support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

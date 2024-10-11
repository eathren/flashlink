import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import ExportableCard from "@/features/free/components/exportable-card"

const CreateFree = () => {
  return (
    <div className="flex h-screen">
      <nav className="w-32 bg-gray-800 text-white p-4 fixed h-full">
        <ul className="space-y-2">
          <li>
            <Link
              to="/create-free"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/create-free/links"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Links
            </Link>
          </li>
          <li>
            <Link
              to="/create-free/qr-code"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              QR Code
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 ml-32 p-4 gap-4 grid grid-cols-1 sm:grid-cols-2">
        <Outlet />
        <div className="w-full max-w-xs">
          <ExportableCard />
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute("/create-free")({
  component: CreateFree,
})

import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import CreateFreeCard from "@/features/free/components/create-free-card"
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
              to="/create-free/option2"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              QR Code
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 ml-32 p-4 flex">
        <Outlet />
        <div className="ml-8 w-full max-w-xs">
          <ExportableCard />
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute("/create-free")({
  component: CreateFree,
})

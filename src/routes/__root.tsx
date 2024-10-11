import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
  component: () => (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-blue-600">
            <Link to="/" className="hover:text-blue-500 transition-colors">
              FlashLink
            </Link>
          </div>
          <nav className="flex gap-4">
            <Link className="text-gray-700 hover:text-blue-500 transition-colors">
              Pricing
            </Link>
            <Link className="text-gray-700 hover:text-blue-500 transition-colors">
              Signup
            </Link>
            <Link className="text-gray-700 hover:text-blue-500 transition-colors">
              Login
            </Link>
            {/* <Link to="/about" className="text-gray-700 hover:text-blue-500 transition-colors">
              About
            </Link> */}
          </nav>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})

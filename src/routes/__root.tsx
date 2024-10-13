import Header from "@/components/header"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
  component: () => (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <hr />
      <div className="p-4">
        <Outlet />
      </div>
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </div>
  ),
})

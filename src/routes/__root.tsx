import Header from "@/components/header"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
  component: () => (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <hr />
      <Outlet />
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </div>
  ),
})

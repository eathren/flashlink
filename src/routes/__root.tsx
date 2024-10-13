import Header from "@/components/header"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { User } from "firebase/auth"

interface RouteContext {
  user: User | null
}

export const Route = createRootRouteWithContext<RouteContext>()({
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

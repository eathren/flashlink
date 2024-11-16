import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { User } from 'firebase/auth'
import '@/firebase'
type RouterContext = {
  user: User
  userLoading: boolean
}

const Root = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Outlet />

      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </div>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root
})

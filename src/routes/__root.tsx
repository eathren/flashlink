import Header from '@/components/ui/header'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { User } from 'firebase/auth'

type RouterContext = {
  user: User
  userLoading: boolean
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <div className="bg-gray-200 min-h-screen">
        <Header />
        <hr />
        <div className=" px-2 ">
          <Outlet />
        </div>

        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </div>
    )
  }
})

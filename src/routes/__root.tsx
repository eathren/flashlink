import Header from "@/components/header";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { User } from "firebase/auth";

type RouterContext = {
  user: User;
  userLoading: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <hr />
        <div className="p-4">
          <Outlet />
        </div>
        {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
      </div>
    );
  },
});

import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./hooks/use-auth";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  context: { user: undefined!, userLoading: true },
});

function App() {
  const { user, loading: userLoading } = useAuth();
  return <RouterProvider router={router} context={{ user, userLoading }} />;
}

export default App;

import { routeTree } from "@/routeTree.gen"
import { QueryClient } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
    auth: undefined!,
  },
  defaultPreload: "intent",
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
})

function App() {
  return <RouterProvider router={router} context={{ queryClient }} />
}

export default App

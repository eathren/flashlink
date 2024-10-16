import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { auth } from '@/firebase'
const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: {
    auth
  }
})

function App() {
  console.log(auth)
  return <RouterProvider router={router} context={{ auth }} />
}

export default App

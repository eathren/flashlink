import { StrictMode, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import "./index.css"
import { QueryClient } from "@tanstack/react-query"
import { routeTree } from "./routeTree.gen"

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

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </StrictMode>
  )
}

import { StrictMode, Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "@/App"
import { Loader } from "./components/ui/spinner"
import { Toaster } from "react-hot-toast"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <Toaster position="top-right" />
        <App />
      </Suspense>
    </StrictMode>
  )
}

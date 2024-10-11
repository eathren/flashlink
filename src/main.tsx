import { StrictMode, Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "@/App"
import { Loader } from "./components/ui/spinner"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </StrictMode>
  )
}

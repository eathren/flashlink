import { StrictMode, Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "@/App"

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

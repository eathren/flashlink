import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/App'
import { Loader } from './components/ui/spinner'
import { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <Toaster position="top-right" />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Flashlink</title>
          <meta
            name="description"
            content="Flashlink is a blazingly way to do digital business cards and lead follow up.."
          />
          <link rel="canonical" href="https://flashlink.io" />
        </Helmet>
        <App />
      </Suspense>
    </StrictMode>
  )
}

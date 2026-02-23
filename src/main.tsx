import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import './index.css'

const restoreGithubPagesRoute = () => {
  const currentUrl = new URL(window.location.href)
  const redirectedPath = currentUrl.searchParams.get('__gh_route')

  if (!redirectedPath) {
    return
  }

  window.history.replaceState(null, '', redirectedPath)
}

restoreGithubPagesRoute()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

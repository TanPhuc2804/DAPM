import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthWrapper } from './assets/hooks/auth.context.jsx'
createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <StrictMode>
      <App />
    </StrictMode>,
  </AuthWrapper>
)

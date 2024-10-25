import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './pages/Admin/redux/store.js'
import App from './App.jsx'
import './index.css'
import { AuthWrapper } from './assets/hooks/auth.context.jsx'
import { InforOrderWapper } from './assets/hooks/inforOrder.context.jsx'
createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <InforOrderWapper>
    <Provider store={store}> 
      <StrictMode>
        <App />
      </StrictMode>
      </Provider>
    </InforOrderWapper>
  </AuthWrapper>
)

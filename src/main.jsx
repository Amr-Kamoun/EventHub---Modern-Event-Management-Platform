import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import './index.css'
import './i18n'
import i18n from './i18n'
import Loader from './components/Loader' // ✅ Add this

document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
})

// ✅ Wrapper component to delay rendering until context is ready
function RootApp() {
  const { loading } = useAuth()

  if (loading) return <Loader /> // Wait for Supabase + profile

  return (
    <>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RootApp /> {/* ✅ Renders only after auth is ready */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

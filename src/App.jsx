import { useEffect } from 'react' // ✅ Added
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetailsPage from './pages/EventDetailsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminEvents from './pages/admin/AdminEvents'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCreateEvent from './pages/admin/AdminCreateEvent' // ✅ ADDED
import NotFoundPage from './pages/NotFoundPage'
import i18n from 'i18next' // ✅ Added for language direction detection
import Loader from './components/Loader' // ✅ Added loader component

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <Loader /> // ✅ Use loader

  if (!user) return <Navigate to="/login" replace />

  return children
}

// Admin route component
const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth()

  console.log('[AdminRoute] user:', user)
  console.log('[AdminRoute] isAdmin:', isAdmin)
  console.log('[AdminRoute] loading:', loading)

  if (loading) return <Loader /> // ✅ Use loader

  if (!user) {
    console.warn('[AdminRoute] No user detected — redirecting to login')
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    console.warn('[AdminRoute] User is not an admin — redirecting to home')
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const { loading } = useAuth()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language]) // ✅ Set text direction dynamically

  if (loading) return <Loader /> // ✅ Block route render until ready

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="admin/events" element={
            <AdminRoute>
              <AdminEvents />
            </AdminRoute>
          } />
          <Route path="admin/events/new" element={ // ✅ ADDED
            <AdminRoute>
              <AdminCreateEvent />
            </AdminRoute>
          } />
          <Route path="admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

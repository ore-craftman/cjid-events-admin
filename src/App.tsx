import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { GuestRoute } from './components/auth/GuestRoute'
import { AdminDashboard } from './pages/AdminDashboard'
import { CreateEventPage } from './pages/CreateEventPage'
import { EditEventPage } from './pages/EditEventPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
// import { CreateBlogPostPage } from './pages/CreateBlogPostPage'
// import { EditBlogPostPage } from './pages/EditBlogPostPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <SignupPage />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/create"
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id/edit"
            element={
              <ProtectedRoute>
                <EditEventPage />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/posts/create" element={<ProtectedRoute><CreateBlogPostPage /></ProtectedRoute>} />
          <Route path="/posts/:id/edit" element={<ProtectedRoute><EditBlogPostPage /></ProtectedRoute>} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminDashboard } from './pages/AdminDashboard'
import { CreateEventPage } from './pages/CreateEventPage'
import { EditEventPage } from './pages/EditEventPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/events/:id/edit" element={<EditEventPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

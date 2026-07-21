import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminDashboard } from './pages/AdminDashboard'
import { CreateEventPage } from './pages/CreateEventPage'
import { EditEventPage } from './pages/EditEventPage'
// import { CreateBlogPostPage } from './pages/CreateBlogPostPage'
// import { EditBlogPostPage } from './pages/EditBlogPostPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/events/:id/edit" element={<EditEventPage />} />
        {/* <Route path="/posts/create" element={<CreateBlogPostPage />} />
        <Route path="/posts/:id/edit" element={<EditBlogPostPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

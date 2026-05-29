import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SelectRole from './pages/SelectRole'
import MapPage from './pages/MapPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/select" element={<SelectRole />} />
        <Route path="/map/:role" element={<MapPage />} />

        {/* Backward-compatible redirects from the frontend branch */}
        <Route path="/student" element={<Navigate to="/map/student" replace />} />
        <Route path="/faculty" element={<Navigate to="/map/faculty" replace />} />
        <Route path="/admin" element={<Navigate to="/map/admin" replace />} />
        <Route path="/visitor" element={<Navigate to="/map/visitor" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

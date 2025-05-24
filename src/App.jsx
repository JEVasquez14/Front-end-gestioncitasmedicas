import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Appointments from './pages/Appointments'
import MedicalRecords from './pages/Medical-Records'
import Schedule from './pages/Schedule'
import LandingPage from './pages/LandingPage'
import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  )
}

export default App

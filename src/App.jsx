import "./index.css"
import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { AdminLogin } from "./admin/AdminLogin"
import { AdminDashboard } from "./admin/AdminDashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App

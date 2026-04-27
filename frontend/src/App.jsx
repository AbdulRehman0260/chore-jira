import "./index.css"
import SignInPage from "./pages/SignInPage"
import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import HomePage from "./pages/HomePage"
import TicketCreate from "./pages/TicketCreate"
import Dashboard from "./pages/Dashboard"
import AllTickets from "./pages/AllTickets"

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <>
      <Routes>
        <Route index element={isAuthenticated ? (<HomePage />) : (<SignInPage />)} />
        <Route path="/ticket-create" element={<TicketCreate />} />
        <Route path="/ticket-dashboard" element={<Dashboard />} />
        <Route path="/all-tickets" element={<AllTickets />} />
      </Routes>
    </>
  )
}

export default App

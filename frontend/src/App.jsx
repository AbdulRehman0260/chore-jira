import "./index.css"
import SignInPage from "./pages/SignInPage"
import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import HomePage from "./pages/HomePage"
import TicketCreate from "./pages/TicketCreate"

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <>
      <Routes>
        <Route index element={isAuthenticated ? (<HomePage />) : (<SignInPage />)} />
        <Route path="/ticket-create" element={<TicketCreate />} />
      </Routes>
    </>
  )
}

export default App

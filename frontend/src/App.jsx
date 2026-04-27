import "./index.css"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { axiosInstance } from "./lib/axios"
import HomePage from "./pages/HomePage"
import TicketCreate from "./pages/TicketCreate"
import Dashboard from "./pages/Dashboard"
import AllTickets from "./pages/AllTickets"

function App() {
  const { isAuthenticated, setUser, setAuthenticated } = useAuthStore()

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...')
        const response = await axiosInstance.get('/customers/auth-status')
        if (response.data && response.data.user) {
          console.log('User is authenticated:', response.data.user)
          setUser(response.data.user)
          setAuthenticated(true)
        } else {
          console.log('User is not authenticated')
          setUser(null)
          setAuthenticated(false)
        }
      } catch (error) {
        console.log('Auth check failed, user not authenticated:', error)
        setUser(null)
        setAuthenticated(false)
      }
    }

    checkAuth()
  }, [setUser, setAuthenticated])

  return (
    <>
      <Routes>
        <Route index element={isAuthenticated ? (<HomePage />) : (<SignInPage />)} />
        <Route path="/signup" element={isAuthenticated ? (<HomePage />) : (<SignUpPage />)} />
        <Route path="/ticket-create" element={isAuthenticated ? (<TicketCreate />) : (<SignInPage />)} />
        <Route path="/ticket-dashboard" element={isAuthenticated ? (<Dashboard />) : (<SignInPage />)} />
        <Route path="/all-tickets" element={isAuthenticated ? (<AllTickets />) : (<SignInPage />)} />
      </Routes>
    </>
  )
}

export default App

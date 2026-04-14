import "./index.css"
import SignInPage from "./pages/SignInPage"
import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <>
      <Routes>
        <Route index element={
          isAuthenticated ? (
            <div className="bg-brand-white min-h-screen flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome! You're authenticated 🎉</h1>
                <p className="text-gray-600">This content only shows when logged in</p>
              </div>
            </div>
          ) : (
            <SignInPage />
          )
        } />
      </Routes>
    </>
  )
}

export default App

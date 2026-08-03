import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { LoaderCircle } from "lucide-react"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <LoaderCircle size={32} className="text-[#F4B400] animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}
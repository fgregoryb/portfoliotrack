import { useAuth } from '../context/AuthContext'
import { usePortfolio } from '../hooks/usePortfolio'
import PortfolioTable from '../components/PortfolioTable'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { portfolio, loading, error } = usePortfolio()

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold">PortfolioTrack</h1>
            <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Sign out
          </button>
        </div>

        {loading && (
          <p className="text-gray-400">Loading portfolio...</p>
        )}

        {error && (
          <p className="text-red-400">{error}</p>
        )}

        {!loading && !error && portfolio.length === 0 && (
          <p className="text-gray-400">
            No positions yet. Add assets and transactions to get started.
          </p>
        )}

        {!loading && !error && portfolio.length > 0 && (
          <PortfolioTable portfolio={portfolio} />
        )}

      </div>
    </div>
  )
}
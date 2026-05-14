import { useState, useEffect } from 'react'
import api from '../services/api'

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchPortfolio() {
    try {
      setLoading(true)
      const response = await api.get('/portfolio')
      setPortfolio(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  return { portfolio, loading, error, refetch: fetchPortfolio }
}

import React, { useEffect, useState } from 'react'
import { healthCheck } from './services/api'

function App() {
  const [status, setStatus] = useState('Checking...')
  const [error, setError] = useState('')

  useEffect(() => {
    healthCheck()
      .then((res) => setStatus(res.message || 'OK'))
      .catch((err) => setError(err?.response?.data?.error || err.message || 'Failed to reach API'))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 rounded-lg shadow bg-white space-y-2">
        <h1 className="text-2xl font-semibold">Vistagram</h1>
        <div className="text-sm text-gray-600">
          Backend health: {error ? (<span className="text-red-600">Error: {error}</span>) : (<span className="text-green-600">{status}</span>)}
        </div>
      </div>
    </div>
  )
}

export default App
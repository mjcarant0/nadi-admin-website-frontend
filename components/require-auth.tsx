'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

// Wraps protected pages: redirects to /login when there is no token.
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, ready } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace('/login')
  }, [ready, isAuthenticated, router])

  if (!ready || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Loading…</p>
      </div>
    )
  }
  return <>{children}</>
}

'use client'

import { usePathname } from 'next/navigation'
import { RequireAuth } from './require-auth'

// Public routes that must render without a token.
const PUBLIC_ROUTES = ['/login']

// Applied once in the root layout: every route requires auth except the
// public allowlist (e.g. the login page itself).
export function AppGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (PUBLIC_ROUTES.includes(pathname)) return <>{children}</>
  return <RequireAuth>{children}</RequireAuth>
}

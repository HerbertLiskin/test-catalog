'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getSessionToken } from '@/entities/session'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    let mounted = true
    Promise.resolve().then(() => {
      if (mounted) setIsMounted(true)
    })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const token = getSessionToken()
    const isAuthPage = pathname === '/'

    if (!token && !isAuthPage) {
      // User is not authenticated and trying to access a protected route
      router.replace('/')
    } else if (token && isAuthPage) {
      // User is authenticated and trying to access the login page
      router.replace('/catalog')
    }
  }, [isMounted, pathname, router])

  if (!isMounted) return null

  // Optional: If we are not auth'd and not on /, don't render children to avoid flash.
  const token = getSessionToken()
  if (!token && pathname !== '/') return null

  return <>{children}</>
}

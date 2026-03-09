'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { decodeJwt } from 'jose'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Modal } from '@/shared/ui/Modal/Modal'
import { Button } from '@/shared/ui'
import { getSessionToken, clearSession } from '@/entities/session'

interface UserPayload {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  iat: number // Seconds
  exp: number // Seconds
}

export function UserProfile() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserPayload | null>(null)

  useEffect(() => {
    let mounted = true
    const token = getSessionToken()
    if (token) {
      try {
        const payload = decodeJwt(token) as unknown as UserPayload
        Promise.resolve().then(() => {
          if (mounted) setUser(payload)
        })
      } catch (err) {
        console.error('Failed to decode user session:', err)
      }
    }
    return () => { mounted = false }
  }, [])

  const handleLogout = () => {
    clearSession()
    setIsOpen(false)
    router.push('/')
  }

  // Formatting date strictly via requirements: "hh:mm:ss месяц год" (note hh format means 01-12, but standard usually expects HH for 24h. Let's use HH:mm:ss LLLL yyyy as reasonable match).
  const formatDate = (unixSeconds: number) => {
    if (!unixSeconds) return '—'
    return format(new Date(unixSeconds * 1000), 'HH:mm:ss MMMM yyyy', { locale: ru })
  }

  if (!user) {
    // Return empty placeholder while mounting/decoding
    return <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
  }

  return (
    <>
      {/* Avatar Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-primary/20 bg-gray-100 transition-transform hover:scale-105"
      >
        <Image
          src={user.image || '/icons/user.svg'}
          alt={`${user.firstName} ${user.lastName}`}
          fill
          className="object-cover"
        />
      </button>

      {/* Profile Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Large Avatar */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary/10">
            <Image
              src={user.image || '/icons/user.svg'}
              alt={user.firstName}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-cairo text-2xl font-bold text-heading">
              {user.firstName} {user.lastName}
            </h2>
            <p className="font-sans text-sm font-medium text-subtitle mb-4">
              {user.email} (@{user.username})
            </p>
          </div>

          {/* Session Data Box */}
          <div className="w-full rounded-xl bg-gray-50 p-4 text-left font-sans text-sm">
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500 font-medium">Создан (iat):</span>
              <span className="text-gray-900 font-semibold">{formatDate(user.iat)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Годен до (exp):</span>
              <span className="text-gray-900 font-semibold text-primary">{formatDate(user.exp)}</span>
            </div>
          </div>

          <div className="w-full mt-2">
            <Button onClick={handleLogout}>
              Выйти из аккаунта
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

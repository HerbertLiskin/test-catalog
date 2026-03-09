import { getSessionToken, clearSession } from '@/entities/session'

const BASE_URL = 'https://dummyjson.com'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public response?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiClient<T>(
  endpoint: string,
  init?: RequestInit,
): Promise<T> {
  const token = getSessionToken()
  const headers = new Headers(init?.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...init,
    headers,
  })

  if (!res.ok) {
    let errorData
    try {
      errorData = await res.json()
    } catch {
      // Ignored
    }
    
    // Auto logout if unauthorized
    if (res.status === 401 && typeof window !== 'undefined') {
      clearSession()
      window.location.href = '/'
    }

    throw new ApiError(res.status, `Ошибка ${res.status}: ${res.statusText}`, errorData)
  }

  return res.json() as Promise<T>
}

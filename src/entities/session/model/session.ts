export const SESSION_TOKEN_KEY = 'auth_token'

export const getSessionToken = (): string | null => {
  if (typeof window === 'undefined') return null

  // Check localStorage first (remember me)
  const localToken = localStorage.getItem(SESSION_TOKEN_KEY)
  if (localToken) return localToken

  // Fallback to sessionStorage
  return sessionStorage.getItem(SESSION_TOKEN_KEY)
}

export const setSessionToken = (token: string, rememberMe: boolean) => {
  if (typeof window === 'undefined') return

  if (rememberMe) {
    localStorage.setItem(SESSION_TOKEN_KEY, token)
    sessionStorage.removeItem(SESSION_TOKEN_KEY) // Clear the other one just in case
  } else {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token)
    localStorage.removeItem(SESSION_TOKEN_KEY)
  }
}

export const clearSession = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_TOKEN_KEY)
  sessionStorage.removeItem(SESSION_TOKEN_KEY)
}

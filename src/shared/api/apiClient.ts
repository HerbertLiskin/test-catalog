const BASE_URL = 'https://dummyjson.com'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiClient<T>(
  endpoint: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, init)

  if (!res.ok) {
    throw new ApiError(res.status, `Ошибка ${res.status}: ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

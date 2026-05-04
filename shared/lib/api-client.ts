// Centralized API client for DummyJSON
const BASE_URL = 'https://dummyjson.com'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new ApiError(
      error.message || 'API request failed',
      response.status,
      error
    )
  }
  return response.json()
}

async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  retries = 2
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options)
      return await handleResponse<T>(response)
    } catch (error) {
      lastError = error as Error

      // Don't retry on client errors (4xx)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error
      }

      // Don't retry on last attempt
      if (attempt === retries) {
        throw error
      }

      // Exponential backoff: wait 1s, then 2s
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
    }
  }

  throw lastError || new Error('Request failed after retries')
}

export const apiClient = {
  get: async <T>(endpoint: string, token?: string): Promise<T> => {
    const headers: HeadersInit = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return fetchWithRetry<T>(`${BASE_URL}${endpoint}`, { headers })
  },

  post: async <T>(endpoint: string, data: unknown, token?: string): Promise<T> => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return fetchWithRetry<T>(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
  },

  put: async <T>(endpoint: string, data: unknown, token?: string): Promise<T> => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return fetchWithRetry<T>(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
  },
}

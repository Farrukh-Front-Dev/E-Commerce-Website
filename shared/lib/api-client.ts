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

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    return handleResponse<T>(response)
  },

  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },
}

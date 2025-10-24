import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

export interface FetchResponse<T> {
  count: number
  next?: string | null
  previous?: string | null
  results: T[]
}

export interface APIError {
  message: string
  status: number
  code?: string
  details?: Record<string, unknown>
}

export class APIClientError extends Error {
  status: number
  code?: string
  details?: Record<string, unknown>

  constructor(message: string, status: number, code?: string, details?: Record<string, unknown>) {
    super(message)
    this.name = 'APIClientError'
    this.status = status
    this.code = code
    this.details = details
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.rawg.io/api'
const API_KEY = import.meta.env.VITE_RAWG_API_KEY

if (!API_KEY) {
  console.error('VITE_API_KEY is not defined in environment variables')
  throw new Error('API key is required but not found in environment variables')
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: {
    key: API_KEY,
  },
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '15000', 10),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const handleAPIError = (error: AxiosError): never => {
  if (error.response) {
    const { status, data } = error.response
    const message = (data as Record<string, unknown>)?.message || error.message || 'An error occurred'
    const code = (data as Record<string, unknown>)?.code
    const details = (data as Record<string, unknown>)?.details

    throw new APIClientError(message as string, status, code as string, details as Record<string, unknown>)
  } else if (error.request) {
    throw new APIClientError('Network error: No response received', 0, 'NETWORK_ERROR')
  } else {
    throw new APIClientError(error.message || 'Request setup error', 0, 'REQUEST_ERROR')
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.log('API Request:', {
        url: config.url,
        method: config.method?.toUpperCase(),
        params: config.params,
        baseURL: config.baseURL,
      })
    }
    return config
  },
  (error) => {
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.error('API Request Error:', error)
    }
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        statusText: response.statusText,
        dataKeys: Object.keys(response.data || {}),
      })
    }
    return response
  },
  (error: AxiosError) => {
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.error('API Response Error:', {
        url: error.config?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
      })
    }
    return Promise.reject(error)
  },
)

export interface APIClientConfig {
  retries?: number
  retryDelay?: number
  timeout?: number
}

class APIClient<T> {
  endpoint: string
  private config: APIClientConfig

  constructor(endpoint: string, config: APIClientConfig = {}) {
    this.endpoint = endpoint
    this.config = {
      retries: 3,
      retryDelay: 1000,
      timeout: 15000,
      ...config,
    }
  }

  getAll = async (config?: AxiosRequestConfig): Promise<FetchResponse<T>> => {
    try {
      const response = await axiosInstance.get<FetchResponse<T>>(this.endpoint, {
        timeout: this.config.timeout,
        ...config,
      })
      return response.data
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }

  get = async (id: number | string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`, {
        timeout: this.config.timeout,
        ...config,
      })
      return response.data
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }

  post = async (data: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(this.endpoint, data, {
        timeout: this.config.timeout,
        ...config,
      })
      return response.data
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }

  put = async (id: number | string, data: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(`${this.endpoint}/${id}`, data, {
        timeout: this.config.timeout,
        ...config,
      })
      return response.data
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }

  patch = async (id: number | string, data: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(`${this.endpoint}/${id}`, data, {
        timeout: this.config.timeout,
        ...config,
      })
      return response.data
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }

  delete = async (id: number | string, config?: AxiosRequestConfig): Promise<void> => {
    try {
      await axiosInstance.delete(`${this.endpoint}/${id}`, {
        timeout: this.config.timeout,
        ...config,
      })
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }

  search = async (
    query: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<FetchResponse<T>> => {
    try {
      const response = await axiosInstance.get<FetchResponse<T>>(this.endpoint, {
        params: {
          search: query,
          ...params,
        },
        timeout: this.config.timeout,
        ...config,
      })
      return response.data
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }

  getPage = async (
    page: number,
    pageSize = 20,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<FetchResponse<T>> => {
    try {
      const response = await axiosInstance.get<FetchResponse<T>>(this.endpoint, {
        params: {
          page,
          page_size: pageSize,
          ...params,
        },
        timeout: this.config.timeout,
        ...config,
      })
      return response.data
    } catch (error) {
      return handleAPIError(error as AxiosError)
    }
  }
}

export const createAPIClient = <T>(endpoint: string, config?: APIClientConfig) => new APIClient<T>(endpoint, config)

export default APIClient

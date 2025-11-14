const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
}

interface RegisterData {
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

interface DogData {
  userId: number
  name: string
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
  breed?: string
  birthDate?: string
  ownerName?: string
  ownerPhone?: string
  ownerAddress?: string
}

export async function registerUser(data: RegisterData): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    return { data: json, status: res.status }
  } catch (error) {
    return { error: 'Network error', status: 500 }
  }
}

export async function loginUser(data: LoginData): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    return { data: json, status: res.status }
  } catch (error) {
    return { error: 'Network error', status: 500 }
  }
}

export async function createDog(data: DogData): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/dogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    return { data: json, status: res.status }
  } catch (error) {
    return { error: 'Network error', status: 500 }
  }
}
